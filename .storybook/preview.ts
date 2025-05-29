import type { Preview } from '@storybook/react'
import { withThemeDecorator } from './preview-decorator'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },

    // Enable automatic documentation for all stories
    docs: {
      autodocs: true,
      story: {
        inline: true,
      },
      // Better documentation layout
      canvas: {
        sourceState: 'shown',
      },
    },

    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
        { name: 'twitter', value: '#00aced' },
        { name: 'facebook', value: '#3b5998' },
      ],
    },

    viewport: {
      viewports: {
        mobile1: {
          name: 'Small mobile',
          styles: { width: '320px', height: '568px' },
        },
        mobile2: {
          name: 'Large mobile',
          styles: { width: '414px', height: '896px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '834px', height: '1112px' },
        },
        laptop: {
          name: 'Laptop',
          styles: { width: '1366px', height: '768px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1920px', height: '1080px' },
        },
      },
    },

    layout: 'centered',

    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            reviewOnFail: true,
          },
        ],
      },
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  decorators: [withThemeDecorator],
};

export default preview;