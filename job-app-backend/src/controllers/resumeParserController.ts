import { Request, Response } from "express";
import fs from "fs";
import pdfParse from "pdf-parse";

export const parseResume = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const fileBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(fileBuffer);

    const mockParsedData = {
      name: data.text.match(/Name:\s*(.*)/)?.[1] || "Unknown",
      email: data.text.match(/Email:\s*(.*)/)?.[1] || "Unknown",
      phone: data.text.match(/Phone:\s*(.*)/)?.[1] || "Unknown",
      skills: data.text.match(/Skills:\s*(.*)/)?.[1]?.split(",") || [],
      education: data.text.match(/Education:\s*(.*)/)?.[1] || "Unknown",
    };

    res.json({ parsedResume: mockParsedData });
  } catch (error) {
    res.status(500).json({ error: "Error parsing resume" });
  }
};
