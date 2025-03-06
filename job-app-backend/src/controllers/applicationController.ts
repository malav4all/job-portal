import Application from "../models/Application";
import Job from "../models/Job";

export const applyForJob = async (req: any, res: any): Promise<any> => {
  try {
    const { jobId } = req.body;
    const resumeUrl = req.file?.path;
    const application = await Application.create({
      candidateId: req.userId,
      jobId,
      resumeUrl,
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: "Error applying for job" });
  }
};

export const getApplicationsForRecruiter = async (req: any, res: any) => {
  try {
    const jobs = await Job.find({ recruiterId: req.userId }); // Fetch jobs posted by recruiter
    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("candidateId", "email") // Show candidate email
      .populate("jobId", "title"); // Show job title

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applications" });
  }
};

export const getApplicationsForCandidate = async (req: any, res: any) => {
  try {
    const applications = await Application.find({ candidateId: req.userId })
      .populate("jobId", "title") // Show job title
      .select("status resumeUrl jobId");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching your applications" });
  }
};

export const updateApplicationStatus = async (req: any, res: any) => {
  try {
    const { status } = req.body;
    await Application.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: "Application status updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating application status" });
  }
};
