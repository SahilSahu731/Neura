import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by **asking one relevant trip-related question at a time**.

 Only ask questions about the following details in order, and wait for the user’s answer before asking the next: 

1. Starting location (source) 
2. Destination city or country 
3. Group size (Solo, Couple, Family, Friends) 
4. Budget (Low, Medium, High) 
5. Trip duration (number of days)  
Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.
For each question, return the corresponding UI component:
- Question 3 (Group size): ui = "groupSize"
- Question 4 (Budget): ui = "budget"
- Question 5 (Trip duration): ui = "tripDuration"
- Final plan: ui = "final"
Once all required information is collected, generate and return a **strict JSON response only** (no explanations or extra text) with following JSON schema:
{
resp:'Text Resp',
ui: "groupSize" or "budget" or "tripDuration" or "final"
}
`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      response_format : { type: "json_object" },
      messages: [
        {
          role: "system",
          content: PROMPT,
        },
        ...messages,
      ],
    });
    
    const message = completion.choices[0].message;
    const content = message.content ?? "";
    
    // Try to parse JSON, fallback to default structure if parsing fails
    try {
      const parsedResponse = JSON.parse(content);
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      // If JSON parsing fails, return the raw content with default UI
      return NextResponse.json({
        resp: content,
        ui: "final", // Default UI if parsing fails
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
