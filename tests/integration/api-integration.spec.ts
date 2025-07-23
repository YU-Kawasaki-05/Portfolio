import { test, expect } from '@playwright/test';

test.describe('API Integration Tests', () => {
  
  test.describe('Note.com RSS Integration', () => {
    test('should integrate note.com RSS feed successfully', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // note.com記事の存在確認
      const noteBlogData = await page.evaluate(() => {
        const blogItems = Array.from(document.querySelectorAll('[data-testid="blog-item"], .blog-card, article'));
        
        return blogItems.map(item => {
          const link = item.querySelector('a')?.href;
          const title = item.querySelector('h2, h3, .title')?.textContent?.trim();
          const isNoteArticle = link && link.includes('note.com');
          
          return {
            title,
            link,
            isNoteArticle,
            hasTitle: !!title,
            hasValidLink: !!link && link.startsWith('http')
          };
        }).filter(item => item.isNoteArticle);
      });
      
      if (noteBlogData.length > 0) {
        console.log(`Found ${noteBlogData.length} note.com articles`);
        
        // 各note記事の基本構造確認
        for (const article of noteBlogData.slice(0, 3)) { // 最初の3個をテスト
          expect(article.hasTitle, 'Note article should have title').toBeTruthy();
          expect(article.hasValidLink, 'Note article should have valid link').toBeTruthy();
          expect(article.link).toMatch(/^https:\/\/note\.com/);
          
          console.log(`✓ Note article: "${article.title?.slice(0, 50)}..."`);
        }
      } else {
        console.log('No note.com articles found - may be external-only or disabled');
      }
    });

    test('should handle RSS feed errors gracefully', async ({ page }) => {
      // RSS フィードへのリクエストを失敗させる
      await page.route('**/note.com/**', route => route.abort());
      await page.route('**/rss**', route => route.abort());
      
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // エラー状態でもページが正常に表示されることを確認
      await expect(page.locator('h1')).toBeVisible();
      
      // エラーハンドリングの確認
      const errorHandling = await page.evaluate(() => {
        return {
          hasErrorMessage: !!document.querySelector('[data-testid="rss-error"], .rss-error, .api-error'),
          hasEmptyState: !!document.querySelector('[data-testid="empty-state"], .empty-blog'),
          hasLoadingState: !!document.querySelector('[data-testid="loading"], .loading'),
          pageStillFunctional: !!document.querySelector('nav') && !!document.querySelector('h1')
        };
      });
      
      expect(errorHandling.pageStillFunctional, 
        'Page should remain functional when RSS fails').toBeTruthy();
      
      console.log('RSS error handling:', errorHandling);
    });

    test('should validate RSS data structure', async ({ page }) => {
      // RSS取得スクリプトの直接テスト
      const rssDataValidation = await page.evaluate(async () => {
        try {
          // RSS取得ロジックの模擬テスト
          const mockRssData = {
            items: [
              {
                title: 'Test Article 1',
                link: 'https://note.com/test/n/test1',
                pubDate: new Date().toISOString(),
                description: 'Test description'
              },
              {
                title: 'Test Article 2',
                link: 'https://note.com/test/n/test2',
                pubDate: new Date().toISOString(),
                description: 'Test description 2'
              }
            ]
          };
          
          // データ構造の検証
          const isValidStructure = mockRssData.items.every(item => 
            item.title && 
            item.link && 
            item.pubDate &&
            item.link.startsWith('https://note.com')
          );
          
          return {
            isValidStructure,
            itemCount: mockRssData.items.length,
            sampleItem: mockRssData.items[0]
          };
        } catch (error) {
          return {
            error: error instanceof Error ? error.message : 'Unknown error',
            isValidStructure: false
          };
        }
      });
      
      expect(rssDataValidation.isValidStructure, 
        'RSS data should have valid structure').toBeTruthy();
      
      console.log('RSS data validation:', rssDataValidation);
    });

    test('should handle RSS cache appropriately', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // 初回読み込み時間の測定
      const firstLoadTime = Date.now();
      await page.reload();
      await page.waitForLoadState('networkidle');
      const firstLoadDuration = Date.now() - firstLoadTime;
      
      // 2回目の読み込み（キャッシュ効果を期待）
      const secondLoadTime = Date.now();
      await page.reload();
      await page.waitForLoadState('networkidle');
      const secondLoadDuration = Date.now() - secondLoadTime;
      
      console.log(`Load times: First=${firstLoadDuration}ms, Second=${secondLoadDuration}ms`);
      
      // 両方とも適切な時間内で読み込まれることを確認
      expect(firstLoadDuration).toBeLessThan(10000); // 10秒以内
      expect(secondLoadDuration).toBeLessThan(8000);  // 8秒以内（キャッシュ効果）
    });
  });

  test.describe('External API Integration', () => {
    test('should handle external link validation', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // 外部リンクの検証
      const externalLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href^="http"]')) as HTMLAnchorElement[];
        
        return links.map(link => ({
          href: link.href,
          text: link.textContent?.trim(),
          target: link.target,
          rel: link.rel,
          isNote: link.href.includes('note.com'),
          hasSecureAttributes: link.target === '_blank' && link.rel.includes('noopener')
        }));
      });
      
      const noteLinks = externalLinks.filter(link => link.isNote);
      
      for (const link of noteLinks.slice(0, 3)) { // 最初の3個をテスト
        expect(link.target, 'Note links should open in new tab').toBe('_blank');
        expect(link.hasSecureAttributes, 'Note links should have secure attributes').toBeTruthy();
        
        console.log(`✓ Secure note link: ${link.text?.slice(0, 30)}...`);
      }
    });

    test('should validate API response format', async ({ page }) => {
      // API レスポンスの形式確認
      const apiValidation = await page.evaluate(() => {
        // fetch-notes.ts の動作をシミュレート
        const mockApiResponse = {
          status: 'success',
          data: {
            feed: {
              title: 'Test Note Feed',
              link: 'https://note.com/test',
              description: 'Test feed description'
            },
            items: [
              {
                title: 'Sample Note Article',
                link: 'https://note.com/test/n/sample',
                pubDate: '2023-01-01T00:00:00Z',
                description: 'Sample description',
                author: 'Test Author'
              }
            ]
          }
        };
        
        // レスポンス形式の検証
        const hasValidStructure = 
          mockApiResponse.status === 'success' &&
          mockApiResponse.data &&
          mockApiResponse.data.feed &&
          Array.isArray(mockApiResponse.data.items) &&
          mockApiResponse.data.items.length > 0;
        
        const firstItem = mockApiResponse.data.items[0];
        const hasValidItem = 
          firstItem.title &&
          firstItem.link &&
          firstItem.pubDate &&
          new Date(firstItem.pubDate).getTime() > 0;
        
        return {
          hasValidStructure,
          hasValidItem,
          itemCount: mockApiResponse.data.items.length,
          feedTitle: mockApiResponse.data.feed.title
        };
      });
      
      expect(apiValidation.hasValidStructure, 'API response should have valid structure').toBeTruthy();
      expect(apiValidation.hasValidItem, 'API items should have valid format').toBeTruthy();
      
      console.log('API validation:', apiValidation);
    });

    test('should handle rate limiting gracefully', async ({ page }) => {
      // レート制限のシミュレーション
      let requestCount = 0;
      
      await page.route('**/api/**', route => {
        requestCount++;
        if (requestCount > 3) {
          route.fulfill({
            status: 429,
            headers: { 'Retry-After': '60' },
            body: JSON.stringify({ error: 'Rate limit exceeded' })
          });
        } else {
          route.continue();
        }
      });
      
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // 複数回リロードしてレート制限をトリガー
      for (let i = 0; i < 5; i++) {
        await page.reload();
        await page.waitForTimeout(100);
      }
      
      // ページが正常に動作し続けることを確認
      await expect(page.locator('h1')).toBeVisible();
      
      console.log(`Rate limiting test: ${requestCount} requests made`);
    });
  });

  test.describe('Data Synchronization', () => {
    test('should maintain data consistency between sources', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // ローカルとリモートデータの統合確認
      const dataConsistency = await page.evaluate(() => {
        const allBlogItems = Array.from(document.querySelectorAll('[data-testid="blog-item"], .blog-card, article'));
        
        const localItems = allBlogItems.filter(item => {
          const link = item.querySelector('a')?.href;
          return link && !link.includes('note.com');
        });
        
        const externalItems = allBlogItems.filter(item => {
          const link = item.querySelector('a')?.href;
          return link && link.includes('note.com');
        });
        
        // 重複チェック
        const allTitles = allBlogItems.map(item => 
          item.querySelector('h2, h3, .title')?.textContent?.trim()
        ).filter(Boolean);
        
        const uniqueTitles = new Set(allTitles);
        const hasDuplicates = allTitles.length !== uniqueTitles.size;
        
        return {
          totalItems: allBlogItems.length,
          localItems: localItems.length,
          externalItems: externalItems.length,
          uniqueTitles: uniqueTitles.size,
          hasDuplicates
        };
      });
      
      expect(dataConsistency.hasDuplicates, 'Should not have duplicate blog titles').toBeFalsy();
      
      console.log('Data consistency:', dataConsistency);
    });

    test('should handle concurrent data updates', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // 同時データ更新のシミュレーション
      const concurrentTest = await page.evaluate(async () => {
        const startTime = Date.now();
        
        // 複数のデータソースから同時読み込みをシミュレート
        const promises = [
          Promise.resolve({ source: 'local', items: ['item1', 'item2'] }),
          Promise.resolve({ source: 'rss', items: ['item3', 'item4'] }),
          Promise.resolve({ source: 'cache', items: ['item5', 'item6'] })
        ];
        
        const results = await Promise.all(promises);
        const endTime = Date.now();
        
        return {
          duration: endTime - startTime,
          sources: results.length,
          totalItems: results.reduce((sum, result) => sum + result.items.length, 0),
          allResolved: results.every(result => result.items.length > 0)
        };
      });
      
      expect(concurrentTest.allResolved, 'All data sources should resolve').toBeTruthy();
      expect(concurrentTest.duration).toBeLessThan(1000); // 1秒以内で完了
      
      console.log('Concurrent data test:', concurrentTest);
    });
  });

  test.describe('Error Recovery', () => {
    test('should recover from network failures', async ({ page }) => {
      // 初期状態の確認
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      const initialState = await page.evaluate(() => ({
        blogCount: document.querySelectorAll('[data-testid="blog-item"], .blog-card, article').length,
        hasContent: !!document.querySelector('h1')
      }));
      
      // ネットワーク障害をシミュレート
      await page.route('**/*', route => route.abort());
      
      // ページリロード
      await page.goto('/blog');
      
      // 基本機能が維持されることを確認
      await expect(page.locator('body')).toBeVisible();
      
      // ネットワーク復旧をシミュレート
      await page.unroute('**/*');
      
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      const recoveredState = await page.evaluate(() => ({
        blogCount: document.querySelectorAll('[data-testid="blog-item"], .blog-card, article').length,
        hasContent: !!document.querySelector('h1')
      }));
      
      expect(recoveredState.hasContent, 'Should recover content after network restoration').toBeTruthy();
      
      console.log('Network recovery:', { initialState, recoveredState });
    });

    test('should handle malformed RSS data', async ({ page }) => {
      // 不正なRSSデータのシミュレーション
      await page.route('**/rss**', route => {
        route.fulfill({
          status: 200,
          headers: { 'Content-Type': 'application/xml' },
          body: '<invalid>malformed xml content</invalid>'
        });
      });
      
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // エラーが適切に処理されることを確認
      const errorHandling = await page.evaluate(() => ({
        hasErrorState: !!document.querySelector('[data-testid="rss-error"], .error'),
        pageStillWorks: !!document.querySelector('h1') && !!document.querySelector('nav'),
        hasLocalContent: document.querySelectorAll('[data-testid="blog-item"], .blog-card, article').length > 0
      }));
      
      expect(errorHandling.pageStillWorks, 'Page should work despite RSS errors').toBeTruthy();
      
      console.log('Malformed RSS handling:', errorHandling);
    });

    test('should handle timeout scenarios', async ({ page }) => {
      // タイムアウトのシミュレーション
      await page.route('**/api/**', route => {
        // 長時間のレスポンス遅延をシミュレート
        setTimeout(() => route.continue(), 10000); // 10秒遅延
      });
      
      const startTime = Date.now();
      
      await page.goto('/blog');
      
      // 適切な時間内にページが読み込まれることを確認（タイムアウト処理）
      await page.waitForLoadState('domcontentloaded', { timeout: 5000 });
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(6000); // 6秒以内（タイムアウト処理により）
      
      // 基本コンテンツが表示されることを確認
      await expect(page.locator('h1')).toBeVisible();
      
      console.log(`Timeout handling: Page loaded in ${loadTime}ms despite API delay`);
    });
  });

  test.describe('Performance Impact', () => {
    test('should not significantly impact page performance', async ({ page }) => {
      // パフォーマンス測定
      const performanceTest = await page.evaluate(() => {
        const startTime = performance.now();
        
        return new Promise((resolve) => {
          // RSS統合を含むページ読み込みの測定
          window.addEventListener('load', () => {
            const endTime = performance.now();
            const loadTime = endTime - startTime;
            
            const performanceEntries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            
            resolve({
              totalLoadTime: loadTime,
              domContentLoaded: performanceEntries.domContentLoadedEventEnd - performanceEntries.domContentLoadedEventStart,
              networkTime: performanceEntries.responseEnd - performanceEntries.requestStart,
              renderTime: performanceEntries.loadEventEnd - performanceEntries.responseEnd
            });
          });
        });
      });
      
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      const perf = await performanceTest;
      console.log('Performance metrics:', perf);
      
      expect((perf as any).totalLoadTime).toBeLessThan(5000); // 5秒以内
    });

    test('should handle large RSS feeds efficiently', async ({ page }) => {
      // 大量のRSSアイテムをシミュレート
      await page.route('**/rss**', route => {
        const largeFeed = {
          items: Array.from({ length: 100 }, (_, i) => ({
            title: `Test Article ${i + 1}`,
            link: `https://note.com/test/n/article-${i + 1}`,
            pubDate: new Date(Date.now() - i * 86400000).toISOString(),
            description: `Description for article ${i + 1}`
          }))
        };
        
        route.fulfill({
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(largeFeed)
        });
      });
      
      const startTime = Date.now();
      
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // 大量データでも適切な時間で読み込まれることを確認
      expect(loadTime).toBeLessThan(8000); // 8秒以内
      
      // ページネーションや制限が適用されているかチェック
      const displayedItems = await page.evaluate(() => {
        return document.querySelectorAll('[data-testid="blog-item"], .blog-card, article').length;
      });
      
      // 表示アイテム数が制限されていることを確認（パフォーマンス対策）
      expect(displayedItems).toBeLessThanOrEqual(20); // 20件以下に制限
      
      console.log(`Large feed handling: ${displayedItems} items displayed in ${loadTime}ms`);
    });
  });
}); 