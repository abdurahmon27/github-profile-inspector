import { Box, IconButton, Tooltip } from '@mui/material';
import { Moon, Sun, ShareNetwork } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

interface NavbarProps {
  onThemeToggle: () => void;
  onShare?: () => void;
  showShare?: boolean;
}

export const Navbar = ({ onThemeToggle, onShare, showShare = false }: NavbarProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1000,
        display: 'flex',
        gap: 1,
      }}
    >
      {showShare && onShare && (
        <Tooltip title="Share Profile">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              onClick={onShare}
              sx={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid',
                borderColor: 'primary.main',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(139, 92, 246, 0.2)',
                },
              }}
              aria-label="share profile"
            >
              <ShareNetwork size={20} weight="bold" />
            </IconButton>
          </motion.div>
        </Tooltip>
      )}

      <Tooltip title={isDark ? 'Light Mode' : 'Dark Mode'}>
        <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
          <IconButton
            onClick={onThemeToggle}
            sx={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              },
            }}
            aria-label="toggle theme"
          >
            {isDark ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
          </IconButton>
        </motion.div>
      </Tooltip>
    </Box>
  );
};
