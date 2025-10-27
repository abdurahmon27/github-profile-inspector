import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({ value, onChange, placeholder = 'Search...' }: SearchInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <TextField
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ marginInlineStart: '1rem' }}>
              <MagnifyingGlass size={20} weight="bold" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end" sx={{ marginInlineEnd: '1rem' }}>
              <IconButton
                size="small"
                onClick={handleClear}
                aria-label="clear search"
                component={motion.button}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <X size={18} weight="bold" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '1.125rem',
            padding: '4px',
          },
        }}
      />
    </motion.div>
  );
};
