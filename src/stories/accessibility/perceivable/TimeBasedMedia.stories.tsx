import React, { useState } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  FormControlLabel,
  Switch,
  Slider,
} from '@mui/material';

interface TimeBasedMediaProps {
  showCaptions: boolean;
  showAudioDescription: boolean;
  hasSignLanguage: boolean;
}

const TimeBasedMediaDemo = ({
  showCaptions,
  showAudioDescription,
  hasSignLanguage,
}: TimeBasedMediaProps) => {
  const [volume, setVolume] = useState<number>(75);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <Paper elevation={3} sx={{ maxWidth: 800, p: 3 }}>
      {/* Video Player Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          bgcolor: 'black',
          aspectRatio: '16/9',
          mb: 2,
        }}
      >
        {/* Placeholder for video content */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <Typography variant="body1">Video Content Placeholder</Typography>
        </Box>

        {/* Captions overlay */}
        {showCaptions && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              p: 1,
              textAlign: 'center',
            }}
          >
            [Sample caption text: "This is an example of synchronized captions for the video content."]
          </Box>
        )}

        {/* Sign language interpreter overlay */}
        {hasSignLanguage && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '25%',
              height: '25%',
              bgcolor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid white',
            }}
          >
            <Typography variant="caption" sx={{ color: 'white', p: 1 }}>
              Sign Language Interpreter
            </Typography>
          </Box>
        )}
      </Box>

      {/* Media Controls */}
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>

          <Box sx={{ width: 200 }}>
            <Typography id="volume-slider" gutterBottom>
              Volume
            </Typography>
            <Slider
              value={volume}
              onChange={(_, newValue) => setVolume(newValue as number)}
              aria-labelledby="volume-slider"
              valueLabelDisplay="auto"
            />
          </Box>
        </Box>

        {/* Accessibility Controls */}
        <Stack direction="row" spacing={2}>
          <FormControlLabel
            control={<Switch checked={showCaptions} />}
            label="Captions"
          />
          <FormControlLabel
            control={<Switch checked={showAudioDescription} />}
            label="Audio Description"
          />
          <FormControlLabel
            control={<Switch checked={hasSignLanguage} />}
            label="Sign Language"
          />
        </Stack>

        {/* Audio Description Text */}
        {showAudioDescription && (
          <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Audio Description:
            </Typography>
            <Typography variant="body2">
              [A person walks through a sunny park. Birds chirp in the background.
              They stop to admire a colorful flower garden.]
            </Typography>
          </Box>
        )}

        {/* Alternative Text Transcript */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Full Text Transcript
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="body2">
              This is a complete text transcript of the video content, including both
              spoken dialogue and important visual information. This provides an
              alternative for users who prefer reading or cannot access the video
              content.
            </Typography>
          </Paper>
        </Box>
      </Stack>

      {/* Help Text */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
        <Typography variant="body2">
          This demo implements WCAG 1.2 Time-based Media guidelines:
          <ul>
            <li>1.2.1 Audio-only and Video-only (Prerecorded)</li>
            <li>1.2.2 Captions (Prerecorded)</li>
            <li>1.2.3 Audio Description or Media Alternative</li>
            <li>1.2.4 Captions (Live)</li>
            <li>1.2.5 Audio Description</li>
            <li>1.2.6 Sign Language</li>
          </ul>
        </Typography>
      </Box>
    </Paper>
  );
};

export default {
  title: 'Accessibility/Perceivable/TimeBasedMedia',
  component: TimeBasedMediaDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 1.2 Time-based Media - Provide alternatives for time-based media including captions, audio descriptions, and sign language interpretation.'
      }
    }
  }
};

const Template: StoryFn<typeof TimeBasedMediaDemo> = (args) => <TimeBasedMediaDemo {...args} />;

export const BasicMedia = Template.bind({});
BasicMedia.args = {
  showCaptions: true,
  showAudioDescription: false,
  hasSignLanguage: false,
};

export const FullAccessibility = Template.bind({});
FullAccessibility.args = {
  showCaptions: true,
  showAudioDescription: true,
  hasSignLanguage: true,
}; 