import React from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

interface CompatibleProps {
  showValidation: boolean;
}

const CompatibleDemo = ({ showValidation }: CompatibleProps) => {
  // Example of valid HTML structure
  const validHTML = `
    <article>
      <h1>Main Title</h1>
      <section>
        <h2>Section Title</h2>
        <p>Content with <strong>proper</strong> nesting.</p>
      </section>
    </article>
  `;

  // Example of invalid HTML structure
  const invalidHTML = `
    <article>
      <h1>Main Title</h1>
      <div>
        <h3>Incorrect Heading Level</h3>
        <p>Content with <em>improper</em> closing tags.</p>
      <div>
    </article>
  `;

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Compatible Markup Demo
        </Typography>

        {/* Valid HTML Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Valid HTML Structure
            </Typography>
            <Box
              component="pre"
              sx={{
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 1,
                overflow: 'auto',
              }}
            >
              <code>{validHTML.trim()}</code>
            </Box>
            {showValidation && (
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="✓ Complete start and end tags"
                    secondary="All elements are properly opened and closed"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="✓ Proper element nesting"
                    secondary="Elements are nested according to their specifications"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="✓ Unique IDs"
                    secondary="No duplicate ID attributes in the document"
                  />
                </ListItem>
              </List>
            )}
          </CardContent>
        </Card>

        {/* Invalid HTML Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Invalid HTML Structure
            </Typography>
            <Box
              component="pre"
              sx={{
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 1,
                overflow: 'auto',
              }}
            >
              <code>{invalidHTML.trim()}</code>
            </Box>
            {showValidation && (
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="✗ Missing end tag"
                    secondary="The div element is not properly closed"
                    sx={{ color: 'error.main' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="✗ Incorrect heading hierarchy"
                    secondary="Skips from h1 to h3, breaking document outline"
                    sx={{ color: 'error.main' }}
                  />
                </ListItem>
              </List>
            )}
          </CardContent>
        </Card>

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            This demo implements WCAG 4.1.1 Parsing guidelines:
            <ul>
              <li>Elements have complete start and end tags</li>
              <li>Elements are nested according to specifications</li>
              <li>Elements do not contain duplicate attributes</li>
              <li>IDs are unique within the document</li>
            </ul>
            <Divider sx={{ my: 2 }} />
            <Typography variant="caption" display="block">
              Note: Modern browsers may automatically correct some HTML parsing errors,
              but this can lead to unexpected behavior and accessibility issues.
              Always validate your HTML to ensure compatibility.
            </Typography>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/4. Robust/4.1.1 Compatible',
  component: CompatibleDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 4.1.1 Compatible (Parsing) - Content can be reliably interpreted by user agents, including assistive technologies.'
      }
    }
  }
};

const Template: StoryFn<typeof CompatibleDemo> = (args) => <CompatibleDemo {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  showValidation: false,
};

export const WithValidation = Template.bind({});
WithValidation.args = {
  showValidation: true,
}; 