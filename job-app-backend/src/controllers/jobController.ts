import { Request, Response } from "express";
import Job from "../models/Job";

export const createJob = async (req: any, res: any): Promise<any> => {
  try {
    const { title, description } = req.body;
    const job = await Job.create({
      title,
      description,
      recruiterId: req.userId,
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: "Error creating job" });
  }
};

export const getJobs = async (req: any, res: any) => {
  try {
    if (req.userRole === "recruiter") {
      // Recruiters only see their own jobs
      const jobs = await Job.find({ recruiterId: req.userId });
      return res.json(jobs);
    }

    // Candidates see all jobs
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching jobs" });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting job" });
  }
};
