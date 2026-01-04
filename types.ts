
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface JobRecommendation {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  matchScore: number;
  description: string;
  requiredSkills: string[];
  whyMatch: string;
}

export interface CVAnalysis {
  name: string;
  summary: string;
  skills: string[];
  experienceLevel: string;
  recommendedJobs: JobRecommendation[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
