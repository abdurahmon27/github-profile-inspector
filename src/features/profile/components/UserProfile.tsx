import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
  Button,
  Skeleton,
  Alert,
} from '@mui/material';
import {
  GithubLogo,
  MapPin,
  Buildings,
  Link as LinkIcon,
  TwitterLogo,
} from '@phosphor-icons/react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useGitHubUser } from '../hooks/useGitHubUser';

interface StatBoxProps {
  label: string;
  value: number;
}

const StatBox = ({ label, value }: StatBoxProps) => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography variant="h4" fontWeight="bold" color="primary">
      {value?.toLocaleString() || 0}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Box>
);

const ProfileSkeleton = () => (
  <Card>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Skeleton variant="circular" width={120} height={120} sx={{ mb: 2 }} />
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="text" width={150} height={30} />
      </Box>
    </CardContent>
  </Card>
);

interface UserProfileProps {
  username: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

export const UserProfile = ({ username }: UserProfileProps) => {
  const { data: user, isLoading, error } = useGitHubUser(username);

  if (!username.trim()) {
    return null;
  }

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error instanceof Error ? error.message : 'Failed to load user profile'}
      </Alert>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={user.login}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 2.5,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2,
                    border: '3px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
                  }}
                />
              </motion.div>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                @{user.login}
              </Typography>
              {user.bio && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 2, maxWidth: 500 }}
                >
                  {user.bio}
                </Typography>
              )}
            </Box>

            <Box
              sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 3 }}
            >
              {user.location && (
                <Chip
                  icon={<MapPin size={16} weight="bold" />}
                  label={user.location}
                  size="small"
                />
              )}
              {user.company && (
                <Chip
                  icon={<Buildings size={16} weight="bold" />}
                  label={user.company}
                  size="small"
                />
              )}
              {user.blog && (
                <Chip
                  icon={<LinkIcon size={16} weight="bold" />}
                  label={user.blog}
                  size="small"
                  component="a"
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  clickable
                />
              )}
              {user.twitter && (
                <Chip
                  icon={<TwitterLogo size={16} weight="bold" />}
                  label={`@${user.twitter}`}
                  size="small"
                  component="a"
                  href={`https://twitter.com/${user.twitter}`}
                  target="_blank"
                  clickable
                />
              )}
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 3 }}>
              <StatBox label="Repositories" value={user.publicRepos} />
              <StatBox label="Followers" value={user.followers} />
              <StatBox label="Following" value={user.following} />
            </Box>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<GithubLogo size={20} weight="bold" />}
                href={user.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                }}
              >
                View on GitHub
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
