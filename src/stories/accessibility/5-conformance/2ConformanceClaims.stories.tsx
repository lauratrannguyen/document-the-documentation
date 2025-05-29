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
        component: `
# WCAG 2.2 Conformance Claims

## What is a Conformance Claim?
A conformance claim is an official declaration that documents how well your web content meets WCAG requirements. It serves as a transparent communication tool between content providers and users, clearly stating the level of accessibility achieved and any limitations or exceptions.

### Purpose and Importance
- **Transparency**: Clearly communicates accessibility status to users
- **Accountability**: Creates a formal record of accessibility commitment
- **Documentation**: Provides a reference point for accessibility maintenance
- **Compliance**: Helps demonstrate regulatory compliance where required
- **User Trust**: Builds confidence in your commitment to accessibility

This component demonstrates how to properly document and declare conformance with WCAG guidelines.

## Key Components of a Claim
A complete conformance claim must include:

### Required Elements
- **Date of Claim**: When the conformance claim was made
- **Guidelines Version**: Version of WCAG used for conformance
- **Conformance Level**: Level of conformance achieved (A, AA, or AAA)
- **Scope**: Exact pages covered by the claim
- **Technologies**: List of technologies required for conformance

### Optional Elements
- Pre-recorded media information
- Live media information
- Non-relied upon technologies
- Additional accessibility features
- Documented exceptions

## Implementation Guidelines
- Claims must be accurate and verifiable
- All required components must be included
- Claims should be regularly reviewed and updated
- Scope must be clearly defined
- Exceptions must be documented

## Best Practices
- Keep claims current and accurate
- Document testing methodologies
- Include specific version numbers
- List all relied-upon technologies
- Specify any limitations or exceptions
- Maintain detailed documentation
- Review claims periodically

## Technical Requirements
- Include all mandatory claim components
- Document accessibility-supported technologies
- Specify exact pages or sections covered
- List any additional requirements met
- Document testing and verification methods

## Maintaining Claims
- Regular review and updates
- Version control for changes
- Documentation of testing
- Contact information for inquiries
- Process for addressing issues
`
      }
    }
  },
  argTypes: {
    showExampleClaim: {
      control: 'boolean',
      description: 'Shows an example of a complete conformance claim',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
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
Basic.parameters = {
  docs: {
    description: {
      story: 'Basic view showing the required components of a WCAG conformance claim.'
    }
  }
};

export const WithExampleClaim = Template.bind({});
WithExampleClaim.args = {
  showExampleClaim: true,
};
WithExampleClaim.parameters = {
  docs: {
    description: {
      story: `
Complete example of a WCAG conformance claim including:
- Detailed date and version information
- Specific conformance level declaration
- Clear scope definition
- List of relied-upon technologies
- Additional conformance information
      `
    }
  }
}; 