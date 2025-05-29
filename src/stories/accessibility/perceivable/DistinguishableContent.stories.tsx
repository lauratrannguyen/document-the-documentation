import React, { useState } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Slider,
  FormControlLabel,
  Switch,
  Button,
  IconButton,
  Alert,
  useTheme,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import TextFieldsIcon from '@mui/icons-material/TextFields';

interface DistinguishableContentProps {
  initialTextSpacing: {
    lineHeight: number;
    letterSpacing: number;
    wordSpacing: number;
    paragraphSpacing: number;
  };
  initialAudioMuted: boolean;
  showColorExample: boolean;
  showAudioControls: boolean;
}

const DistinguishableContentDemo = ({
  initialTextSpacing,
  initialAudioMuted,
  showColorExample,
  showAudioControls,
}: DistinguishableContentProps) => {
  const [useCustomSpacing, setUseCustomSpacing] = useState(true);
  const [audioMuted, setAudioMuted] = useState(initialAudioMuted);
  const [volume, setVolume] = useState<number>(50);
  const theme = useTheme();

  const spacingStyles = useCustomSpacing ? {
    lineHeight: `${initialTextSpacing.lineHeight}em`,
    letterSpacing: `${initialTextSpacing.letterSpacing}em`,
    wordSpacing: `${initialTextSpacing.wordSpacing}em`,
    '& p': {
      marginBottom: `${initialTextSpacing.paragraphSpacing}em`,
    },
  } : {};

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={4}>
        {/* Text Spacing Controls */}
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={useCustomSpacing}
                onChange={(e) => setUseCustomSpacing(e.target.checked)}
                icon={<TextFieldsIcon />}
                checkedIcon={<TextFieldsIcon />}
              />
            }
            label="Enhanced Text Spacing"
          />
          {useCustomSpacing && (
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
              Current spacing: {initialTextSpacing.lineHeight}em line height, 
              {initialTextSpacing.letterSpacing}em letter spacing, 
              {initialTextSpacing.wordSpacing}em word spacing
            </Typography>
          )}
        </Box>

        {/* Content with Adjustable Spacing */}
        <Box sx={spacingStyles}>
          <Typography variant="h1" component="h1" gutterBottom>
            Distinguishable Content Example
          </Typography>
          
          <Typography variant="body1" paragraph>
            This text demonstrates proper spacing and contrast ratios. The content
            remains readable when text spacing is adjusted, and all information is
            conveyed through more than just color.
          </Typography>

          <Typography variant="body1" paragraph>
            When text spacing is adjusted, it should not result in content overlapping
            or being cut off. This helps users with low vision or cognitive disabilities.
          </Typography>

          {showColorExample && (
            <Stack spacing={2}>
              {/* Color and Non-Color Information Example */}
              <Alert severity="error" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  Error: Invalid input (❌)
                </Typography>
              </Alert>

              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  Success: Form submitted (✓)
                </Typography>
              </Alert>

              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  Warning: Session expiring soon (⚠️)
                </Typography>
              </Alert>

              {/* Links with Sufficient Contrast */}
              <Box sx={{ p: 2, bgcolor: 'background.default' }}>
                <Typography variant="body1">
                  <Box
                    component="span"
                    sx={{
                      textDecoration: 'underline',
                      color: theme.palette.primary.main,
                      '&:hover': {
                        textDecoration: 'none',
                      },
                    }}
                  >
                    This link has sufficient contrast
                  </Box>
                  {' and is distinguishable through more than just color.'}
                </Typography>
              </Box>
            </Stack>
          )}
        </Box>

        {/* Audio Control Example */}
        {showAudioControls && (
          <Paper
            variant="outlined"
            sx={{ p: 2, bgcolor: 'background.default' }}
          >
            <Typography variant="h2" component="h2" gutterBottom>
              Audio Control Example
            </Typography>
            
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  onClick={() => setAudioMuted(!audioMuted)}
                  aria-label={audioMuted ? 'Unmute' : 'Mute'}
                  color={audioMuted ? 'default' : 'primary'}
                >
                  {audioMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                </IconButton>
                
                <Slider
                  value={volume}
                  onChange={(_, newValue) => setVolume(newValue as number)}
                  aria-label="Volume"
                  disabled={audioMuted}
                  sx={{ width: 200 }}
                />
                
                <Typography variant="body2" sx={{ minWidth: 60 }}>
                  {audioMuted ? 'Muted' : `${volume}%`}
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Audio content can be paused, stopped, or muted, and volume can be
                controlled independently of the system volume.
              </Typography>
            </Stack>
          </Paper>
        )}

        {/* Visual Presentation Example */}
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h2" component="h2" gutterBottom>
            Visual Presentation Options
          </Typography>
          
          <Stack spacing={2}>
            <Button
              variant="contained"
              sx={{
                bgcolor: theme.palette.grey[900],
                color: theme.palette.grey[100],
                '&:hover': {
                  bgcolor: theme.palette.grey[800],
                },
              }}
            >
              High Contrast Button
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderWidth: 2,
                '&:focus': {
                  outline: `3px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2,
                },
              }}
            >
              Clear Focus Indicator
            </Button>
          </Stack>
        </Paper>

        {/* Text Resize Example */}
        <section aria-labelledby="resize-title">
          <Typography id="resize-title" variant="h2" component="h2" gutterBottom>
            Text Resize Example
          </Typography>
          <Typography variant="body2" gutterBottom>
            This text can be resized up to 200% without requiring scrolling in two dimensions
            or losing content/functionality.
          </Typography>
          <Button variant="outlined" onClick={() => {}} sx={{ mt: 1 }}>
            Interactive Element
          </Button>
        </section>

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            This demo implements WCAG 1.4 Distinguishable guidelines:
            <ul>
              <li>1.4.1 Use of Color - Information not conveyed through color alone</li>
              <li>1.4.2 Audio Control - Mechanism to pause, stop, or adjust volume</li>
              <li>1.4.3 Contrast (Minimum) - Text and images meet contrast requirements</li>
              <li>1.4.4 Resize Text - Text can be resized without loss of functionality</li>
              <li>1.4.5 Images of Text - Real text is used instead of images of text</li>
              <li>1.4.8 Visual Presentation - Enhanced visual presentation options</li>
              <li>1.4.10 Reflow - Content can be presented without loss of functionality</li>
              <li>1.4.12 Text Spacing - No loss of content when text spacing is adjusted</li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/Perceivable/1.4 Distinguishable',
  component: DistinguishableContentDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 1.4 Distinguishable - Make it easier for users to see and hear content including separating foreground from background.'
      }
    }
  }
};

const Template: StoryFn<typeof DistinguishableContentDemo> = (args) => (
  <DistinguishableContentDemo {...args} />
);

export const BasicExample = Template.bind({});
BasicExample.args = {
  initialTextSpacing: {
    lineHeight: 1.5,
    letterSpacing: 0.12,
    wordSpacing: 0.16,
    paragraphSpacing: 2,
  },
  initialAudioMuted: true,
  showColorExample: false,
  showAudioControls: false,
};

export const WithColorExamples = Template.bind({});
WithColorExamples.args = {
  initialTextSpacing: {
    lineHeight: 1.5,
    letterSpacing: 0.12,
    wordSpacing: 0.16,
    paragraphSpacing: 2,
  },
  initialAudioMuted: true,
  showColorExample: true,
  showAudioControls: false,
};

export const CompleteExample = Template.bind({});
CompleteExample.args = {
  initialTextSpacing: {
    lineHeight: 1.5,
    letterSpacing: 0.12,
    wordSpacing: 0.16,
    paragraphSpacing: 2,
  },
  initialAudioMuted: false,
  showColorExample: true,
  showAudioControls: true,
}; 