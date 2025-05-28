import React, { useState } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  TextField,
  Tooltip,
  FormControlLabel,
  Switch,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import InfoIcon from '@mui/icons-material/Info';
import ImageIcon from '@mui/icons-material/Image';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VideocamIcon from '@mui/icons-material/Videocam';

interface TextAlternativesProps {
  showAltText: boolean;
  enableLongDescriptions: boolean;
}

const TextAlternativesDemo = ({
  showAltText,
  enableLongDescriptions,
}: TextAlternativesProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDescriptions, setShowDescriptions] = useState(false);

  const demoImage = {
    src: 'https://placekitten.com/400/300',
    alt: 'A cute kitten playing with a ball of yarn',
    longDesc: 'A small orange tabby kitten sits on a wooden floor, batting at a blue ball of yarn. The kitten is approximately 8 weeks old, with bright green eyes and white paws. The yarn is unraveling as the kitten plays, creating an interesting pattern on the floor.',
  };

  const demoChart = {
    src: 'https://via.placeholder.com/400x300/2196f3/ffffff?text=Sales+Chart',
    alt: 'Bar chart showing monthly sales data for 2023',
    longDesc: 'A vertical bar chart displaying monthly sales figures for 2023. The x-axis shows months from January to December, while the y-axis shows sales values from 0 to 100,000 dollars. There is a clear upward trend, with peak sales in July at 85,000 dollars. The lowest sales were in February at 20,000 dollars.',
  };

  const audioDescription = 'Classical piano music playing softly in the background, with occasional bird chirping sounds';
  const videoDescription = 'A tutorial video showing step-by-step instructions for creating an accessible web form';

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Text Alternatives Demo
        </Typography>

        {/* Controls */}
        <Card>
          <CardContent>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showDescriptions}
                    onChange={(e) => setShowDescriptions(e.target.checked)}
                  />
                }
                label="Show Descriptions"
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Decorative Image Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Decorative Image
              {showAltText && (
                <Tooltip title="This image is decorative and should have an empty alt text" arrow>
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Typography>
            <Box
              component="img"
              src="https://via.placeholder.com/400x100/e0e0e0/ffffff?text=Decorative+Border"
              alt=""
              sx={{ width: '100%', height: 'auto' }}
              role="presentation"
            />
          </CardContent>
        </Card>

        {/* Informative Image Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Informative Image
              {showAltText && (
                <Tooltip title={`Alt text: ${demoImage.alt}`} arrow>
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Typography>
            <CardMedia
              component="img"
              image={demoImage.src}
              alt={demoImage.alt}
              sx={{ width: '100%', height: 'auto', borderRadius: 1 }}
            />
            {enableLongDescriptions && showDescriptions && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>Long Description:</strong> {demoImage.longDesc}
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Complex Image (Chart) Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Complex Image (Chart)
              {showAltText && (
                <Tooltip title={`Alt text: ${demoChart.alt}`} arrow>
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Typography>
            <CardMedia
              component="img"
              image={demoChart.src}
              alt={demoChart.alt}
              sx={{ width: '100%', height: 'auto', borderRadius: 1 }}
            />
            {enableLongDescriptions && showDescriptions && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>Long Description:</strong> {demoChart.longDesc}
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Audio Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Audio Content
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <AudiotrackIcon />
              <Typography variant="body2">
                {audioDescription}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        {/* Video Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Video Content
            </Typography>
            <Box
              sx={{
                bgcolor: 'background.default',
                p: 3,
                borderRadius: 1,
                textAlign: 'center',
              }}
            >
              <VideocamIcon sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="body2" gutterBottom>
                {videoDescription}
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                <Button variant="outlined" startIcon={<ImageIcon />}>
                  View Transcript
                </Button>
                <Button variant="outlined">
                  Enable Captions
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            This demo implements WCAG 1.1 Text Alternatives guidelines:
            <ul>
              <li>1.1.1 Non-text Content - All non-text content has text alternatives</li>
              <li>Decorative images are marked as presentational</li>
              <li>Complex images have detailed descriptions</li>
              <li>Audio and video content have text transcripts</li>
              <li>Controls and inputs have descriptive labels</li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/Perceivable/TextAlternatives',
  component: TextAlternativesDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 1.1 Text Alternatives - Provide text alternatives for non-text content.'
      }
    }
  }
};

const Template: StoryFn<typeof TextAlternativesDemo> = (args) => <TextAlternativesDemo {...args} />;

export const BasicAlternatives = Template.bind({});
BasicAlternatives.args = {
  showAltText: false,
  enableLongDescriptions: false,
};

export const AdvancedAlternatives = Template.bind({});
AdvancedAlternatives.args = {
  showAltText: true,
  enableLongDescriptions: true,
}; 