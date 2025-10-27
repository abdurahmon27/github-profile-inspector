import { useState, type ReactNode } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { Code, Info } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { RepositoryList } from '@/features/repositories';
import { useGitHubUser } from '@/features/profile';

interface TabPanelProps {
  children?: ReactNode;
  value: number;
  index: number;
}

const TabPanelContent = ({ children, value, index }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
  </div>
);

interface AboutTabProps {
  username: string;
}

const AboutTab = ({ username }: AboutTabProps) => {
  const { data: user } = useGitHubUser(username);

  if (!user) return null;

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        About
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" color="text.secondary" paragraph>
          <strong>Joined GitHub:</strong>{' '}
          {new Date(user.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>
        {user.bio && (
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Bio:</strong> {user.bio}
          </Typography>
        )}
        {user.location && (
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Location:</strong> {user.location}
          </Typography>
        )}
        {user.company && (
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Company:</strong> {user.company}
          </Typography>
        )}
        {user.blog && (
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Website:</strong>{' '}
            <a
              href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit' }}
            >
              {user.blog}
            </a>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

interface UserTabsProps {
  username: string;
}

export const UserTabs = ({ username }: UserTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const { data: user } = useGitHubUser(username);

  if (!username.trim()) return null;
  if (!user) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                backgroundColor: 'primary.main',
              },
            }}
          >
            <Tab
              icon={<Code size={20} weight="bold" />}
              iconPosition="start"
              label={`Repositories (${user.publicRepos})`}
              id="tab-0"
              aria-controls="tabpanel-0"
            />
            <Tab
              icon={<Info size={20} weight="bold" />}
              iconPosition="start"
              label="About"
              id="tab-1"
              aria-controls="tabpanel-1"
            />
          </Tabs>

          <TabPanelContent value={activeTab} index={0}>
            <RepositoryList username={username} />
          </TabPanelContent>

          <TabPanelContent value={activeTab} index={1}>
            <AboutTab username={username} />
          </TabPanelContent>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};
