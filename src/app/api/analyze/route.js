import { GoogleGenerativeAI } from "@google/generative-ai";
import { extractText, getDocumentProxy } from "unpdf";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const resumeFile = formData.get("resume");
    const jobDescription = formData.get("jobDescription") || "";

    if (!resumeFile) {
      return Response.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF using unpdf
    const uint8Array = new Uint8Array(buffer);
    const pdfDoc = await getDocumentProxy(uint8Array);
    const { text: resumeText } = await extractText(pdfDoc, {
      mergePages: true,
    });

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });

    // Build a prompt
    const prompt = `
You are an expert resume reviewer and ATS (Applicant Tracking System) specialist.

Analyze the following resume and provide feedback in this exact JSON format (no markdown, no extra text, only valid JSON):
{
  "atsScore": <number 0-100>,
  "strengths": ["point1", "point2"],
  "weaknesses": ["point1", "point2"],
  "missingKeywords": ["keyword1", "keyword2"],
  "suggestions": ["suggestion1", "suggestion2"]
}

Resume:
${resumeText}

${jobDescription ? `Job Description:\n${jobDescription}` : ""}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Remove markdown code block wrapper if present
    const cleanedText = responseText.replace(/```json|```/g, "").trim();
    const feedback = JSON.parse(cleanedText);

    return Response.json(feedback);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return Response.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}