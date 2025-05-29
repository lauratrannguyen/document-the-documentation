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
  Alert,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface ReadableProps {
  showLanguageControls: boolean;
  enableAbbreviations: boolean;
  showReadingLevel: boolean;
}

interface Term {
  word: string;
  definition: string;
  pronunciation?: string;
}

const ReadableDemo = ({
  showLanguageControls,
  enableAbbreviations,
  showReadingLevel,
}: ReadableProps) => {
  const [language, setLanguage] = useState('en');
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

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Readable Content Demo
        </Typography>

        {/* Language Selection */}
        {showLanguageControls && (
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Language Selection
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="language-select-label">Page Language</InputLabel>
                <Select
                  labelId="language-select-label"
                  value={language}
                  label="Page Language"
                  onChange={(e) => setLanguage(e.target.value)}
                  lang={language}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="fr">Français</MenuItem>
                </Select>
              </FormControl>
              <Alert severity="info" sx={{ mt: 2 }}>
                The lang attribute helps screen readers use the correct pronunciation
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Card>
          <CardContent>
            <Typography variant="h2" component="h2" gutterBottom>
              Understanding Plant Biology
              {showSimplified && (
                <IconButton
                  size="small"
                  onClick={() => setShowSimplified(false)}
                  sx={{ ml: 1 }}
                  aria-label="Show technical version"
                >
                  <MenuBookIcon />
                </IconButton>
              )}
            </Typography>

            <Typography variant="body1" paragraph>
              {showSimplified
                ? languages[language as keyof typeof languages].simplified
                : languages[language as keyof typeof languages].content}
            </Typography>

            {/* Technical Terms */}
            {!showSimplified && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h2" component="h2" gutterBottom>
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

        {/* Abbreviations and Definitions */}
        {enableAbbreviations && (
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Abbreviations and Definitions
              </Typography>
              <Box>
                <Typography paragraph>
                  <abbr title="World Wide Web Consortium">W3C</abbr> develops web
                  standards.
                </Typography>
                <Typography paragraph>
                  <abbr title="Web Content Accessibility Guidelines">WCAG</abbr>{' '}
                  provides accessibility guidelines.
                </Typography>
              </Box>
              <Alert severity="info">
                Abbreviations are marked up with expanded forms on first use
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Reading Level */}
        {showReadingLevel && (
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Reading Level Example
              </Typography>
              <Box>
                <Typography paragraph>
                  Simple Version: The cat sat on the mat. It was sunny outside.
                </Typography>
                <Typography paragraph sx={{ color: 'text.secondary' }}>
                  Complex Version: The feline reclined upon the floor covering
                  while solar illumination permeated the external environment.
                </Typography>
              </Box>
              <Alert severity="info">
                Content should be written as clearly and simply as possible
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            This demo implements WCAG 3.1 Readable guidelines:
            <ul>
              <li>Language of Page is identified</li>
              <li>Language of Parts can be programmatically determined</li>
              <li>Unusual words are explained</li>
              <li>Abbreviations are expanded on first use</li>
              <li>Content is written at an appropriate reading level</li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default {
  title: 'Accessibility/3. Understandable/3.1 Readable',
  component: ReadableDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 3.1 Readable - Make text content readable and understandable. Includes guidelines 3.1.1 Language of Page, 3.1.2 Language of Parts, 3.1.3 Unusual Words, 3.1.4 Abbreviations, and 3.1.5 Reading Level.'
      }
    }
  }
};

const Template: StoryFn<typeof ReadableDemo> = (args) => <ReadableDemo {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  showLanguageControls: false,
  enableAbbreviations: false,
  showReadingLevel: false,
};

export const WithLanguageControls = Template.bind({});
WithLanguageControls.args = {
  showLanguageControls: true,
  enableAbbreviations: false,
  showReadingLevel: false,
};

export const Complete = Template.bind({});
Complete.args = {
  showLanguageControls: true,
  enableAbbreviations: true,
  showReadingLevel: true,
}; 