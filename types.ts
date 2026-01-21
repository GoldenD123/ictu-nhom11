
export interface User {
  id: string;
  email: string;
  fullName: string;
  cvContent?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  tags: string[];
  logo: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface MatchResult {
  jobId: string;
  matchScore: number;
  reason: string;
}
