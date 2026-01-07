
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'candidate' | 'employer';
  avatar?: string;
  bio?: string;
  skills?: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract';
  description: string;
  requirements: string[];
  postedAt: string;
  category: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface CVAnalysisResult {
  summary: string;
  topSkills: string[];
  suggestedRoles: string[];
  score: number;
}
