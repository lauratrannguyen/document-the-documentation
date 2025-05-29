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
} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';

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

export default {
  title: 'Accessibility/1. Perceivable/1.3 Adaptable',
  component: AdaptableContentDemo,
  parameters: {
    docs: {
      description: {
        component: 'WCAG 1.3 Adaptable - Create content that can be presented in different ways without losing structure or information.'
      }
    }
  }
};

const Template: StoryFn<typeof AdaptableContentDemo> = (args) => <AdaptableContentDemo {...args} />;

export const BasicAdaptable = Template.bind({});
BasicAdaptable.args = {
  initialView: 'list',
  allowOrientationLock: false,
};

export const FullAdaptable = Template.bind({});
FullAdaptable.args = {
  initialView: 'grid',
  allowOrientationLock: true,
}; 