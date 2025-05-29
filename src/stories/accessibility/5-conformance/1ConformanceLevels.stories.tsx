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
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface ConformanceLevelsProps {
  showExamples: boolean;
}

const ConformanceLevelsDemo = ({
  showExamples,
}: ConformanceLevelsProps) => {
  const conformanceLevels = [
    {
      level: 'A',
      description: 'Basic web accessibility requirements that must be met.',
      examples: [
        'Text alternatives for images',
        'Keyboard accessibility',
        'No content that causes seizures',
        'Page titles and headings',
      ],
      icon: <StarIcon />,
    },
    {
      level: 'AA',
      description: 'Addresses major accessibility barriers. This is the standard level most organizations aim to meet.',
      examples: [
        'Color contrast requirements',
        'Text resizing',
        'Multiple ways to find content',
        'Input assistance',
      ],
      icon: <><StarIcon /><StarIcon /></>,
    },
    {
      level: 'AAA',
      description: 'The highest level of accessibility conformance, providing additional enhancements.',
      examples: [
        'Sign language for all audio',
        'Extended audio descriptions',
        'Higher contrast requirements',
        'No time limits',
      ],
      icon: <><StarIcon /><StarIcon /><StarIcon /></>,
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          WCAG 2.2 Conformance Levels
        </Typography>

        <Alert severity="info">
          Conformance levels help organizations understand and implement accessibility
          in a structured way, with each level building upon the previous one.
        </Alert>

        {conformanceLevels.map((level, index) => (
          <Card key={level.level}>
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    label={`Level ${level.level}`}
                    color={index === 2 ? 'success' : index === 1 ? 'primary' : 'default'}
                    icon={<StarIcon />}
                  />
                  <Typography variant="h6" component="h2">
                    {level.icon}
                  </Typography>
                </Box>

                <Typography variant="body1">
                  {level.description}
                </Typography>

                {showExamples && (
                  <>
                    <Typography variant="subtitle1" gutterBottom>
                      Example Requirements:
                    </Typography>
                    <List dense>
                      {level.examples.map((example) => (
                        <ListItem key={example}>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" />
                          </ListItemIcon>
                          <ListItemText primary={example} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        ))}

        <Divider />

        {/* Conformance Requirements */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              General Conformance Requirements
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="1. Conformance Level"
                  secondary="All pages must satisfy all requirements of the chosen level (A, AA, or AAA)"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="2. Full Pages"
                  secondary="Conformance is for full web pages only, not just parts of pages"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="3. Complete Processes"
                  secondary="All pages in a process must conform to the specified level"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="4. Accessibility-Supported Technologies"
                  secondary="Only accessibility-supported ways of using technologies can be relied upon"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="5. Non-Interference"
                  secondary="Technologies used for non-conforming features must not block users from accessing the rest of the page"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            This demo explains WCAG 2.2 Conformance Levels:
            <ul>
              <li>Level A - Minimum level of conformance</li>
              <li>Level AA - Addresses the most common barriers</li>
              <li>Level AAA - Highest level of accessibility support</li>
            </ul>
            <Alert severity="info" sx={{ mt: 2 }}>
              Most organizations aim for Level AA conformance as it provides a good
              balance between accessibility and implementation feasibility.
            </Alert>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/5. Conformance/5.1 Conformance Levels',
  component: ConformanceLevelsDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 2.2 Conformance Levels - Understanding the three levels of conformance (A, AA, AAA) and their requirements.'
      }
    }
  }
};

const Template: StoryFn<typeof ConformanceLevelsDemo> = (args) => (
  <ConformanceLevelsDemo {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  showExamples: false,
};

export const WithExamples = Template.bind({});
WithExamples.args = {
  showExamples: true,
}; 