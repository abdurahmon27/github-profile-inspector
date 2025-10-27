import {
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { MagnifyingGlass } from '@phosphor-icons/react';

interface RepositoryFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  languageFilter: string;
  onLanguageChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  languages: string[];
}

export const RepositoryFilters = ({
  searchQuery,
  onSearchChange,
  languageFilter,
  onLanguageChange,
  sortBy,
  onSortChange,
  languages,
}: RepositoryFiltersProps) => {
  return (
    <Box
      sx={{
        mb: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', md: 'center' },
      }}
    >
      <TextField
        placeholder="Search repositories..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MagnifyingGlass size={20} weight="bold" />
            </InputAdornment>
          ),
        }}
        sx={{ flex: 1 }}
      />
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Language</InputLabel>
        <Select
          value={languageFilter}
          label="Language"
          onChange={(e: SelectChangeEvent) => onLanguageChange(e.target.value)}
        >
          {languages.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang === 'all' ? 'All Languages' : lang}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e: SelectChangeEvent) => onSortChange(e.target.value)}
        >
          <MenuItem value="updated">Recently Updated</MenuItem>
          <MenuItem value="stars">Most Stars</MenuItem>
          <MenuItem value="forks">Most Forks</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
