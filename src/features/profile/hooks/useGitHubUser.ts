import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/shared/api/github';

export const useGitHubUser = (username: string) => {
  return useQuery({
    queryKey: ['user', username],
    queryFn: ({ signal }) => fetchUser(username, signal),
    enabled: !!username.trim(),
    staleTime: 5 * 60 * 1000,
  });
};
