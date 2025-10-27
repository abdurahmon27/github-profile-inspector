import { useMemo, useState } from 'react';
import type { GitHubRepository } from '@/shared/types/github';

export const useRepositoryFilters = (repos: GitHubRepository[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated');

  const languages = useMemo(() => {
    const langs = new Set(
      repos.map((r) => r.language).filter((lang): lang is string => lang !== null)
    );
    return ['all', ...Array.from(langs).sort()];
  }, [repos]);

  const filteredAndSortedRepos = useMemo(() => {
    let filtered = repos;

    if (searchQuery) {
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.topics?.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (languageFilter !== 'all') {
      filtered = filtered.filter((repo) => repo.language === languageFilter);
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stars - a.stars;
        case 'forks':
          return b.forks - a.forks;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

    return sorted;
  }, [repos, searchQuery, languageFilter, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    languageFilter,
    setLanguageFilter,
    sortBy,
    setSortBy,
    languages,
    filteredAndSortedRepos,
  };
};
