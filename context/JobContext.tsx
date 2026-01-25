import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Job } from "../types.ts";
import { supabase } from "../lib/supabase.ts";
import { API_BASE_URL } from "../config";
import { toast } from "react-toastify";

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, "id">) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  updateJob: (job: Job) => Promise<void>;
  isLoading: boolean;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/auth/job/get-all`);
      const json = await res.json();

      if (json.RC === 200) {
        setJobs(json.RD);
      } else {
        console.error("Fetch jobs failed:", json);
      }
    } catch (err) {
      console.error("Fetch jobs error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const addJob = async (job: Omit<Job, "id">) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/job/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });

    const json = await res.json();
    if (json.RC != 201) {
      toast.error(json.RM);
      return;
    }
    await fetchJobs();
  };

  const deleteJob = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/job/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (json.RC != 200) {
      toast.error(json.RM);
    } else {
      toast.success(json.RM);
    }
    await fetchJobs();
  };

  const updateJob = async (job: Job) => {
    const { _id } = job;
    const res = await fetch(`${API_BASE_URL}/api/auth/job/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.RM || "Update job failed");
    await fetchJobs();
  };

  return (
    <JobContext.Provider
      value={{ jobs, addJob, deleteJob, updateJob, isLoading }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error("useJobs must be used within JobProvider");
  return context;
};
