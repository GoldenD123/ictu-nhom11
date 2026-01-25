export interface User {
  id: string;
  email: string;
  role: string;
  fullName: string;
  cvContent?: string;
}

export interface Job {
  _id: string;
  title: string;
  CName: string;
  add: string;
  salary: string;
  des: string;
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
