import { useQuery } from '@tanstack/react-query';
import { fetchUserRepos } from '@/shared/api/github';

export const useGitHubRepos = (username: string) => {
  return useQuery({
    queryKey: ['repos', username],
    queryFn: ({ signal }) => fetchUserRepos(username, signal),
    enabled: !!username.trim(),
    staleTime: 5 * 60 * 1000,
  });
};
