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
  ListItemIcon,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
} from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import BugReportIcon from '@mui/icons-material/BugReport';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupIcon from '@mui/icons-material/Group';

interface ConformanceTestingProps {
  showDetailedSteps: boolean;
}

const ConformanceTestingDemo = ({
  showDetailedSteps,
}: ConformanceTestingProps) => {
  const testingSteps = [
    {
      label: 'Preliminary Review',
      description: 'Initial assessment of web content accessibility',
      details: [
        'Review page structure and navigation',
        'Check basic keyboard accessibility',
        'Verify presence of alt text',
        'Test color contrast',
      ],
      icon: <AutoFixHighIcon />,
    },
    {
      label: 'Automated Testing',
      description: 'Use accessibility testing tools and validators',
      details: [
        'Run automated accessibility checkers',
        'Validate HTML and CSS',
        'Check for ARIA implementation',
        'Generate accessibility reports',
      ],
      icon: <BugReportIcon />,
    },
    {
      label: 'Manual Testing',
      description: 'Detailed testing by accessibility experts',
      details: [
        'Keyboard navigation testing',
        'Screen reader compatibility',
        'Focus management verification',
        'Form validation testing',
      ],
      icon: <AccessibilityNewIcon />,
    },
    {
      label: 'User Testing',
      description: 'Testing with users with disabilities',
      details: [
        'Recruit diverse user groups',
        'Conduct usability sessions',
        'Gather feedback and observations',
        'Document user experiences',
      ],
      icon: <GroupIcon />,
    },
  ];

  const evaluationMethods = [
    {
      title: 'Automated Testing Tools',
      items: [
        'WAVE',
        'aXe',
        'Lighthouse',
        'NVDA',
        'VoiceOver',
      ],
    },
    {
      title: 'Manual Testing Techniques',
      items: [
        'Keyboard navigation',
        'Screen reader testing',
        'Visual inspection',
        'Content structure review',
      ],
    },
    {
      title: 'User Testing Methods',
      items: [
        'Task completion scenarios',
        'Think-aloud protocols',
        'User interviews',
        'Accessibility surveys',
      ],
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
          WCAG 2.2 Conformance Testing
        </Typography>

        <Alert severity="info">
          Conformance testing ensures that web content meets WCAG requirements
          through a combination of automated tools, manual testing, and user evaluation.
        </Alert>

        {/* Testing Process */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Testing Process
            </Typography>
            <Stepper orientation="vertical">
              {testingSteps.map((step, _index) => (
                <Step key={step.label} active={true}>
                  <StepLabel
                    icon={
                      <Box sx={{ color: 'primary.main' }}>
                        {step.icon}
                      </Box>
                    }
                  >
                    <Typography variant="subtitle1" component="h3">{step.label}</Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      {step.description}
                    </Typography>
                    {showDetailedSteps && (
                      <List dense>
                        {step.details.map((detail) => (
                          <ListItem key={detail}>
                            <ListItemIcon>
                              <CheckCircleIcon color="success" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={detail} />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>

        {/* Evaluation Methods */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Evaluation Methods
            </Typography>
            <Stack spacing={2}>
              {evaluationMethods.map((method) => (
                <Box key={method.title}>
                  <Typography variant="subtitle1" component="h3" gutterBottom>
                    {method.title}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {method.items.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Documentation Requirements */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Documentation Requirements
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Test Results"
                  secondary="Detailed documentation of all test results and findings"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Testing Methods"
                  secondary="Description of testing methodologies and tools used"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Issues and Remediation"
                  secondary="List of identified issues and recommended fixes"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Conformance Status"
                  secondary="Clear statement of conformance level achieved"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            Best Practices for Conformance Testing:
            <ul>
              <li>Use a combination of testing methods</li>
              <li>Include users with disabilities in testing</li>
              <li>Document all testing procedures and results</li>
              <li>Maintain regular testing schedules</li>
              <li>Keep up with WCAG updates and changes</li>
            </ul>
            <Alert severity="warning" sx={{ mt: 2 }}>
              Remember: Conformance testing is an ongoing process. Regular testing
              and updates are necessary to maintain accessibility compliance.
            </Alert>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/5. Conformance/5.3 Testing and Evaluation',
  component: ConformanceTestingDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 2.2 Conformance Testing and Evaluation - Understanding how to test and evaluate web content for WCAG conformance.'
      }
    }
  }
};

const Template: StoryFn<typeof ConformanceTestingDemo> = (args) => (
  <ConformanceTestingDemo {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  showDetailedSteps: false,
};

export const WithDetails = Template.bind({});
WithDetails.args = {
  showDetailedSteps: true,
}; 