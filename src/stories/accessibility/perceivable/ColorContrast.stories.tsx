import React from 'react';
import type { StoryFn } from '@storybook/react';
import { Box, Typography, Paper, Stack } from '@mui/material';

interface ColorContrastDemoProps {
  backgroundColor: string;
  textColor: string;
  contrastRatio: string;
  wcagLevel: 'AA' | 'AAA';
}

const ColorContrastDemo = ({ backgroundColor, textColor, contrastRatio, wcagLevel }: ColorContrastDemoProps) => {
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400 }}>
      <Stack spacing={2}>
        <Typography variant="h6">
          Color Contrast Example
        </Typography>
        <Box
          sx={{
            backgroundColor,
            color: textColor,
            p: 3,
            borderRadius: 1,
          }}
        >
          <Typography variant="body1">
            This text demonstrates {wcagLevel} level contrast
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            The quick brown fox jumps over the lazy dog
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" display="block">
            Background Color: {backgroundColor}
          </Typography>
          <Typography variant="caption" display="block">
            Text Color: {textColor}
          </Typography>
          <Typography variant="caption" display="block">
            Contrast Ratio: {contrastRatio}
          </Typography>
          <Typography variant="caption" display="block">
            WCAG Level: {wcagLevel}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/Perceivable/Color Contrast',
  component: ColorContrastDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 1.4.3 Contrast (Minimum) - The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for large text which can be 3:1.'
      }
    }
  }
};

const Template: StoryFn<typeof ColorContrastDemo> = (args) => <ColorContrastDemo {...args} />;

export const AACompliant = Template.bind({});
AACompliant.args = {
  backgroundColor: '#FFFFFF',
  textColor: '#595959',
  contrastRatio: '4.5:1',
  wcagLevel: 'AA'
};

export const AAACompliant = Template.bind({});
AAACompliant.args = {
  backgroundColor: '#FFFFFF',
  textColor: '#3D3D3D',
  contrastRatio: '7:1',
  wcagLevel: 'AAA'
};

export const LargeTextAA = Template.bind({});
LargeTextAA.args = {
  backgroundColor: '#FFFFFF',
  textColor: '#767676',
  contrastRatio: '3:1',
  wcagLevel: 'AA'
}; 