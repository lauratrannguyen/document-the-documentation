import React from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Alert,
  TextField,
  Button,
} from '@mui/material';

interface ConformanceClaimsProps {
  showExampleClaim: boolean;
}

const ConformanceClaimsDemo = ({
  showExampleClaim,
}: ConformanceClaimsProps) => {
  const requiredComponents = [
    {
      title: 'Date of Claim',
      description: 'When the conformance claim was made',
      example: 'March 15, 2024',
    },
    {
      title: 'Guidelines Version',
      description: 'Version of WCAG used for conformance',
      example: 'WCAG 2.2',
    },
    {
      title: 'Conformance Level',
      description: 'Level of conformance achieved (A, AA, or AAA)',
      example: 'Level AA',
    },
    {
      title: 'Scope',
      description: 'Exact pages covered by the claim',
      example: 'All pages under https://example.com/app/*',
    },
    {
      title: 'Technologies Relied Upon',
      description: 'List of technologies required for conformance',
      example: 'HTML5, CSS3, JavaScript, WAI-ARIA',
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" sx={{ 
          fontSize: { xs: '1.5rem', sm: '2rem' },
          lineHeight: 1.2,
          fontWeight: 500
        }} gutterBottom>
          WCAG 2.2 Conformance Claims
        </Typography>

        <Alert severity="info">
          A conformance claim is a declaration that your web content meets WCAG
          requirements at a specific level. It must include all required components
          and be accurate and up-to-date.
        </Alert>

        {/* Required Components */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Required Components of a Conformance Claim
            </Typography>
            <List>
              {requiredComponents.map((component) => (
                <ListItem key={component.title} divider>
                  <ListItemText
                    primary={component.title}
                    secondary={component.description}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Example Claim */}
        {showExampleClaim && (
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Example Conformance Claim
              </Typography>
              <Box component="form" sx={{ '& > *': { mb: 2 } }}>
                {requiredComponents.map((component) => (
                  <TextField
                    key={component.title}
                    label={component.title}
                    defaultValue={component.example}
                    fullWidth
                    disabled
                    sx={{ mb: 2 }}
                  />
                ))}
                <Button variant="contained" disabled>
                  Submit Claim
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Additional Information */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Optional Additional Claim Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Pre-recorded Audio/Video"
                  secondary="Information about any pre-recorded audio or video content"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Live Audio/Video"
                  secondary="Information about any live audio or video content"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Technologies Used"
                  secondary="List of web technologies used but not relied upon"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Additional Requirements Met"
                  secondary="Any additional accessibility requirements or guidelines met"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            Best Practices for Conformance Claims:
            <ul>
              <li>Keep claims current and accurate</li>
              <li>Document any exceptions or limitations</li>
              <li>Include testing methodology used</li>
              <li>Provide contact information for questions</li>
              <li>Regular review and updates of claims</li>
            </ul>
            <Alert severity="warning" sx={{ mt: 2 }}>
              Remember: A conformance claim is a formal statement of accessibility
              compliance. Ensure all information is accurate and verifiable.
            </Alert>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/5. Conformance/5.2 Conformance Claims',
  component: ConformanceClaimsDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 2.2 Conformance Claims - Understanding how to properly document and declare conformance with WCAG guidelines.'
      }
    }
  }
};

const Template: StoryFn<typeof ConformanceClaimsDemo> = (args) => (
  <ConformanceClaimsDemo {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  showExampleClaim: false,
};

export const WithExampleClaim = Template.bind({});
WithExampleClaim.args = {
  showExampleClaim: true,
}; 