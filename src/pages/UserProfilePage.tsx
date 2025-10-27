import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import { SearchInput } from '@/shared/ui';
import { useDebounce } from '@/shared/hooks';
import { UserProfile } from '@/features/profile';
import { UserTabs } from '@/features/user';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const UserProfilePage = () => {
  const { username: urlUsername } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(urlUsername || '');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.trim()) {
      navigate(`/${debouncedSearch}`, { replace: true });
    } else if (!debouncedSearch && urlUsername) {
      navigate('/', { replace: true });
    }
  }, [debouncedSearch, navigate, urlUsername]);

  useEffect(() => {
    if (urlUsername) {
      setSearchTerm(urlUsername);
    }
  }, [urlUsername]);

  return (
    <Container maxWidth="xl" sx={{ py: 5, px: { xs: 2, sm: 3, md: 4 } }}>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 5,
            }}
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  color: 'primary.main',
                  mb: 0.5,
                }}
              >
                GitHub Profile Inspector
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Discover GitHub profiles and explore their repositories
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 4 }}>
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search GitHub username..."
            />
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 4 }}>
            <UserProfile username={debouncedSearch} />
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box>
            <UserTabs username={debouncedSearch} />
          </Box>
        </motion.div>
      </motion.div>
    </Container>
  );
};
