import { useMemo, useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Code } from '@phosphor-icons/react';
import { AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { RepositoryCard } from './RepositoryCard';
import { RepositoryFilters } from './RepositoryFilters';
import { RepositorySkeleton } from './RepositorySkeleton';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { useRepositoryFilters } from '../hooks/useRepositoryFilters';
import { ITEMS_PER_PAGE, MASONRY_BREAKPOINTS } from '../constants';
import '../styles/masonry.css';

interface RepositoryListProps {
  username: string;
}

export const RepositoryList = ({ username }: RepositoryListProps) => {
  const { data: repos = [], isLoading } = useGitHubRepos(username);
  const [page, setPage] = useState(1);

  const {
    searchQuery,
    setSearchQuery,
    languageFilter,
    setLanguageFilter,
    sortBy,
    setSortBy,
    languages,
    filteredAndSortedRepos,
  } = useRepositoryFilters(repos);

  const paginatedRepos = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedRepos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedRepos, page]);

  const totalPages = Math.ceil(filteredAndSortedRepos.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, languageFilter, sortBy]);

  if (!username.trim()) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Code
          size={80}
          weight="light"
          style={{ color: 'var(--mui-palette-text-secondary)', opacity: 0.3, marginBottom: 16 }}
        />
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Search for a GitHub user to view their repositories
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enter a username in the search bar above
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Masonry
        breakpointCols={MASONRY_BREAKPOINTS}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <RepositorySkeleton key={i} />
        ))}
      </Masonry>
    );
  }

  if (repos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Code
          size={80}
          weight="light"
          style={{ color: 'var(--mui-palette-text-secondary)', opacity: 0.3, marginBottom: 16 }}
        />
        <Typography variant="h5" color="text.secondary">
          No repositories found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <RepositoryFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        languageFilter={languageFilter}
        onLanguageChange={setLanguageFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        languages={languages}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {(page - 1) * ITEMS_PER_PAGE + 1}-
          {Math.min(page * ITEMS_PER_PAGE, filteredAndSortedRepos.length)} of{' '}
          {filteredAndSortedRepos.length} repositories
        </Typography>
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Typography
              variant="body2"
              sx={{ display: 'flex', alignItems: 'center', px: 2, fontWeight: 600 }}
            >
              {page} / {totalPages}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </Box>
        )}
      </Box>

      <AnimatePresence mode="wait">
        <Masonry
          breakpointCols={MASONRY_BREAKPOINTS}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
          key={page}
        >
          {paginatedRepos.map((repo, index) => (
            <RepositoryCard key={repo.id} repo={repo} index={index} />
          ))}
        </Masonry>
      </AnimatePresence>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Typography
            variant="body1"
            sx={{ display: 'flex', alignItems: 'center', px: 3, fontWeight: 600 }}
          >
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};
