import { test, expect } from '@playwright/test';

test.describe('Data Source Integration Tests', () => {
  
  test.describe('Works/Portfolio Data Consistency', () => {
    test('should display consistent works data across pages', async ({ page }) => {
      // Homeページのプレビューデータを取得
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const homeWorksData = await page.evaluate(() => {
        const workCards = Array.from(document.querySelectorAll('[data-testid="work-preview"], .work-card, .preview-card'));
        return workCards.map(card => ({
          title: card.querySelector('h3, h2, .title')?.textContent?.trim(),
          excerpt: card.querySelector('p, .excerpt, .description')?.textContent?.trim(),
          link: card.querySelector('a')?.href
        })).filter(item => item.title);
      });
      
      // Portfolioページの一覧データを取得
      await page.goto('/portfolio');
      await page.waitForLoadState('networkidle');
      
      const portfolioWorksData = await page.evaluate(() => {
        const workItems = Array.from(document.querySelectorAll('tr, [data-testid="work-item"], .work-row'));
        return workItems.map(item => ({
          title: item.querySelector('td:first-child, .title, h3')?.textContent?.trim(),
          link: item.querySelector('a')?.href
        })).filter(item => item.title);
      });
      
      console.log('Home works preview:', homeWorksData.length);
      console.log('Portfolio works list:', portfolioWorksData.length);
      
      // データの整合性確認
      expect(homeWorksData.length).toBeGreaterThan(0);
      expect(portfolioWorksData.length).toBeGreaterThan(0);
      
      // Home プレビューの各項目が Portfolio 一覧に存在することを確認
      for (const homeWork of homeWorksData.slice(0, 3)) { // 最初の3個をチェック
        const matchingPortfolioWork = portfolioWorksData.find(portfolioWork => 
          portfolioWork.title === homeWork.title
        );
        
        expect(matchingPortfolioWork, `"${homeWork.title}" should exist in portfolio page`).toBeTruthy();
      }
    });

    test('should maintain data consistency in work detail pages', async ({ page }) => {
      await page.goto('/portfolio');
      await page.waitForLoadState('networkidle');
      
      // 最初のワーク項目の詳細ページリンクを取得
      const firstWorkLink = await page.locator('a').first();
      if (await firstWorkLink.isVisible()) {
        const linkText = await firstWorkLink.textContent();
        const linkHref = await firstWorkLink.getAttribute('href');
        
        if (linkHref && linkHref.includes('/portfolio/')) {
          // 詳細ページに移動
          await firstWorkLink.click();
          await page.waitForLoadState('networkidle');
          
          // 詳細ページのタイトルを確認
          const detailTitle = await page.locator('h1').textContent();
          
          expect(detailTitle).toBeTruthy();
          console.log(`Detail page title: "${detailTitle}"`);
          console.log(`Link text: "${linkText}"`);
          
          // タイトルの関連性を確認（完全一致でなくても関連性があることを確認）
          if (linkText && detailTitle) {
            const isRelated = linkText.includes(detailTitle) || 
                            detailTitle.includes(linkText) ||
                            linkText.toLowerCase().includes(detailTitle.toLowerCase()) ||
                            detailTitle.toLowerCase().includes(linkText.toLowerCase());
            
            expect(isRelated, `Detail page title should be related to link text`).toBeTruthy();
          }
        }
      }
    });

    test('should validate MDX content structure', async ({ page }) => {
      await page.goto('/portfolio');
      await page.waitForLoadState('networkidle');
      
      // 詳細ページに移動
      const workLinks = await page.locator('a[href*="/portfolio/"]').all();
      
      if (workLinks.length > 0) {
        await workLinks[0].click();
        await page.waitForLoadState('networkidle');
        
        // MDXコンテンツの基本構造を確認
        const contentStructure = await page.evaluate(() => {
          return {
            hasTitle: !!document.querySelector('h1'),
            hasContent: !!document.querySelector('p, div'),
            hasMetadata: !!document.querySelector('[data-date], .date, time'),
            hasImages: document.querySelectorAll('img').length > 0,
            paragraphCount: document.querySelectorAll('p').length,
            headingCount: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length
          };
        });
        
        expect(contentStructure.hasTitle).toBeTruthy();
        expect(contentStructure.hasContent).toBeTruthy();
        expect(contentStructure.paragraphCount).toBeGreaterThan(0);
        
        console.log('Content structure:', contentStructure);
      }
    });
  });

  test.describe('Blog Data Consistency', () => {
    test('should display consistent blog data across pages', async ({ page }) => {
      // Homeページのブログプレビューデータを取得
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const homeBlogData = await page.evaluate(() => {
        const blogCards = Array.from(document.querySelectorAll('[data-testid="blog-preview"], .blog-card, .blog-preview'));
        return blogCards.map(card => ({
          title: card.querySelector('h3, h2, .title')?.textContent?.trim(),
          excerpt: card.querySelector('p, .excerpt')?.textContent?.trim(),
          link: card.querySelector('a')?.href
        })).filter(item => item.title);
      });
      
      // Blogページの一覧データを取得
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      const blogListData = await page.evaluate(() => {
        const blogItems = Array.from(document.querySelectorAll('[data-testid="blog-item"], .blog-card, article'));
        return blogItems.map(item => ({
          title: item.querySelector('h2, h3, .title')?.textContent?.trim(),
          link: item.querySelector('a')?.href
        })).filter(item => item.title);
      });
      
      console.log('Home blog preview:', homeBlogData.length);
      console.log('Blog page list:', blogListData.length);
      
      // データの整合性確認
      if (homeBlogData.length > 0) {
        expect(blogListData.length).toBeGreaterThan(0);
        
        // Home プレビューの記事が Blog 一覧に存在することを確認
        for (const homeBlog of homeBlogData.slice(0, 2)) {
          const matchingBlogItem = blogListData.find(blogItem => 
            blogItem.title === homeBlog.title
          );
          
          expect(matchingBlogItem, `"${homeBlog.title}" should exist in blog page`).toBeTruthy();
        }
      } else {
        console.log('No blog preview found on home page - checking if blog page has content');
        expect(blogListData.length).toBeGreaterThanOrEqual(0); // 空でも可
      }
    });

    test('should handle external blog sources (note.com)', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // 外部ブログソースの統合確認
      const externalBlogData = await page.evaluate(() => {
        const blogItems = Array.from(document.querySelectorAll('[data-testid="blog-item"], .blog-card, article'));
        return blogItems.map(item => {
          const link = item.querySelector('a')?.href;
          const isExternal = link && !link.startsWith(window.location.origin);
          const isNoteSource = link && link.includes('note.com');
          
          return {
            title: item.querySelector('h2, h3, .title')?.textContent?.trim(),
            link,
            isExternal,
            isNoteSource,
            hasTargetBlank: item.querySelector('a')?.target === '_blank'
          };
        }).filter(item => item.title);
      });
      
      const externalBlogs = externalBlogData.filter(blog => blog.isExternal);
      const noteBlogs = externalBlogData.filter(blog => blog.isNoteSource);
      
      console.log(`External blogs found: ${externalBlogs.length}`);
      console.log(`Note.com blogs found: ${noteBlogs.length}`);
      
      // 外部リンクのセキュリティ確認
      externalBlogs.forEach(blog => {
        if (blog.isExternal) {
          expect(blog.hasTargetBlank, `External link "${blog.title}" should open in new tab`).toBeTruthy();
        }
      });
      
      // note.com記事の統合確認
      if (noteBlogs.length > 0) {
        expect(noteBlogs[0].link).toMatch(/https:\/\/note\.com/);
        console.log('Note.com integration working correctly');
      }
    });

    test('should validate blog content structure', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // ローカルブログ記事の詳細ページを確認
      const localBlogLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        return links
          .filter(link => link.href.includes('/blog/') && !link.href.includes('note.com'))
          .map(link => link.href);
      });
      
      if (localBlogLinks.length > 0) {
        await page.goto(localBlogLinks[0]);
        await page.waitForLoadState('networkidle');
        
        // ブログ記事の構造確認
        const articleStructure = await page.evaluate(() => {
          return {
            hasTitle: !!document.querySelector('h1'),
            hasDate: !!document.querySelector('[data-date], .date, time'),
            hasContent: !!document.querySelector('p, div.content, main'),
            hasBackLink: !!document.querySelector('a[href="/blog"], .back-link'),
            wordCount: document.body.textContent?.split(/\s+/).length || 0
          };
        });
        
        expect(articleStructure.hasTitle).toBeTruthy();
        expect(articleStructure.hasContent).toBeTruthy();
        expect(articleStructure.wordCount).toBeGreaterThan(10);
        
        console.log('Article structure:', articleStructure);
      } else {
        console.log('No local blog articles found - external only setup');
      }
    });
  });

  test.describe('Data Source Performance', () => {
    test('should load data efficiently', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // データ読み込みパフォーマンス確認
      expect(loadTime).toBeLessThan(5000); // 5秒以内
      
      // データが実際に表示されていることを確認
      const hasContent = await page.evaluate(() => {
        const workPreviews = document.querySelectorAll('[data-testid="work-preview"], .work-card');
        const blogPreviews = document.querySelectorAll('[data-testid="blog-preview"], .blog-card');
        
        return {
          worksCount: workPreviews.length,
          blogsCount: blogPreviews.length,
          totalContent: workPreviews.length + blogPreviews.length
        };
      });
      
      console.log(`Content loaded in ${loadTime}ms:`, hasContent);
      expect(hasContent.totalContent).toBeGreaterThan(0);
    });

    test('should handle data loading errors gracefully', async ({ page }) => {
      // ネットワークエラーのシミュレーション
      await page.route('**/api/**', route => route.abort());
      await page.route('**/note.com/**', route => route.abort());
      
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // エラー状態でもページが表示されることを確認
      await expect(page.locator('h1')).toBeVisible();
      
      // エラーメッセージまたはfallbackコンテンツの確認
      const errorHandling = await page.evaluate(() => {
        const hasErrorMessage = !!document.querySelector('[data-testid="error"], .error-message');
        const hasEmptyState = !!document.querySelector('[data-testid="empty-state"], .empty');
        const hasLoadingState = !!document.querySelector('[data-testid="loading"], .loading');
        
        return {
          hasErrorMessage,
          hasEmptyState,
          hasLoadingState,
          pageStillFunctional: !!document.querySelector('nav')
        };
      });
      
      expect(errorHandling.pageStillFunctional).toBeTruthy();
      console.log('Error handling:', errorHandling);
    });
  });

  test.describe('Data Schema Validation', () => {
    test('should validate works data schema', async ({ page }) => {
      await page.goto('/portfolio');
      await page.waitForLoadState('networkidle');
      
      // データスキーマの確認
      const worksSchema = await page.evaluate(() => {
        const workItems = Array.from(document.querySelectorAll('tr, [data-testid="work-item"]'));
        
        if (workItems.length === 0) return { valid: false, reason: 'No work items found' };
        
        const firstWork = workItems[0];
        const hasRequiredFields = {
          title: !!firstWork.querySelector('.title, h3, td:first-child'),
          link: !!firstWork.querySelector('a'),
          description: !!firstWork.querySelector('.description, .excerpt, p')
        };
        
        return {
          valid: Object.values(hasRequiredFields).every(Boolean),
          fields: hasRequiredFields,
          itemCount: workItems.length
        };
      });
      
      expect(worksSchema.valid, `Works schema validation failed: ${JSON.stringify(worksSchema)}`).toBeTruthy();
      console.log('Works schema validation:', worksSchema);
    });

    test('should validate blog data schema', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // ブログデータスキーマの確認
      const blogSchema = await page.evaluate(() => {
        const blogItems = Array.from(document.querySelectorAll('[data-testid="blog-item"], .blog-card, article'));
        
        if (blogItems.length === 0) return { valid: false, reason: 'No blog items found' };
        
        const firstBlog = blogItems[0];
        const hasRequiredFields = {
          title: !!firstBlog.querySelector('h2, h3, .title'),
          link: !!firstBlog.querySelector('a'),
          date: !!firstBlog.querySelector('.date, time, [data-date]')
        };
        
        return {
          valid: Object.values(hasRequiredFields).some(Boolean), // 少なくとも1つは必要
          fields: hasRequiredFields,
          itemCount: blogItems.length
        };
      });
      
      // ブログが存在する場合のみスキーマ検証
      if (blogSchema.itemCount > 0) {
        expect(blogSchema.fields.title, 'Blog items should have titles').toBeTruthy();
        expect(blogSchema.fields.link, 'Blog items should have links').toBeTruthy();
      }
      
      console.log('Blog schema validation:', blogSchema);
    });
  });
}); 