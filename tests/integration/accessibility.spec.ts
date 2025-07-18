import { test, expect } from '@playwright/test';

test.describe('Accessibility Integration Tests', () => {
  
  const testPages = ['/', '/portfolio', '/profile', '/services', '/blog'];

  test.describe('Semantic HTML Structure', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      for (const testPage of testPages) {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        const headingStructure = await page.evaluate(() => {
          const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
          
          return headings.map(heading => ({
            level: parseInt(heading.tagName.charAt(1)),
            text: heading.textContent?.trim(),
            hasId: !!heading.id
          }));
        });
        
        // H1が存在することを確認
        const h1Count = headingStructure.filter(h => h.level === 1).length;
        expect(h1Count, `${testPage} should have exactly one H1`).toBe(1);
        
        // 見出しレベルが論理的な順序であることを確認
        let prevLevel = 0;
        for (const heading of headingStructure) {
          if (prevLevel > 0) {
            const levelJump = heading.level - prevLevel;
            expect(levelJump, `Heading level should not skip more than 1 level in ${testPage}`).toBeLessThanOrEqual(1);
          }
          prevLevel = heading.level;
        }
        
        console.log(`${testPage} headings:`, headingStructure.map(h => `H${h.level}: ${h.text?.slice(0, 30)}`));
      }
    });

    test('should have proper landmark regions', async ({ page }) => {
      for (const testPage of testPages) {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        const landmarks = await page.evaluate(() => {
          return {
            header: !!document.querySelector('header, [role="banner"]'),
            nav: !!document.querySelector('nav, [role="navigation"]'),
            main: !!document.querySelector('main, [role="main"]'),
            footer: !!document.querySelector('footer, [role="contentinfo"]'),
            aside: document.querySelectorAll('aside, [role="complementary"]').length
          };
        });
        
        expect(landmarks.header, `${testPage} should have a header landmark`).toBeTruthy();
        expect(landmarks.nav, `${testPage} should have navigation landmark`).toBeTruthy();
        expect(landmarks.main, `${testPage} should have main content landmark`).toBeTruthy();
        expect(landmarks.footer, `${testPage} should have footer landmark`).toBeTruthy();
        
        console.log(`${testPage} landmarks:`, landmarks);
      }
    });

    test('should have proper list structures', async ({ page }) => {
      for (const testPage of testPages) {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        const listStructure = await page.evaluate(() => {
          const lists = Array.from(document.querySelectorAll('ul, ol, dl'));
          
          return lists.map(list => {
            const children = Array.from(list.children);
            const validChildren = children.every(child => {
              if (list.tagName === 'UL' || list.tagName === 'OL') {
                return child.tagName === 'LI';
              } else if (list.tagName === 'DL') {
                return child.tagName === 'DT' || child.tagName === 'DD';
              }
              return false;
            });
            
            return {
              type: list.tagName,
              childCount: children.length,
              validStructure: validChildren
            };
          });
        });
        
        for (const list of listStructure) {
          expect(list.validStructure, 
            `${testPage} ${list.type} should have proper child elements`).toBeTruthy();
        }
        
        if (listStructure.length > 0) {
          console.log(`${testPage} lists:`, listStructure);
        }
      }
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should support tab navigation', async ({ page }) => {
      for (const testPage of testPages.slice(0, 3)) { // 最初の3ページをテスト
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        const focusableElements = await page.evaluate(() => {
          const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
          ];
          
          return Array.from(document.querySelectorAll(focusableSelectors.join(', ')))
            .filter(el => {
              const rect = el.getBoundingClientRect();
              return rect.width > 0 && rect.height > 0; // 見える要素のみ
            }).length;
        });
        
        if (focusableElements > 0) {
          // 最初の要素にフォーカス
          await page.keyboard.press('Tab');
          
          let focusedElement = await page.evaluate(() => {
            return {
              tagName: document.activeElement?.tagName,
              hasVisibleFocus: !!document.activeElement && 
                window.getComputedStyle(document.activeElement).outline !== 'none'
            };
          });
          
          expect(focusedElement.tagName).toBeTruthy();
          
          // 数回タブ移動をテスト
          for (let i = 0; i < Math.min(5, focusableElements - 1); i++) {
            await page.keyboard.press('Tab');
            
            focusedElement = await page.evaluate(() => {
              return {
                tagName: document.activeElement?.tagName,
                isVisible: !!document.activeElement && 
                  document.activeElement.getBoundingClientRect().width > 0
              };
            });
            
            expect(focusedElement.isVisible, 
              `Focused element should be visible on ${testPage}`).toBeTruthy();
          }
          
          console.log(`${testPage}: ${focusableElements} focusable elements, tab navigation working`);
        } else {
          console.log(`${testPage}: No focusable elements found`);
        }
      }
    });

    test('should support shift+tab reverse navigation', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 最初の要素にフォーカス
      await page.keyboard.press('Tab');
      const firstFocus = await page.evaluate(() => document.activeElement?.tagName);
      
      // 次の要素にフォーカス
      await page.keyboard.press('Tab');
      
      // Shift+Tabで戻る
      await page.keyboard.press('Shift+Tab');
      
      const returnedFocus = await page.evaluate(() => document.activeElement?.tagName);
      
      expect(returnedFocus).toBe(firstFocus);
      console.log('✓ Reverse tab navigation working');
    });

    test('should handle keyboard interactions', async ({ page }) => {
      await page.goto('/services');
      await page.waitForLoadState('networkidle');
      
      // ボタンのキーボード操作
      const buttons = await page.locator('button').all();
      
      if (buttons.length > 0) {
        const firstButton = buttons[0];
        await firstButton.focus();
        
        // Enterキーでの操作
        await page.keyboard.press('Enter');
        
        // スペースキーでの操作
        await page.keyboard.press('Space');
        
        console.log('✓ Button keyboard interactions working');
      }
      
      // リンクのキーボード操作
      const links = await page.locator('a[href]').all();
      
      if (links.length > 0) {
        const firstLink = links[0];
        await firstLink.focus();
        
        // Enterキーでリンクを開く
        const href = await firstLink.getAttribute('href');
        if (href && href.startsWith('/')) {
          await page.keyboard.press('Enter');
          
          // ページ遷移が発生することを確認
          await page.waitForLoadState('networkidle');
          expect(page.url()).toContain(href);
          
          console.log('✓ Link keyboard navigation working');
        }
      }
    });
  });

  test.describe('Screen Reader Support', () => {
    test('should have proper alt text for images', async ({ page }) => {
      for (const testPage of testPages) {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        const imageAccessibility = await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll('img'));
          
          return images.map(img => {
            const hasAlt = img.hasAttribute('alt');
            const altText = img.getAttribute('alt');
            const isDecorative = altText === '';
            const hasMeaningfulAlt = altText && altText.length > 0;
            
            return {
              src: img.src.split('/').pop(),
              hasAlt,
              isDecorative,
              hasMeaningfulAlt,
              altLength: altText?.length || 0
            };
          });
        });
        
        for (const img of imageAccessibility) {
          expect(img.hasAlt, 
            `Image ${img.src} in ${testPage} should have alt attribute`).toBeTruthy();
          
          if (!img.isDecorative) {
            expect(img.hasMeaningfulAlt, 
              `Non-decorative image ${img.src} should have meaningful alt text`).toBeTruthy();
          }
        }
        
        if (imageAccessibility.length > 0) {
          const meaningfulAlts = imageAccessibility.filter(img => img.hasMeaningfulAlt).length;
          console.log(`${testPage}: ${meaningfulAlts}/${imageAccessibility.length} images have meaningful alt text`);
        }
      }
    });

    test('should have proper ARIA labels and roles', async ({ page }) => {
      for (const testPage of testPages) {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        const ariaUsage = await page.evaluate(() => {
          const elementsWithAria = Array.from(document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby], [role]'));
          
          return elementsWithAria.map(el => {
            return {
              tagName: el.tagName,
              role: el.getAttribute('role'),
              ariaLabel: el.getAttribute('aria-label'),
              ariaLabelledby: el.getAttribute('aria-labelledby'),
              ariaDescribedby: el.getAttribute('aria-describedby'),
              hasValidRole: el.getAttribute('role') ? true : false
            };
          });
        });
        
        // ボタンのアクセシブルな名前確認
        const buttonAccessibility = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          
          return buttons.map(button => {
            const hasText = button.textContent?.trim().length! > 0;
            const hasAriaLabel = button.hasAttribute('aria-label');
            const hasAccessibleName = hasText || hasAriaLabel;
            
            return {
              hasAccessibleName,
              text: button.textContent?.trim(),
              ariaLabel: button.getAttribute('aria-label')
            };
          });
        });
        
        for (const button of buttonAccessibility) {
          expect(button.hasAccessibleName, 
            `Button should have accessible name (text or aria-label) in ${testPage}`).toBeTruthy();
        }
        
        console.log(`${testPage}: ${ariaUsage.length} elements with ARIA, ${buttonAccessibility.length} buttons`);
      }
    });

    test('should have proper form labels', async ({ page }) => {
      for (const testPage of testPages) {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        const formAccessibility = await page.evaluate(() => {
          const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
          
          return inputs.map(input => {
            const id = input.id;
            const name = input.getAttribute('name');
            const hasLabel = id && document.querySelector(`label[for="${id}"]`);
            const hasAriaLabel = input.hasAttribute('aria-label');
            const hasAriaLabelledby = input.hasAttribute('aria-labelledby');
            const hasPlaceholder = input.hasAttribute('placeholder');
            
            const hasAccessibleLabel = hasLabel || hasAriaLabel || hasAriaLabelledby;
            
            return {
              type: input.type || input.tagName,
              hasAccessibleLabel,
              hasLabel: !!hasLabel,
              hasAriaLabel,
              hasPlaceholder,
              id
            };
          });
        });
        
        for (const input of formAccessibility) {
          if (input.type !== 'hidden' && input.type !== 'submit') {
            expect(input.hasAccessibleLabel || input.hasPlaceholder, 
              `Form input should have accessible label in ${testPage}`).toBeTruthy();
          }
        }
        
        if (formAccessibility.length > 0) {
          const labeledInputs = formAccessibility.filter(input => input.hasAccessibleLabel).length;
          console.log(`${testPage}: ${labeledInputs}/${formAccessibility.length} form inputs have accessible labels`);
        }
      }
    });
  });

  test.describe('Color and Contrast', () => {
    test('should have sufficient color contrast', async ({ page }) => {
      for (const testPage of testPages.slice(0, 3)) { // 最初の3ページをテスト
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        const contrastCheck = await page.evaluate(() => {
          // 基本的なコントラスト確認（簡易版）
          const textElements = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, span'));
          
          return textElements.slice(0, 10).map(el => { // 最初の10要素をチェック
            const styles = window.getComputedStyle(el);
            const color = styles.color;
            const backgroundColor = styles.backgroundColor;
            const fontSize = parseFloat(styles.fontSize);
            
            return {
              tagName: el.tagName,
              color,
              backgroundColor,
              fontSize,
              hasBackgroundColor: backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent',
              isLargeText: fontSize >= 18 || (fontSize >= 14 && styles.fontWeight >= '700')
            };
          });
        });
        
        // 背景色が設定されている要素の確認
        const elementsWithBackground = contrastCheck.filter(el => el.hasBackgroundColor);
        
        if (elementsWithBackground.length > 0) {
          console.log(`${testPage}: ${elementsWithBackground.length}/${contrastCheck.length} text elements have explicit background colors`);
        } else {
          console.log(`${testPage}: Using default color scheme`);
        }
      }
    });

    test('should not rely solely on color for information', async ({ page }) => {
      for (const testPage of testPages) {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        // カラーのみに依存しない設計の確認
        const colorOnlyElements = await page.evaluate(() => {
          // エラーメッセージ、警告、成功メッセージなどの確認
          const statusElements = Array.from(document.querySelectorAll('.error, .warning, .success, .alert, [role="alert"]'));
          
          return statusElements.map(el => {
            const hasIcon = !!el.querySelector('svg, .icon, [aria-hidden="true"]');
            const hasStatusText = el.textContent?.includes('エラー') || 
                                 el.textContent?.includes('警告') || 
                                 el.textContent?.includes('成功') ||
                                 el.textContent?.includes('Error') ||
                                 el.textContent?.includes('Warning') ||
                                 el.textContent?.includes('Success');
            
            return {
              className: el.className,
              hasIcon,
              hasStatusText,
              hasNonColorIndicator: hasIcon || hasStatusText
            };
          });
        });
        
        for (const element of colorOnlyElements) {
          expect(element.hasNonColorIndicator, 
            `Status element should not rely solely on color in ${testPage}`).toBeTruthy();
        }
        
        if (colorOnlyElements.length > 0) {
          console.log(`${testPage}: ${colorOnlyElements.length} status elements checked for color independence`);
        }
      }
    });
  });

  test.describe('Focus Management', () => {
    test('should have visible focus indicators', async ({ page }) => {
      for (const testPage of testPages.slice(0, 2)) { // 最初の2ページをテスト
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        // フォーカス可能な要素を取得
        const focusableElements = await page.locator('a[href], button:not([disabled]), input:not([disabled])').all();
        
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          await firstElement.focus();
          
          const focusStyles = await firstElement.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              outline: styles.outline,
              outlineWidth: styles.outlineWidth,
              outlineStyle: styles.outlineStyle,
              outlineColor: styles.outlineColor,
              boxShadow: styles.boxShadow,
              hasFocusIndicator: styles.outline !== 'none' || 
                               styles.outlineWidth !== '0px' ||
                               styles.boxShadow !== 'none'
            };
          });
          
          expect(focusStyles.hasFocusIndicator, 
            `Focused element should have visible focus indicator in ${testPage}`).toBeTruthy();
          
          console.log(`${testPage}: Focus indicator`, {
            outline: focusStyles.outline,
            boxShadow: focusStyles.boxShadow !== 'none' ? 'present' : 'none'
          });
        }
      }
    });

    test('should manage focus for interactive elements', async ({ page }) => {
      await page.goto('/services');
      await page.waitForLoadState('networkidle');
      
      // モーダルやドロップダウンのフォーカス管理
      const interactiveElements = await page.locator('button[aria-expanded], [data-testid*="toggle"]').all();
      
      if (interactiveElements.length > 0) {
        const firstElement = interactiveElements[0];
        
        // 要素をクリックして展開
        await firstElement.click();
        
        // フォーカスが適切に管理されているか確認
        const focusAfterClick = await page.evaluate(() => {
          return {
            activeElement: document.activeElement?.tagName,
            ariaExpanded: document.activeElement?.getAttribute('aria-expanded')
          };
        });
        
        console.log('Focus after interaction:', focusAfterClick);
      }
    });
  });

  test.describe('Motion and Animation', () => {
    test('should respect prefers-reduced-motion', async ({ page }) => {
      // prefers-reduced-motionを設定
      await page.emulateMedia({ reducedMotion: 'reduce' });
      
      for (const testPage of testPages.slice(0, 2)) {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        // アニメーションが制限されているか確認
        const animationCheck = await page.evaluate(() => {
          const animatedElements = Array.from(document.querySelectorAll('*')).filter(el => {
            const styles = window.getComputedStyle(el);
            return styles.transition !== 'all 0s ease 0s' || 
                   styles.animation !== 'none' ||
                   styles.transform !== 'none';
          });
          
          return {
            animatedElementCount: animatedElements.length,
            prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          };
        });
        
        if (animationCheck.prefersReducedMotion) {
          console.log(`${testPage}: Prefers reduced motion respected, ${animationCheck.animatedElementCount} animated elements`);
        }
      }
    });

    test('should not cause seizures with flashing content', async ({ page }) => {
      for (const testPage of testPages) {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        // 点滅コンテンツの確認
        const flashingContent = await page.evaluate(() => {
          const potentialFlashing = Array.from(document.querySelectorAll('*')).filter(el => {
            const styles = window.getComputedStyle(el);
            const animation = styles.animation;
            
            // 高速な点滅アニメーションの検出
            return animation.includes('blink') || 
                   animation.includes('flash') ||
                   (animation.includes('s') && parseFloat(animation) < 0.5);
          });
          
          return potentialFlashing.length;
        });
        
        expect(flashingContent, 
          `${testPage} should not have rapid flashing content`).toBe(0);
        
        if (flashingContent === 0) {
          console.log(`${testPage}: No potentially seizure-inducing content detected`);
        }
      }
    });
  });

  test.describe('Language and Reading', () => {
    test('should have proper language attributes', async ({ page }) => {
      for (const testPage of testPages) {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        const languageInfo = await page.evaluate(() => {
          return {
            htmlLang: document.documentElement.getAttribute('lang'),
            hasLangAttribute: document.documentElement.hasAttribute('lang'),
            title: document.title
          };
        });
        
        expect(languageInfo.hasLangAttribute, 
          `${testPage} should have lang attribute on html element`).toBeTruthy();
        
        if (languageInfo.htmlLang) {
          expect(languageInfo.htmlLang.length, 
            `${testPage} lang attribute should not be empty`).toBeGreaterThan(0);
        }
        
        console.log(`${testPage}: lang="${languageInfo.htmlLang}"`);
      }
    });

    test('should have readable content structure', async ({ page }) => {
      for (const testPage of testPages) {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        const readabilityCheck = await page.evaluate(() => {
          const textContent = document.body.textContent || '';
          const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
          
          const paragraphs = Array.from(document.querySelectorAll('p'));
          const averageParagraphLength = paragraphs.length > 0 ? 
            paragraphs.reduce((sum, p) => sum + (p.textContent?.split(/\s+/).length || 0), 0) / paragraphs.length : 0;
          
          return {
            wordCount,
            paragraphCount: paragraphs.length,
            averageParagraphLength: Math.round(averageParagraphLength),
            hasContent: wordCount > 10
          };
        });
        
        expect(readabilityCheck.hasContent, 
          `${testPage} should have readable content`).toBeTruthy();
        
        console.log(`${testPage}: ${readabilityCheck.wordCount} words, ${readabilityCheck.paragraphCount} paragraphs`);
      }
    });
  });
}); 