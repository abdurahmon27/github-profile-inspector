import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Star, GitFork, Code } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import type { GitHubRepository } from '@/shared/types/github';
import { LANGUAGE_COLORS } from '../constants';

interface RepositoryCardProps {
  repo: GitHubRepository;
  index: number;
}

export const RepositoryCard = ({ repo, index }: RepositoryCardProps) => {
  const languageColor = LANGUAGE_COLORS[repo.language || ''] || '#8B5CF6';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.5) }}
      style={{ marginBottom: 16 }}
    >
      <Card sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography
            variant="h6"
            component="a"
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.125rem',
              display: 'block',
              mb: 1.5,
              '&:hover': {
                color: 'primary.light',
              },
            }}
          >
            {repo.name}
          </Typography>

          {repo.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                lineHeight: 1.6,
              }}
            >
              {repo.description}
            </Typography>
          )}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}>
            {repo.language && (
              <Chip
                icon={<Code size={14} weight="bold" style={{ color: languageColor }} />}
                label={repo.language}
                size="small"
                sx={{
                  background: `${languageColor}15`,
                  color: languageColor,
                  fontWeight: 600,
                  border: `1px solid ${languageColor}30`,
                }}
              />
            )}
            {repo.stars > 0 && (
              <Chip
                icon={<Star size={14} weight="fill" />}
                label={repo.stars.toLocaleString()}
                size="small"
                sx={{ fontWeight: 600 }}
              />
            )}
            {repo.forks > 0 && (
              <Chip
                icon={<GitFork size={14} weight="bold" />}
                label={repo.forks.toLocaleString()}
                size="small"
                sx={{ fontWeight: 600 }}
              />
            )}
          </Box>

          {repo.topics && repo.topics.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {repo.topics.slice(0, 5).map((topic) => (
                <Chip
                  key={topic}
                  label={topic}
                  size="small"
                  sx={{
                    fontSize: '0.6875rem',
                    height: 22,
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
