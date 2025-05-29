import React, { useState } from 'react';
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
  Alert,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface CompatibleProps {
  showValidation: boolean;
}

const CompatibleDemo = ({ 
  showValidation,
}: CompatibleProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showLiveValidation, setShowLiveValidation] = useState(showValidation);

  // Common edge cases in HTML/ARIA usage
  const edgeCases = [
    {
      title: 'Nested Interactive Elements',
      valid: `<button type="button">
  Simple button
</button>`,
      invalid: `<button type="button">
  Click <a href="#">here</a>
</button>`,
      error: 'Interactive elements (like links) should not be nested inside buttons',
      fix: 'Use either a button or a link, not both nested'
    },
    {
      title: 'ARIA Attributes',
      valid: `<button 
  aria-expanded="false"
  aria-controls="menu-1">
  Toggle Menu
</button>`,
      invalid: `<button 
  aria-expanded="collapsed"
  controls="menu-1">
  Toggle Menu
</button>`,
      error: 'Invalid ARIA attribute value and incorrect attribute name',
      fix: 'Use valid ARIA attribute names and values (true/false for aria-expanded)'
    },
    {
      title: 'Form Labels',
      valid: `<label for="name">Name:</label>
<input id="name" type="text" />`,
      invalid: `<label>Name:
  <input type="text">
</label>`,
      error: 'Missing explicit label-input association',
      fix: 'Use matching for/id attributes to associate labels with inputs'
    }
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" sx={{ 
          fontSize: { xs: '1.5rem', sm: '2rem' },
          lineHeight: 1.2,
          fontWeight: 500
        }} gutterBottom>
          Compatible Markup Demo
        </Typography>

        <Alert severity="info">
          Ensuring markup validity is crucial for assistive technologies to correctly
          interpret your content. Common issues include invalid nesting, improper ARIA
          usage, and duplicate IDs.
        </Alert>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab label="Common Edge Cases" />
            <Tab label="Best Practices" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Stack spacing={3}>
            {edgeCases.map((example, index) => (
              <Card key={index}>
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" component="h2">
                        {example.title}
                      </Typography>
                      <Tooltip title="View validation details">
                        <IconButton
                          size="small"
                          onClick={() => setShowLiveValidation(!showLiveValidation)}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Box>
                      <Typography variant="subtitle1" component="h3" gutterBottom>
                        ✓ Valid Example:
                      </Typography>
                      <Box
                        component="pre"
                        sx={{
                          p: 2,
                          bgcolor: 'success.light',
                          borderRadius: 1,
                          overflow: 'auto',
                        }}
                      >
                        <code>{example.valid}</code>
                      </Box>
                    </Box>

                    <Box>
                      <Typography variant="subtitle1" component="h3" gutterBottom>
                        ✗ Invalid Example:
                      </Typography>
                      <Box
                        component="pre"
                        sx={{
                          p: 2,
                          bgcolor: 'error.light',
                          borderRadius: 1,
                          overflow: 'auto',
                        }}
                      >
                        <code>{example.invalid}</code>
                      </Box>
                    </Box>

                    {(showValidation || showLiveValidation) && (
                      <>
                        <Alert severity="error" icon={<ErrorIcon />}>
                          {example.error}
                        </Alert>
                        <Alert severity="success" icon={<CheckCircleIcon />}>
                          Fix: {example.fix}
                        </Alert>
                      </>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        {activeTab === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Best Practices for Compatible Markup
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="1. Validate HTML regularly"
                    secondary="Use tools like W3C Validator to check markup validity"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="2. Test with assistive technologies"
                    secondary="Ensure content works with screen readers and other AT"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="3. Follow ARIA authoring practices"
                    secondary="Use ARIA attributes correctly and only when necessary"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="4. Maintain clean markup"
                    secondary="Avoid unnecessary nesting and maintain proper structure"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="5. Use semantic HTML"
                    secondary="Choose appropriate HTML elements for their intended purpose"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        )}

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
            <Alert severity="warning" sx={{ mt: 2 }}>
              While modern browsers may correct some HTML parsing errors automatically,
              this can lead to unexpected behavior with assistive technologies.
              Always validate your markup to ensure consistent interpretation.
            </Alert>
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
WithValidation.parameters = {
  docs: {
    description: {
      story: 'Shows detailed validation feedback for each example, including error messages and suggested fixes.'
    }
  }
}; 