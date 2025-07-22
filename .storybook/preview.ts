import type { Preview } from '@storybook/nextjs-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations  
      // 'off' - skip a11y checks entirely
      test: 'todo',
      
      // Configure accessibility rules
      config: {
        rules: [
          // Enable important WCAG rules
          { id: 'color-contrast', enabled: true },
          { id: 'focus-order-semantics', enabled: true },
          { id: 'image-alt', enabled: true },
          { id: 'label', enabled: true },
          { id: 'link-name', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'keyboard', enabled: true },
          
          // Disable some rules that might be too strict for component demos
          { id: 'landmark-one-main', enabled: false },
          { id: 'region', enabled: false },
          { id: 'page-has-heading-one', enabled: false },
        ]
      },
      
      // Options for testing
      options: {
        timeout: 2000,
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      }
    },
    
    // Add better documentation support
    docs: {
      story: {
        height: 'auto'
      }
    },
    
    // Add viewport for responsive testing
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' }
        },
        tablet: {
          name: 'Tablet', 
          styles: { width: '768px', height: '1024px' }
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1200px', height: '800px' }
        }
      }
    }
  },
};

export default preview;