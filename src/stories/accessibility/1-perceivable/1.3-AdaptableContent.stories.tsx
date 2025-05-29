import React, { useState } from 'react';
import type { StoryFn } from '@storybook/react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  useTheme,
  useMediaQuery,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  ButtonGroup,
} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import BuildIcon from '@mui/icons-material/Build';

interface DataItem {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
}

const sampleData: DataItem[] = [
  {
    id: 1,
    title: 'Complete Project Proposal',
    description: 'Draft and submit the Q2 project proposal',
    category: 'Planning',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Review Design Mockups',
    description: 'Review and provide feedback on new design mockups',
    category: 'Design',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Update Documentation',
    description: 'Update API documentation with recent changes',
    category: 'Development',
    priority: 'Low',
  },
];

interface AdaptableContentProps {
  initialView: 'list' | 'grid' | 'table';
  allowOrientationLock: boolean;
}

const AdaptableContentDemo = ({
  initialView,
  allowOrientationLock,
}: AdaptableContentProps) => {
  const [view, setView] = useState<'list' | 'grid' | 'table'>(initialView);
  const [sortBy, setSortBy] = useState<'priority' | 'category'>('priority');
  const [orientation, setOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sortedData = [...sampleData].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a.category.localeCompare(b.category);
  });

  const renderListView = () => (
    <Stack spacing={2}>
      {sortedData.map((item) => (
        <Paper
          key={item.id}
          elevation={1}
          sx={{ p: 2 }}
          role="article"
          aria-labelledby={`title-${item.id}`}
        >
          <Typography
            id={`title-${item.id}`}
            variant="h6"
            gutterBottom
            component="h3"
          >
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            paragraph
          >
            {item.description}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ color: 'text.secondary' }}
          >
            <Typography variant="caption">
              Category: {item.category}
            </Typography>
            <Typography variant="caption">
              Priority: {item.priority}
            </Typography>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );

  const renderGridView = () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 2,
      }}
    >
      {sortedData.map((item) => (
        <Paper
          key={item.id}
          elevation={1}
          sx={{
            p: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          role="article"
          aria-labelledby={`grid-title-${item.id}`}
        >
          <Typography
            id={`grid-title-${item.id}`}
            variant="h6"
            gutterBottom
            component="h3"
          >
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ flex: 1 }}
          >
            {item.description}
          </Typography>
          <Box sx={{ mt: 2, color: 'text.secondary' }}>
            <Typography variant="caption" display="block">
              Category: {item.category}
            </Typography>
            <Typography variant="caption" display="block">
              Priority: {item.priority}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );

  const renderTableView = () => (
    <TableContainer component={Paper}>
      <Table aria-label="Task list">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.priority}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 1200 }}>
      <Stack spacing={3}>
        {/* Controls */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setView('list')}
              color={view === 'list' ? 'primary' : 'default'}
              aria-label="List view"
              aria-pressed={view === 'list'}
            >
              <ViewListIcon />
            </IconButton>
            <IconButton
              onClick={() => setView('grid')}
              color={view === 'grid' ? 'primary' : 'default'}
              aria-label="Grid view"
              aria-pressed={view === 'grid'}
            >
              <ViewModuleIcon />
            </IconButton>
          </Box>

          <FormControl size="small">
            <InputLabel id="sort-select-label">Sort by</InputLabel>
            <Select
              labelId="sort-select-label"
              value={sortBy}
              label="Sort by"
              onChange={(e) => setSortBy(e.target.value as 'priority' | 'category')}
            >
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="category">Category</MenuItem>
            </Select>
          </FormControl>

          {allowOrientationLock && (
            <FormControl size="small">
              <InputLabel id="orientation-select-label">Orientation</InputLabel>
              <Select
                labelId="orientation-select-label"
                value={orientation}
                label="Orientation"
                onChange={(e) => setOrientation(e.target.value as 'auto' | 'portrait' | 'landscape')}
                startAdornment={<ScreenRotationIcon />}
              >
                <MenuItem value="auto">Auto</MenuItem>
                <MenuItem value="portrait">Portrait</MenuItem>
                <MenuItem value="landscape">Landscape</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>

        {/* Content */}
        <Box
          sx={{
            ...(orientation !== 'auto' && {
              '@media screen and (orientation: portrait)': {
                display: orientation === 'landscape' ? 'none' : 'block',
              },
              '@media screen and (orientation: landscape)': {
                display: orientation === 'portrait' ? 'none' : 'block',
              },
            }),
          }}
        >
          {view === 'list' && renderListView()}
          {view === 'grid' && renderGridView()}
          {view === 'table' && renderTableView()}
        </Box>

        {/* Help Text */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            This demo implements WCAG 1.3 Adaptable guidelines:
            <ul>
              <li>1.3.1 Info and Relationships - Content structure using semantic HTML and ARIA</li>
              <li>1.3.2 Meaningful Sequence - Logical reading and navigation order</li>
              <li>1.3.3 Sensory Characteristics - Content and functionality independent of orientation</li>
              <li>1.3.4 Orientation - Content not restricted to specific display orientations</li>
              <li>1.3.5 Identify Input Purpose - Clear labeling and purpose for interactive elements</li>
            </ul>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

const AdaptableHeader = () => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h4" gutterBottom>
      WCAG 1.3 Adaptable Content
    </Typography>
    <Alert severity="info" sx={{ mb: 2 }}>
      <AlertTitle>Purpose</AlertTitle>
      Create content that can be presented in different ways without losing information or structure
    </Alert>
    <Card>
      <CardHeader title="Key Requirements" />
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="Information and Structure"
              secondary="Content must maintain its meaning when presented in different ways"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="Meaningful Sequence"
              secondary="Content must be presented in a logical reading order"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="Sensory Independence"
              secondary="Instructions must not rely solely on shape, size, location, or sound"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="Orientation"
              secondary="Content must work in any screen orientation"
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  </Box>
);

const BasicAdaptableDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const steps = [
    {
      label: 'Start with Semantic Structure',
      content: (
        <Box>
          <Alert severity="info" sx={{ mb: 2 }}>
            Begin with proper HTML structure to ensure content maintains meaning across different presentations.
          </Alert>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom id="task-section-title">
              Task Section Example
            </Typography>
            <Box component="section" aria-labelledby="task-section-title">
              <List>
                <ListItem>
                  <Box component="article">
                    <Typography variant="h6" component="h3">
                      Complete Project Proposal
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Draft and submit the Q2 project proposal
                    </Typography>
                    <Typography variant="caption" component="footer" sx={{ mt: 1 }}>
                      Priority: High
                    </Typography>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box component="article">
                    <Typography variant="h6" component="h3">
                      Review Design Mockups
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Review and provide feedback on new design mockups
                    </Typography>
                    <Typography variant="caption" component="footer" sx={{ mt: 1 }}>
                      Priority: Medium
                    </Typography>
                  </Box>
                </ListItem>
              </List>
            </Box>
          </Paper>
          <List>
            <ListItem>
              <ListItemIcon>
                <InfoIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Semantic Structure" 
                secondary="Using proper HTML elements like section, article, and headings"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="ARIA Relationships" 
                secondary="Connecting elements with aria-labelledby"
              />
            </ListItem>
          </List>
        </Box>
      )
    },
    {
      label: 'Implement Flexible Layout',
      content: (
        <Box>
          <Alert severity="info" sx={{ mb: 2 }}>
            Use flexible layouts that adapt to different viewport sizes while maintaining readability.
          </Alert>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Responsive Card Layout
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 2,
              }}
            >
              {[
                { title: 'Card 1', content: 'Flexible width content that adapts to available space' },
                { title: 'Card 2', content: 'Content reflows based on container size' },
                { title: 'Card 3', content: 'Maintains readability at different viewport sizes' },
              ].map((card, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {card.content}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
          <List>
            <ListItem>
              <ListItemIcon>
                <InfoIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Responsive Grid" 
                secondary="Adapts columns based on viewport width"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Flexible Units" 
                secondary="Using relative units for sizing"
              />
            </ListItem>
          </List>
        </Box>
      )
    },
    {
      label: 'Ensure Device Independence',
      content: (
        <Box>
          <Alert severity="info" sx={{ mb: 2 }}>
            Content must be usable across different devices and input methods.
          </Alert>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Interactive Controls Example
            </Typography>
            <Stack spacing={2}>
              <Box>
                <ButtonGroup 
                  aria-label="Text formatting options"
                  sx={{ 
                    '& .MuiButton-root': { 
                      minWidth: '44px',
                      height: '44px'
                    } 
                  }}
                >
                  <Button aria-label="Bold text">B</Button>
                  <Button aria-label="Italic text">I</Button>
                  <Button aria-label="Underline text">U</Button>
                </ButtonGroup>
              </Box>
              <FormControl>
                <InputLabel id="font-size-label">Font Size</InputLabel>
                <Select
                  labelId="font-size-label"
                  value="medium"
                  label="Font Size"
                  sx={{ minHeight: '44px' }}
                >
                  <MenuItem value="small">Small</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="large">Large</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Paper>
          <List>
            <ListItem>
              <ListItemIcon>
                <BuildIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Touch Targets" 
                secondary="Minimum 44x44 pixels for interactive elements"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BuildIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Keyboard Access" 
                secondary="All controls are keyboard accessible"
              />
            </ListItem>
          </List>
        </Box>
      )
    }
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography 
          component="h1" 
          variant="h4" 
          gutterBottom
        >
          Basic Adaptable Content Guide
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Key Principle</AlertTitle>
          Create content that can be presented in different ways without losing structure or information.
        </Alert>

        {/* Interactive Guide Section */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Implementation Guide:
          </Typography>
          <Alert severity="info" sx={{ mb: 3 }}>
            Follow these steps to create basic adaptable content that works across different presentations.
          </Alert>
          <Box sx={{ mb: 4 }}>
            <Stepper 
              activeStep={activeStep} 
              orientation={isMobile ? "vertical" : "horizontal"}
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === steps.length - 1 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  {isMobile && (
                    <StepContent>
                      {step.content}
                    </StepContent>
                  )}
                </Step>
              ))}
            </Stepper>
            {!isMobile && (
              <Box sx={{ mt: 3 }}>
                {steps[activeStep].content}
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => prev - 1)}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() => setActiveStep((prev) => prev + 1)}
                disabled={activeStep === steps.length - 1}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Implementation Guidelines */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Implementation Requirements
          </Typography>
          <List>
            {[
              'Use semantic HTML to maintain content structure',
              'Implement responsive design patterns',
              'Support content reflow at different zoom levels',
              'Ensure orientation independence',
              'Maintain logical reading order',
              'Test with different viewport sizes'
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

        {/* Edge Cases and Considerations */}
        <Alert severity="warning">
          <AlertTitle>Common Pitfalls</AlertTitle>
          <Typography variant="body2" component="div">
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Don't use fixed width containers that prevent proper zooming</li>
              <li>Don't hide content based on screen size or orientation</li>
              <li>Don't rely on specific viewport dimensions</li>
              <li>Don't break logical reading order when reflowing content</li>
            </ul>
          </Typography>
        </Alert>

        {/* Quality Checklist */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Quality Checklist
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Feature</strong></TableCell>
                  <TableCell><strong>Requirements</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    feature: 'Responsive Layout',
                    requirements: 'Content adapts to different viewport sizes without loss of information'
                  },
                  {
                    feature: 'Content Reflow',
                    requirements: 'Supports 400% zoom without horizontal scrolling'
                  },
                  {
                    feature: 'Orientation',
                    requirements: 'Functions in both portrait and landscape modes'
                  },
                  {
                    feature: 'Reading Order',
                    requirements: 'Maintains logical sequence when content reflows'
                  }
                ].map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell>{row.feature}</TableCell>
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

const FullAdaptableDemo = () => {
  const [view, setView] = useState<'list' | 'grid' | 'table'>('list');
  const [sortBy, setSortBy] = useState<'priority' | 'category'>('priority');
  const [orientation, setOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography 
          component="h1" 
          variant="h4" 
          gutterBottom
        >
          Advanced Adaptable Content Guide
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Key Principle</AlertTitle>
          Implement advanced adaptable features that enhance content accessibility and usability across different contexts.
        </Alert>

        {/* Interactive Demo Section */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Interactive Example:
          </Typography>
          <Alert severity="info" sx={{ mb: 3 }}>
            This demo shows advanced adaptable features in action. Try different view modes and orientations.
          </Alert>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={2}>
              {/* Controls */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ xs: 'stretch', sm: 'center' }}
              >
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={() => setView('list')}
                    color={view === 'list' ? 'primary' : 'default'}
                    aria-label="List view"
                    aria-pressed={view === 'list'}
                  >
                    <ViewListIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => setView('grid')}
                    color={view === 'grid' ? 'primary' : 'default'}
                    aria-label="Grid view"
                    aria-pressed={view === 'grid'}
                  >
                    <ViewModuleIcon />
                  </IconButton>
                </Box>

                <FormControl size="small">
                  <InputLabel id="sort-select-label">Sort by</InputLabel>
                  <Select
                    labelId="sort-select-label"
                    value={sortBy}
                    label="Sort by"
                    onChange={(e) => setSortBy(e.target.value as 'priority' | 'category')}
                  >
                    <MenuItem value="priority">Priority</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small">
                  <InputLabel id="orientation-select-label">Orientation</InputLabel>
                  <Select
                    labelId="orientation-select-label"
                    value={orientation}
                    label="Orientation"
                    onChange={(e) => setOrientation(e.target.value as 'auto' | 'portrait' | 'landscape')}
                    startAdornment={<ScreenRotationIcon />}
                  >
                    <MenuItem value="auto">Auto</MenuItem>
                    <MenuItem value="portrait">Portrait</MenuItem>
                    <MenuItem value="landscape">Landscape</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              {/* Content Area */}
              <Box
                sx={{
                  ...(orientation !== 'auto' && {
                    '@media screen and (orientation: portrait)': {
                      display: orientation === 'landscape' ? 'none' : 'block',
                    },
                    '@media screen and (orientation: landscape)': {
                      display: orientation === 'portrait' ? 'none' : 'block',
                    },
                  }),
                }}
              >
                {view === 'list' && (
                  <Stack spacing={2}>
                    {sampleData.map((item) => (
                      <Paper
                        key={item.id}
                        elevation={1}
                        sx={{ p: 2 }}
                        role="article"
                        aria-labelledby={`title-${item.id}`}
                      >
                        <Typography
                          id={`title-${item.id}`}
                          variant="h6"
                          gutterBottom
                          component="h3"
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                        >
                          {item.description}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{ color: 'text.secondary' }}
                        >
                          <Typography variant="caption">
                            Category: {item.category}
                          </Typography>
                          <Typography variant="caption">
                            Priority: {item.priority}
                          </Typography>
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                )}

                {view === 'grid' && (
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                      },
                      gap: 2,
                    }}
                  >
                    {sampleData.map((item) => (
                      <Paper
                        key={item.id}
                        elevation={1}
                        sx={{
                          p: 2,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        role="article"
                        aria-labelledby={`grid-title-${item.id}`}
                      >
                        <Typography
                          id={`grid-title-${item.id}`}
                          variant="h6"
                          gutterBottom
                          component="h3"
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ flex: 1 }}
                        >
                          {item.description}
                        </Typography>
                        <Box sx={{ mt: 2, color: 'text.secondary' }}>
                          <Typography variant="caption" display="block">
                            Category: {item.category}
                          </Typography>
                          <Typography variant="caption" display="block">
                            Priority: {item.priority}
                          </Typography>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                )}

                {view === 'table' && (
                  <TableContainer>
                    <Table aria-label="Task list">
                      <TableHead>
                        <TableRow>
                          <TableCell>Title</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Priority</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sampleData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell component="th" scope="row">
                              {item.title}
                            </TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.priority}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            </Stack>
          </Paper>
        </Box>

        <Divider />

        {/* Implementation Guidelines */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Advanced Implementation Requirements
          </Typography>
          <List>
            {[
              'Implement smooth transitions between views',
              'Preserve user preferences and content state',
              'Provide keyboard shortcuts for view switching',
              'Announce view changes to screen readers',
              'Maintain focus management during transitions',
              'Support touch and gesture interactions'
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

        {/* Testing Guidelines */}
        <Alert severity="warning">
          <AlertTitle>Testing Requirements</AlertTitle>
          <Typography variant="body2" component="div">
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Test keyboard navigation in all views</li>
              <li>Verify screen reader announcements</li>
              <li>Check touch target sizes on mobile</li>
              <li>Validate focus management during transitions</li>
            </ul>
          </Typography>
        </Alert>

        {/* Quality Checklist */}
        <Box>
          <Typography 
            component="h2" 
            variant="h6" 
            gutterBottom
          >
            Advanced Features Checklist
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Feature</strong></TableCell>
                  <TableCell><strong>Requirements</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    feature: 'View Switching',
                    requirements: 'Smooth transitions, preserved state, keyboard support'
                  },
                  {
                    feature: 'State Management',
                    requirements: 'Save preferences, restore state, maintain focus'
                  },
                  {
                    feature: 'Controls',
                    requirements: 'Responsive layout, touch-friendly, keyboard accessible'
                  },
                  {
                    feature: 'Announcements',
                    requirements: 'Clear feedback, state changes, error messages'
                  }
                ].map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell>{row.feature}</TableCell>
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

const AdaptableChallenges = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800 }}>
      <Stack spacing={3}>
        <Typography variant="h5" gutterBottom>
          Common Adaptable Content Challenges
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Key Principle</AlertTitle>
          Address common challenges in making content adaptable while maintaining accessibility and usability.
        </Alert>

        {/* Complex Layout Challenges */}
        <Box>
          <Typography variant="h6" gutterBottom>
            1. Complex Layout Adaptation
          </Typography>
          <Stack spacing={2}>
            <Alert severity="warning">
              <AlertTitle>Challenge</AlertTitle>
              Complex layouts with multiple columns, nested content, and dynamic elements can break when adapting to different viewports.
            </Alert>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Solution:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Use CSS Grid and Flexbox for flexible layouts" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Define clear breakpoints for layout changes" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Maintain logical reading order in the DOM" />
                </ListItem>
              </List>
            </Paper>
          </Stack>
        </Box>

        {/* Data Table Challenges */}
        <Box>
          <Typography variant="h6" gutterBottom>
            2. Data Table Adaptation
          </Typography>
          <Stack spacing={2}>
            <Alert severity="warning">
              <AlertTitle>Challenge</AlertTitle>
              Tables with many columns become unreadable on small screens and can lose their structure when simplified.
            </Alert>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Solution:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Provide horizontal scrolling for complex tables" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Transform to cards/lists on mobile" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Allow column priority selection" />
                </ListItem>
              </List>
            </Paper>
          </Stack>
        </Box>

        {/* Interactive Content Challenges */}
        <Box>
          <Typography variant="h6" gutterBottom>
            3. Interactive Content
          </Typography>
          <Stack spacing={2}>
            <Alert severity="warning">
              <AlertTitle>Challenge</AlertTitle>
              Interactive elements may become difficult to use when resized or reoriented, especially with touch interfaces.
            </Alert>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Solution:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Ensure adequate touch target sizes" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Provide keyboard alternatives" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Adapt interaction patterns for different devices" />
                </ListItem>
              </List>
            </Paper>
          </Stack>
        </Box>

        <Alert severity="info">
          <AlertTitle>Implementation Tips</AlertTitle>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Test with real devices and screen readers" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Use feature detection instead of device detection" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Provide fallbacks for complex interactions" />
            </ListItem>
          </List>
        </Alert>
      </Stack>
    </Paper>
  );
};

const BasicTemplate: StoryFn = () => <BasicAdaptableDemo />;
const FullTemplate: StoryFn = () => <FullAdaptableDemo />;
const ChallengesTemplate: StoryFn = () => <AdaptableChallenges />;

export default {
  title: 'Accessibility/1-Perceivable/1.3-Adaptable',
  parameters: {
    docs: {
      description: {
        component: `WCAG 1.3 Adaptable Content\n
Create content that can be presented in different ways while preserving structure and information.\n
Key Requirements:\n
  • Preserve information across different presentations\n
  • Support multiple viewing orientations\n
  • Make content adaptable to user preferences\n
  • Ensure clear structure and relationships\n
Reference:
See WCAG 2.2 - 1.3 Adaptable (https://www.w3.org/TR/WCAG22/#adaptable)`
      }
    }
  }
};

export const BasicAdaptable = BasicTemplate.bind({});
BasicAdaptable.args = {
  initialView: 'list',
  allowOrientationLock: false,
};

export const FullAdaptable = FullTemplate.bind({});
FullAdaptable.args = {
  initialView: 'grid',
  allowOrientationLock: true,
};

export const Challenges = ChallengesTemplate.bind({});
Challenges.parameters = {
  docs: {
    description: {
      story: `Common Adaptable Content Challenges\n
Key Challenges:\n
  • Complex Layouts: Maintaining structure across viewports\n
  • Data Tables: Preserving relationships on small screens\n
  • Interactive Elements: Ensuring usability across devices\n
  • Content Reflow: Maintaining readability when scaled\n
Solutions:\n
  • Use flexible layout patterns (Grid/Flexbox)\n
  • Provide alternative view options\n
  • Implement responsive interaction patterns\n
  • Test across different contexts`
    }
  }
}; 