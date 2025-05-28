import React, { useState } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  Card,
  CardContent,
  IconButton,
  Collapse,
  Button,
  Chip,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface ReadableDemoProps {
  showDefinitions: boolean;
  enableSimplifiedVersion: boolean;
}

interface Term {
  word: string;
  definition: string;
  pronunciation?: string;
}

const ReadableDemo = ({
  showDefinitions,
  enableSimplifiedVersion,
}: ReadableDemoProps) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showSimplified, setShowSimplified] = useState(false);

  const languages = {
    en: {
      name: 'English',
      content: 'Photosynthesis is the process by which plants convert light energy into chemical energy.',
      simplified: 'Plants use sunlight to make their own food.',
    },
    es: {
      name: 'Español',
      content: 'La fotosíntesis es el proceso mediante el cual las plantas convierten la energía lumínica en energía química.',
      simplified: 'Las plantas usan la luz del sol para producir su propio alimento.',
    },
    fr: {
      name: "Français",
      content: "La photosynthèse est le processus par lequel les plantes convertissent l'énergie lumineuse en énergie chimique.",
      simplified: "Les plantes utilisent la lumière du soleil pour produire leur propre nourriture.",
    },
  };

  const technicalTerms: Term[] = [
    {
      word: 'photosynthesis',
      definition: 'The process of converting light energy to chemical energy to produce food',
      pronunciation: 'foh-toh-sin-thuh-sis',
    },
    {
      word: 'chemical energy',
      definition: 'Energy stored in the bonds of chemical compounds',
    },
    {
      word: 'convert',
      definition: 'To change from one form to another',
    },
  ];

  const handleLanguageChange = (event: any) => {
    setCurrentLanguage(event.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Readable Content Demo
        </Typography>

        {/* Language Selection */}
        <Card>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <TranslateIcon />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="language-select-label">Language</InputLabel>
                <Select
                  labelId="language-select-label"
                  value={currentLanguage}
                  label="Language"
                  onChange={handleLanguageChange}
                >
                  {Object.entries(languages).map(([code, { name }]) => (
                    <MenuItem key={code} value={code}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Understanding Plant Biology
              {enableSimplifiedVersion && (
                <IconButton
                  size="small"
                  onClick={() => setShowSimplified(!showSimplified)}
                  sx={{ ml: 1 }}
                  aria-label={showSimplified ? "Show technical version" : "Show simplified version"}
                >
                  <MenuBookIcon />
                </IconButton>
              )}
            </Typography>

            <Typography variant="body1" paragraph>
              {showSimplified
                ? languages[currentLanguage as keyof typeof languages].simplified
                : languages[currentLanguage as keyof typeof languages].content}
            </Typography>

            {/* Technical Terms */}
            {showDefinitions && !showSimplified && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Technical Terms:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {technicalTerms.map((term) => (
                    <Tooltip
                      key={term.word}
                      title={
                        <Box>
                          <Typography variant="subtitle2">{term.word}</Typography>
                          {term.pronunciation && (
                            <Typography variant="caption" display="block">
                              /{term.pronunciation}/
                            </Typography>
                          )}
                          <Typography variant="body2">{term.definition}</Typography>
                        </Box>
                      }
                      arrow
                    >
                      <Chip
                        icon={<InfoIcon />}
                        label={term.word}
                        variant="outlined"
                        sx={{ my: 0.5 }}
                      />
                    </Tooltip>
                  ))}
                </Stack>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Reading Level Options */}
        {enableSimplifiedVersion && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Reading Level
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant={!showSimplified ? "contained" : "outlined"}
                  onClick={() => setShowSimplified(false)}
                >
                  Technical
                </Button>
                <Button
                  variant={showSimplified ? "contained" : "outlined"}
                  onClick={() => setShowSimplified(true)}
                >
                  Simplified
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            This demo implements WCAG 3.1 Readable guidelines:
            <ul>
              <li>3.1.1 Language of Page - The default language is clearly identified</li>
              <li>3.1.2 Language of Parts - Changes in language are identified</li>
              <li>3.1.3 Unusual Words - Definitions for technical terms are provided</li>
              <li>3.1.4 Abbreviations - Explanations for abbreviations are available</li>
              <li>3.1.5 Reading Level - Simplified versions of content are available</li>
              <li>3.1.6 Pronunciation - Pronunciation information is provided for complex terms</li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/Understandable/Readable',
  component: ReadableDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 3.1 Readable - Make text content readable and understandable.'
      }
    }
  }
};

const Template: StoryFn<typeof ReadableDemo> = (args) => <ReadableDemo {...args} />;

export const BasicReadable = Template.bind({});
BasicReadable.args = {
  showDefinitions: false,
  enableSimplifiedVersion: false,
};

export const AdvancedReadable = Template.bind({});
AdvancedReadable.args = {
  showDefinitions: true,
  enableSimplifiedVersion: true,
}; 