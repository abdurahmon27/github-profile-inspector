export interface GitHubUser {
  login: string;
  name: string;
  avatar: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  htmlUrl: string;
  createdAt: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  topics: string[];
}
