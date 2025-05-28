import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Accessibility/1.1.1 Text Alternatives',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### WCAG 2.1 Success Criterion 1.1.1: Non-text Content
All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.

This story demonstrates proper implementation of alt text for images and icons.
        `
      }
    }
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const ExampleCard = () => (
  <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      height="140"
      image="https://source.unsplash.com/random/345x140/?nature"
      alt="A beautiful nature landscape showing mountains and trees"
      title="Nature landscape"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Proper Image Alt Text
      </Typography>
      <Typography variant="body2" color="text.secondary">
        This image has descriptive alt text that explains what the image contains,
        making it accessible to screen readers and when images fail to load.
      </Typography>
    </CardContent>
  </Card>
);

export const WithAltText: Story = {
  render: () => <ExampleCard />,
  parameters: {
    docs: {
      description: {
        story: 'This example shows an image with proper alt text that describes the content of the image.'
      }
    }
  }
}; 