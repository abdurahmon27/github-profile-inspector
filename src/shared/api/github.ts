import axios, { AxiosResponse } from 'axios';
import type { GitHubUser, GitHubRepository } from '../types/github';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

interface GitHubApiUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
}

interface GitHubApiRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const handleRateLimit = (headers: Record<string, string>) => {
  const remaining = headers['x-ratelimit-remaining'];
  const reset = headers['x-ratelimit-reset'];

  if (remaining === '0') {
    const resetDate = new Date(parseInt(reset) * 1000);
    const now = new Date();
    const waitTime = resetDate.getTime() - now.getTime();

    throw new Error(
      `Rate limit exceeded. Resets at ${resetDate.toLocaleTimeString()}. Please wait ${Math.ceil(waitTime / 1000 / 60)} minutes.`
    );
  }
};

const retryRequest = async <T>(
  fn: () => Promise<AxiosResponse<T>>,
  retries = MAX_RETRIES
): Promise<AxiosResponse<T>> => {
  try {
    return await fn();
  } catch (error: unknown) {
    if (retries === 0) throw error;

    const axiosError = error as {
      response?: { status?: number; headers?: Record<string, string> };
      code?: string;
    };

    if (axiosError.response?.status === 403 && axiosError.response.headers) {
      handleRateLimit(axiosError.response.headers);
    }

    if (
      (axiosError.response?.status && axiosError.response.status >= 500) ||
      axiosError.code === 'ECONNABORTED'
    ) {
      await sleep(RETRY_DELAY);
      return retryRequest(fn, retries - 1);
    }

    throw error;
  }
};

const transformUser = (data: GitHubApiUser): GitHubUser => ({
  login: data.login,
  name: data.name || data.login,
  avatar: data.avatar_url,
  bio: data.bio,
  location: data.location,
  company: data.company,
  blog: data.blog,
  twitter: data.twitter_username,
  publicRepos: data.public_repos,
  followers: data.followers,
  following: data.following,
  htmlUrl: data.html_url,
  createdAt: data.created_at,
});

const transformRepo = (data: GitHubApiRepo): GitHubRepository => ({
  id: data.id,
  name: data.name,
  fullName: data.full_name,
  description: data.description,
  htmlUrl: data.html_url,
  stars: data.stargazers_count,
  forks: data.forks_count,
  language: data.language,
  updatedAt: data.updated_at,
  topics: data.topics || [],
});

export const fetchUser = async (username: string, signal?: AbortSignal): Promise<GitHubUser> => {
  try {
    const response = await retryRequest<GitHubApiUser>(async () =>
      axiosInstance.get(`/users/${username}`, { signal })
    );

    handleRateLimit(response.headers as Record<string, string>);
    return transformUser(response.data);
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'name' in error && error.name === 'CanceledError') {
      throw error;
    }

    const axiosError = error as { response?: { status?: number }; message?: string };

    if (axiosError.response?.status === 404) {
      throw new Error('User not found. Please check the username and try again.');
    }

    if (axiosError.message?.includes('Rate limit')) {
      throw error;
    }

    throw new Error('Failed to fetch user data. Please try again.');
  }
};

export const fetchUserRepos = async (
  username: string,
  signal?: AbortSignal
): Promise<GitHubRepository[]> => {
  try {
    const response = await retryRequest<GitHubApiRepo[]>(async () =>
      axiosInstance.get(`/users/${username}/repos`, {
        params: {
          per_page: 100,
          sort: 'updated',
          direction: 'desc',
        },
        signal,
      })
    );

    handleRateLimit(response.headers as Record<string, string>);
    return response.data.map(transformRepo);
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'name' in error && error.name === 'CanceledError') {
      throw error;
    }

    const axiosError = error as { response?: { status?: number }; message?: string };

    if (axiosError.response?.status === 404) {
      throw new Error('Repositories not found.');
    }

    if (axiosError.message?.includes('Rate limit')) {
      throw error;
    }

    throw new Error('Failed to fetch repositories. Please try again.');
  }
};
