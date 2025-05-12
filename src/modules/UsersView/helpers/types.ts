export type FormValues = {
  username: string;
};

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
  user_view_type?: string;
}

export interface SearchUsersPage {
  items: GitHubUser[];
  nextPage?: number;
}

export interface GithubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}
