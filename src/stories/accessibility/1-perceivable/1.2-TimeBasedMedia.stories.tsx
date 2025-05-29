import React from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';

// Icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import SyncIcon from '@mui/icons-material/Sync';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import TranslateIcon from '@mui/icons-material/Translate';

const TimeBasedMediaGuidance = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography 
          component="h1" 
          variant="h4" 
          gutterBottom
        >
          Time-based Media Accessibility Guidelines
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Key Principle</AlertTitle>
          Time-based media must be accessible to users with different abilities through multiple means of perception, including alternatives for both audio and visual content.
        </Alert>

        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Essential Components:
          </Typography>
          <Stack spacing={2} sx={{ ml: 2 }}>
            {[
              {
                icon: <ClosedCaptionIcon />,
                label: 'Captions',
                description: 'Synchronized text alternatives for spoken dialogue and important sounds'
              },
              {
                icon: <RecordVoiceOverIcon />,
                label: 'Audio Descriptions',
                description: 'Narration of important visual information for blind users'
              },
              {
                icon: <TranslateIcon />,
                label: 'Sign Language',
                description: 'Sign language interpretation for deaf users who prefer sign language'
              },
              {
                icon: <SubtitlesIcon />,
                label: 'Transcripts',
                description: 'Text document containing all audio and visual content'
              }
            ].map((method) => (
              <Paper key={method.label} variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {method.icon}
                  <Box>
                    <Typography variant="subtitle1">{method.label}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {method.description}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Box>

        <Divider />

        {/* Common Challenges Section - Keeping your existing section as is */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Common Implementation Challenges:
          </Typography>
          <Stack spacing={2}>
            {/* Your existing challenges content */}
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Media Types and Requirements
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Media Type</strong></TableCell>
                  <TableCell><strong>Required Alternatives</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    type: 'Pre-recorded Audio-only',
                    requirements: 'Transcript of all spoken content and important sounds'
                  },
                  {
                    type: 'Pre-recorded Video-only',
                    requirements: 'Audio description or text description of visual information'
                  },
                  {
                    type: 'Pre-recorded Video with Audio',
                    requirements: 'Captions, audio descriptions, and transcript'
                  },
                  {
                    type: 'Live Video with Audio',
                    requirements: 'Live captions and real-time audio descriptions where possible'
                  },
                  {
                    type: 'Interactive Media',
                    requirements: 'All alternatives must be synchronized and interactive elements must be accessible'
                  }
                ].map((row) => (
                  <TableRow key={row.type}>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.requirements}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Best Practices for Implementation
          </Typography>
          <List>
            {[
              'Plan for accessibility during content creation and production',
              'Use professional captioning and audio description services',
              'Ensure captions are accurate, synchronized, and include speaker identification',
              'Provide high-quality audio descriptions that fit naturally into content',
              'Include sign language interpretation for primary language content',
              'Offer downloadable transcripts in accessible formats',
              'Test with actual users who rely on these alternatives'
            ].map((item) => (
              <ListItem key={item}>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Alert severity="warning">
          <AlertTitle>Important Considerations</AlertTitle>
          <Typography variant="body2" component="div">
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Auto-generated captions alone do not meet WCAG requirements</li>
              <li>Consider providing a sign language version for content primarily aimed at deaf users</li>
              <li>Ensure video player controls are accessible via keyboard and screen readers</li>
              <li>Plan for scalability and maintenance of accessible alternatives</li>
              <li>Consider cultural and linguistic aspects in translations and interpretations</li>
            </ul>
          </Typography>
        </Alert>
      </Stack>
    </Paper>
  );
};

// Story Templates
const GuidanceTemplate: StoryFn<typeof TimeBasedMediaGuidance> = () => <TimeBasedMediaGuidance />;

export default {
  title: 'Accessibility/1-Perceivable/1.2-Time-based Media',
  parameters: {
    docs: {
      description: {
        component: `
          # WCAG 1.2 Time-based Media
          
          This guide demonstrates implementation requirements and best practices for making time-based media accessible according to WCAG 1.2 guidelines.
          
          ## Key Requirements
          - Provide alternatives for time-based media
          - Ensure synchronized captions for audio content
          - Include audio descriptions for visual information
          - Support sign language interpretation
          - Offer transcripts and media alternatives
          
          ## Reference
          [WCAG 2.2 - 1.2 Time-based Media](https://www.w3.org/TR/WCAG22/#time-based-media)
        `
      }
    }
  }
};

export const Guidance = GuidanceTemplate.bind({});
Guidance.parameters = {
  docs: {
    description: {
      story: `
        # Time-based Media Accessibility Guidelines
        
        This guide demonstrates how to implement accessible time-based media following WCAG requirements.
        
        ## Key Concepts
        1. **Multiple Alternatives**: Provide different ways to access content
        2. **Synchronization**: Maintain timing between content and alternatives
        3. **Quality Control**: Ensure accuracy and completeness
        4. **User Experience**: Consider different user needs and preferences
        
        ## Best Practices
        - Plan for accessibility during content creation
        - Use professional services for complex content
        - Test with actual users of assistive technologies
        - Maintain quality of alternatives over time
      `
    }
  }
};

// Keep your existing CommonChallenges export 