import { useCallback } from 'react';

export const useShare = () => {
  const shareProfile = useCallback(async (username: string) => {
    const url = `${window.location.origin}/${username}`;
    const title = `${username}'s GitHub Profile`;
    const text = `Check out ${username}'s GitHub profile and repositories`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          await navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        }
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  }, []);

  return { shareProfile };
};
