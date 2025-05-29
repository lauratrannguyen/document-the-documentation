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
  Button,
  Chip,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningIcon from '@mui/icons-material/Warning';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import FormatClearIcon from '@mui/icons-material/FormatClear';

interface ReadableProps {
  showLanguageControls: boolean;
  enableAbbreviations: boolean;
  showReadingLevel: boolean;
}

interface Term {
  word: string;
  definition: string;
  pronunciation?: string;
  examples?: string[];
}

interface ContentVersion {
  content: string;
  simplified: string;
  readingLevel: 'basic' | 'intermediate' | 'advanced';
}

interface Language {
  name: string;
  versions: {
    [key in 'basic' | 'intermediate' | 'advanced']: ContentVersion;
  };
}

interface Languages {
  [key: string]: Language;
}

const ReadableDemo = ({
  showLanguageControls,
  enableAbbreviations,
  showReadingLevel,
}: ReadableProps) => {
  const [language, setLanguage] = useState('en');
  const [showSimplified, setShowSimplified] = useState(false);
  const [selectedReadingLevel, setSelectedReadingLevel] = useState<'basic' | 'intermediate' | 'advanced'>('intermediate');

  const languages: Languages = {
    en: {
      name: 'English',
      versions: {
        advanced: {
          content: 'Photosynthesis is the process by which plants convert light energy into chemical energy. This complex biochemical reaction involves chlorophyll, carbon dioxide, and water to produce glucose and oxygen.',
          simplified: 'Plants use sunlight to make their own food. They take in water from the soil and carbon dioxide from the air to make sugar and oxygen.',
          readingLevel: 'advanced'
        },
        intermediate: {
          content: 'Plants need sunlight to live and grow. Through a process called photosynthesis, they turn sunlight, water, and air into food and oxygen.',
          simplified: 'Plants use sunlight, water, and air to make their food. This also gives us oxygen to breathe.',
          readingLevel: 'intermediate'
        },
        basic: {
          content: 'Plants need sun to grow. They use sunlight to make food. They also make oxygen for us to breathe.',
          simplified: 'Plants use sun to make food. They help us breathe.',
          readingLevel: 'basic'
        }
      }
    },
    es: {
      name: 'Español',
      versions: {
        advanced: {
          content: 'La fotosíntesis es el proceso mediante el cual las plantas convierten la energía lumínica en energía química. Esta compleja reacción bioquímica involucra clorofila, dióxido de carbono y agua para producir glucosa y oxígeno.',
          simplified: 'Las plantas usan la luz del sol para producir su propio alimento. Toman agua del suelo y dióxido de carbono del aire para producir azúcar y oxígeno.',
          readingLevel: 'advanced'
        },
        intermediate: {
          content: 'Las plantas necesitan luz solar para vivir y crecer. A través de un proceso llamado fotosíntesis, convierten la luz solar, el agua y el aire en alimento y oxígeno.',
          simplified: 'Las plantas usan luz solar, agua y aire para hacer su comida. Esto también nos da oxígeno para respirar.',
          readingLevel: 'intermediate'
        },
        basic: {
          content: 'Las plantas necesitan sol para crecer. Usan la luz solar para hacer comida. También producen oxígeno para que respiremos.',
          simplified: 'Las plantas usan el sol para hacer comida. Nos ayudan a respirar.',
          readingLevel: 'basic'
        }
      }
    }
  };

  const technicalTerms: Term[] = [
    {
      word: 'photosynthesis',
      definition: 'The process of converting light energy to chemical energy to produce food',
      pronunciation: 'foh-toh-sin-thuh-sis',
      examples: [
        'Through photosynthesis, plants produce oxygen',
        'Photosynthesis occurs in the chloroplasts'
      ]
    },
    {
      word: 'chemical energy',
      definition: 'Energy stored in the bonds of chemical compounds',
      examples: [
        'Plants store chemical energy in glucose',
        'Chemical energy is released during cellular respiration'
      ]
    },
    {
      word: 'chlorophyll',
      definition: 'A green pigment in plants that absorbs light energy',
      pronunciation: 'klor-uh-fil',
      examples: [
        'Chlorophyll gives plants their green color',
        'Chlorophyll is essential for photosynthesis'
      ]
    }
  ];

  const readabilityGuidelines = [
    {
      category: 'Content Structure',
      items: [
        'Use clear headings and subheadings',
        'Break content into manageable chunks',
        'Present information in a logical order',
        'Use bullet points for lists'
      ]
    },
    {
      category: 'Language Use',
      items: [
        'Use active voice when possible',
        'Keep sentences concise',
        'Avoid jargon unless necessary',
        'Define technical terms'
      ]
    },
    {
      category: 'Visual Presentation',
      items: [
        'Ensure sufficient contrast',
        'Use readable font sizes',
        'Maintain consistent spacing',
        'Include visual breaks'
      ]
    }
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Content Readability Guidelines
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Key Principle</AlertTitle>
          Make text content readable and understandable while maintaining proper semantic structure and accessibility.
        </Alert>

        {/* Language Selection */}
        {showLanguageControls && (
          <Box component="section">
            <Typography variant="h5" component="h2" gutterBottom>
              Language Controls
            </Typography>
            <Card>
              <CardContent>
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
                  </Select>
                </FormControl>
                <Alert severity="info" sx={{ mt: 2 }}>
                  The lang attribute helps screen readers use the correct pronunciation
                </Alert>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Content Examples */}
        <Box component="section">
          <Typography variant="h5" component="h2" gutterBottom>
            Content Examples
          </Typography>
          <Stack spacing={2}>
            {/* Reading Levels */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Reading Levels
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="reading-level-label">Reading Level</InputLabel>
                  <Select
                    labelId="reading-level-label"
                    value={selectedReadingLevel}
                    label="Reading Level"
                    onChange={(e) => setSelectedReadingLevel(e.target.value as 'basic' | 'intermediate' | 'advanced')}
                  >
                    <MenuItem value="basic">Basic</MenuItem>
                    <MenuItem value="intermediate">Intermediate</MenuItem>
                    <MenuItem value="advanced">Advanced</MenuItem>
                  </Select>
                </FormControl>
                
                <Typography variant="body1" paragraph>
                  {showSimplified
                    ? languages[language].versions[selectedReadingLevel].simplified
                    : languages[language].versions[selectedReadingLevel].content}
                </Typography>

                <Button
                  startIcon={showSimplified ? <MenuBookIcon /> : <FormatClearIcon />}
                  onClick={() => setShowSimplified(!showSimplified)}
                  variant="outlined"
                  sx={{ mt: 1 }}
                >
                  {showSimplified ? 'Show Technical Version' : 'Show Simplified Version'}
                </Button>
              </CardContent>
            </Card>

            {/* Technical Terms */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Technical Terms
                </Typography>
                <Stack spacing={2}>
                  {technicalTerms.map((term) => (
                    <Box key={term.word} sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
                      <Typography variant="subtitle1" component="h4" gutterBottom>
                        {term.word}
                        {term.pronunciation && (
                          <Typography component="span" variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                            /{term.pronunciation}/
                          </Typography>
                        )}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {term.definition}
                      </Typography>
                      {term.examples && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" component="div" color="text.secondary">
                            Examples:
                            <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                              {term.examples.map((example, index) => (
                                <li key={index}>{example}</li>
                              ))}
                            </ul>
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>

        {/* Developer Guidelines */}
        <Box component="section">
          <Typography variant="h5" component="h2" gutterBottom>
            Developer Guidelines
          </Typography>
          <Stack spacing={2}>
            {readabilityGuidelines.map((section) => (
              <Card key={section.category}>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {section.category}
                  </Typography>
                  <List>
                    {section.items.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Edge Cases */}
        <Box component="section">
          <Typography variant="h5" component="h2" gutterBottom>
            Edge Cases & Considerations
          </Typography>
          <Card>
            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <WarningIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Mixed Language Content"
                    secondary="Use lang attribute on specific elements when content includes multiple languages"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WarningIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Dynamic Content Updates"
                    secondary="Ensure proper ARIA live regions for dynamic content changes"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WarningIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Complex Technical Terms"
                    secondary="Provide multiple ways to understand complex terms (definitions, examples, pronunciation)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WarningIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Reading Level Transitions"
                    secondary="Maintain context when switching between different reading levels"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Quality Checklist */}
        <Box component="section">
          <Typography variant="h5" component="h2" gutterBottom>
            Quality Checklist
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell><strong>Requirements</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    category: 'Language Declaration',
                    requirements: 'Proper lang attributes on html and specific elements'
                  },
                  {
                    category: 'Content Structure',
                    requirements: 'Clear heading hierarchy, logical content flow, proper semantic markup'
                  },
                  {
                    category: 'Reading Levels',
                    requirements: 'Multiple reading levels available, clear transitions between levels'
                  },
                  {
                    category: 'Technical Terms',
                    requirements: 'Definitions, examples, and pronunciation guides where appropriate'
                  }
                ].map((row) => (
                  <TableRow key={row.category}>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.requirements}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Paper>
  );
};

// Story Template
const Template: StoryFn<typeof ReadableDemo> = (args) => <ReadableDemo {...args} />;

export default {
  title: 'Accessibility/3. Understandable/3.1 Readable',
  parameters: {
    docs: {
      description: {
        component: `WCAG 3.1 Readable Content Guidelines\n
This guide demonstrates implementations of WCAG 3.1 Readable guidelines, which ensure text content is readable and understandable.\n
Key Requirements:\n
• Text content should be readable and understandable\n
• Language of content should be programmatically determined\n
• Unusual words and abbreviations should be defined\n
• Reading level should be appropriate for the content\n
• Pronunciation should be available when needed for understanding\n
Reference: WCAG 2.2 - 3.1 Readable (https://www.w3.org/TR/WCAG22/#readable)`
      }
    }
  }
};

// Story Exports
export const BasicExample = Template.bind({});
BasicExample.args = {
  showLanguageControls: true,
  enableAbbreviations: true,
  showReadingLevel: true
};
BasicExample.parameters = {
  docs: {
    description: {
      story: `Basic Readable Content Implementation\n
This example demonstrates fundamental implementation of readable content guidelines.\n
Key Features:\n
• Multiple reading levels\n
• Language selection\n
• Technical term definitions\n
• Content structure guidelines\n
• Edge case handling\n
Best Practices:\n
• Use clear heading hierarchy\n
• Provide multiple ways to understand content\n
• Include proper language attributes\n
• Support different reading levels`
    }
  }
}; 