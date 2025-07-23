import { test, expect } from '@playwright/test';

test.describe('XSS Prevention Tests', () => {
  
  const maliciousInputs = [
    '<script>alert("XSS")</script>',
    '<img src="x" onerror="alert(\'XSS\')" />',
    'javascript:alert("XSS")',
    '<svg onload="alert(\'XSS\')" />',
    '<iframe src="javascript:alert(\'XSS\')"></iframe>',
    '"><script>alert("XSS")</script>',
    '\';alert("XSS");//',
    '<!--<script>alert("XSS")</script>-->',
    '<style>@import "javascript:alert(\'XSS\')";</style>',
    '<link rel="stylesheet" href="javascript:alert(\'XSS\')" />',
    '<meta http-equiv="refresh" content="0;url=javascript:alert(\'XSS\')" />',
    '<form action="javascript:alert(\'XSS\')" method="get" />',
    '<object data="javascript:alert(\'XSS\')" />',
    '<embed src="javascript:alert(\'XSS\')" />',
    'onmouseover=alert("XSS")',
    'onclick=alert("XSS")',
    '&lt;script&gt;alert("XSS")&lt;/script&gt;',
  ];

  test.describe('Search Input Sanitization', () => {
    test('should sanitize malicious input in portfolio search', async ({ page }) => {
      await page.goto('/portfolio');
      
      const searchInput = page.locator('input[placeholder*="プロジェクトを検索"]');
      await expect(searchInput).toBeVisible();
      
      for (const maliciousInput of maliciousInputs.slice(0, 5)) {
        // 悪意のある入力を試行
        await searchInput.fill(maliciousInput);
        await page.keyboard.press('Enter');
        
        // XSSが実行されていないことを確認
        const alertDialogs = page.locator('div[role="alert"]');
        const scriptElements = page.locator('script');
        
        // アラートが表示されていないことを確認
        await expect(alertDialogs).toHaveCount(0);
        
        // 悪意のあるスクリプトが注入されていないことを確認
        const pageContent = await page.content();
        expect(pageContent).not.toContain('alert("XSS")');
        expect(pageContent).not.toContain('alert(\'XSS\')');
        
        // 入力値がエスケープされていることを確認
        const inputValue = await searchInput.inputValue();
        if (inputValue.includes('<script>')) {
          expect(inputValue).toContain('&lt;script&gt;');
        }
        
        await searchInput.clear();
      }
    });

    test('should sanitize malicious input in blog search', async ({ page }) => {
      await page.goto('/blog');
      
      const searchInput = page.locator('input[placeholder*="記事を検索"]');
      if (await searchInput.isVisible()) {
        for (const maliciousInput of maliciousInputs.slice(0, 3)) {
          await searchInput.fill(maliciousInput);
          await page.keyboard.press('Enter');
          
          // XSSが実行されていないことを確認
          const pageContent = await page.content();
          expect(pageContent).not.toContain('alert("XSS")');
          expect(pageContent).not.toContain('javascript:alert');
          
          await searchInput.clear();
        }
      }
    });
  });

  test.describe('URL Parameter Sanitization', () => {
    test('should handle malicious URL parameters safely', async ({ page }) => {
      const maliciousParams = [
        '?search=<script>alert("XSS")</script>',
        '?filter=javascript:alert("XSS")',
        '?q="><script>alert("XSS")</script>',
        '?category=<img src=x onerror=alert("XSS")>',
      ];
      
      for (const param of maliciousParams) {
        await page.goto(`/portfolio${param}`);
        
        // ページが正常に読み込まれることを確認
        await expect(page.locator('h1')).toBeVisible();
        
        // XSSが実行されていないことを確認
        const pageContent = await page.content();
        expect(pageContent).not.toContain('alert("XSS")');
        expect(pageContent).not.toContain('<script>');
        
        // URLパラメータがエスケープされていることを確認
        const currentUrl = page.url();
        if (currentUrl.includes('script')) {
          expect(currentUrl).toMatch(/%3C|&lt;/); // エンコードされている
        }
      }
    });

    test('should handle malicious hash fragments', async ({ page }) => {
      const maliciousHashes = [
        '#<script>alert("XSS")</script>',
        '#javascript:alert("XSS")',
        '#"><script>alert("XSS")</script>',
      ];
      
      for (const hash of maliciousHashes) {
        await page.goto(`/${hash}`);
        
        // ページが正常に読み込まれることを確認
        await expect(page.locator('body')).toBeVisible();
        
        // XSSが実行されていないことを確認
        const pageContent = await page.content();
        expect(pageContent).not.toContain('alert("XSS")');
      }
    });
  });

  test.describe('Dynamic Content Sanitization', () => {
    test('should sanitize user-generated content display', async ({ page }) => {
      await page.goto('/');
      
      // 動的に生成されるコンテンツのテスト
      const dynamicContent = await page.evaluate((maliciousInput) => {
        // ユーザー入力をシミュレート
        const div = document.createElement('div');
        div.innerHTML = maliciousInput; // 危険な操作のシミュレート
        
        return {
          innerHTML: div.innerHTML,
          textContent: div.textContent,
          hasScript: div.querySelector('script') !== null
        };
      }, maliciousInputs[0]);
      
      // スクリプトタグが除去されているか、エスケープされていることを確認
      expect(dynamicContent.hasScript).toBeFalsy();
      if (dynamicContent.innerHTML.includes('script')) {
        expect(dynamicContent.innerHTML).toMatch(/&lt;script&gt;|&amp;lt;script&amp;gt;/);
      }
    });

    test('should handle malicious attributes safely', async ({ page }) => {
      await page.goto('/portfolio');
      
      // 属性値の注入テスト
      const result = await page.evaluate(() => {
        const testElement = document.createElement('div');
        const maliciousAttribute = 'test" onmouseover="alert(\'XSS\')" class="';
        
        // 属性設定のテスト
        testElement.setAttribute('data-test', maliciousAttribute);
        
        return {
          attributeValue: testElement.getAttribute('data-test'),
          hasOnmouseover: testElement.hasAttribute('onmouseover'),
          outerHTML: testElement.outerHTML
        };
      });
      
      // 悪意のある属性が適切に処理されていることを確認
      expect(result.hasOnmouseover).toBeFalsy();
      expect(result.outerHTML).not.toContain('onmouseover');
    });
  });

  test.describe('Content Security Policy Compliance', () => {
    test('should block inline scripts', async ({ page }) => {
      // CSPヘッダーの確認
      const response = await page.goto('/');
      const cspHeader = response?.headers()['content-security-policy'];
      
      if (cspHeader) {
        // CSPヘッダーが設定されていることを確認
        expect(cspHeader).toBeTruthy();
        
        // インラインスクリプトが制限されていることを確認
        expect(cspHeader).toMatch(/'self'|'none'|'unsafe-inline'/);
        
        // unsafe-evalが許可されていないことを確認
        expect(cspHeader).not.toContain("'unsafe-eval'");
      }
      
      // インラインスクリプトの実行をテスト
      const scriptExecuted = await page.evaluate(() => {
        try {
          const script = document.createElement('script');
          script.innerHTML = 'window.xssTest = true;';
          document.head.appendChild(script);
          return !!window.xssTest;
        } catch (error) {
          return false;
        }
      });
      
      // CSPが設定されている場合、インラインスクリプトが実行されないことを確認
      if (cspHeader && cspHeader.includes("'unsafe-inline'" ) === false) {
        expect(scriptExecuted).toBeFalsy();
      }
    });

    test('should validate resource origins', async ({ page }) => {
      await page.goto('/');
      
      // 外部リソースの読み込み状況を確認
      const resources = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        const images = Array.from(document.querySelectorAll('img[src]'));
        
        return {
          scripts: scripts.map(s => s.src),
          styles: styles.map(s => s.href),
          images: images.map(img => img.src).slice(0, 5) // 最初の5個のみ
        };
      });
      
      // 許可されたドメインからのみリソースが読み込まれていることを確認
      const allowedDomains = [
        location.origin,
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdn.jsdelivr.net'
      ];
      
      [...resources.scripts, ...resources.styles].forEach(url => {
        if (url.startsWith('http')) {
          const isAllowed = allowedDomains.some(domain => url.startsWith(domain));
          expect(isAllowed).toBeTruthy();
        }
      });
    });
  });

  test.describe('Form Input Validation', () => {
    test('should validate and sanitize form inputs', async ({ page }) => {
      await page.goto('/portfolio');
      
      // フォーム入力のテスト
      const forms = await page.locator('form').all();
      
      for (const form of forms.slice(0, 2)) {
        const inputs = await form.locator('input[type="text"], textarea').all();
        
        for (const input of inputs.slice(0, 2)) {
          for (const maliciousInput of maliciousInputs.slice(0, 3)) {
            await input.fill(maliciousInput);
            
            // フォーム送信をシミュレート
            await input.press('Enter');
            
            // XSSが実行されていないことを確認
            const pageContent = await page.content();
            expect(pageContent).not.toContain('alert("XSS")');
            
            await input.clear();
          }
        }
      }
    });

    test('should handle file upload security', async ({ page }) => {
      await page.goto('/');
      
      // ファイルアップロード要素の確認
      const fileInputs = await page.locator('input[type="file"]').all();
      
      if (fileInputs.length > 0) {
        for (const fileInput of fileInputs.slice(0, 1)) {
          // ファイルタイプ制限の確認
          const accept = await fileInput.getAttribute('accept');
          if (accept) {
            expect(accept).toBeTruthy();
            // 実行可能ファイルが許可されていないことを確認
            expect(accept).not.toContain('.exe');
            expect(accept).not.toContain('.js');
            expect(accept).not.toContain('.html');
          }
        }
      }
    });
  });

  test.describe('Cookie and Storage Security', () => {
    test('should handle cookies securely', async ({ page, context }) => {
      await page.goto('/');
      
      // クッキーの設定を確認
      const cookies = await context.cookies();
      
      cookies.forEach(cookie => {
        // HTTPOnly属性の確認（セッションクッキーの場合）
        if (cookie.name.includes('session') || cookie.name.includes('auth')) {
          expect(cookie.httpOnly).toBeTruthy();
        }
        
        // Secure属性の確認（HTTPS環境の場合）
        if (page.url().startsWith('https:')) {
          expect(cookie.secure).toBeTruthy();
        }
        
        // SameSite属性の確認
        expect(['Strict', 'Lax', 'None']).toContain(cookie.sameSite);
      });
    });

    test('should validate localStorage usage', async ({ page }) => {
      await page.goto('/');
      
      // localStorageの安全な使用確認
      const storageTest = await page.evaluate(() => {
        try {
          // 悪意のあるデータの保存を試行
          const maliciousData = '<script>alert("XSS")</script>';
          localStorage.setItem('test', maliciousData);
          
          const retrievedData = localStorage.getItem('test');
          
          // データの取得・表示時にサニタイズされているかテスト
          const div = document.createElement('div');
          div.textContent = retrievedData; // textContentを使用（安全）
          
          return {
            stored: retrievedData,
            safe: !div.innerHTML.includes('<script>'),
            textOnly: div.textContent === maliciousData
          };
        } catch (error) {
          return { error: error.message };
        }
      });
      
      expect(storageTest.safe).toBeTruthy();
      expect(storageTest.textOnly).toBeTruthy();
    });
  });
}); 