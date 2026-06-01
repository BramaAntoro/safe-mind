import { createClient } from "@/lib/supabase/server";
import { format, subDays } from "date-fns";
import { AI_GEMINI } from "../utils/GoogleGenAI";
import { ThinkingLevel } from "@google/genai";
import { Content } from "next/font/google";

export default async function ServiceCreateInsight(userId: string) {
  const supabase = await createClient();

  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);

  const dateStart = format(sevenDaysAgo, "yyyy-MM-dd");
  const dateEnd = format(today, "yyyy-MM-dd");

  const { data: dataActivities, error: errorActivities } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", userId)
    .gte("date", dateStart)
    .lte("date", dateEnd)
    .order("date", { ascending: false });

  if (errorActivities) throw new Error(errorActivities.message);

  const activities = JSON.stringify(dataActivities, null);

  // console.log({ data });

  const genAI = AI_GEMINI();
  const response = await genAI.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: `last 7 days data: ${activities}`,
    config: {
      // thinkingConfig: {
      //   thinkingLevel: ThinkingLevel.HIGH,
      // },
      systemInstruction: `Act as an Empathetic Wellness Coach with over 10 years of experience.
                        Your personality:
                        - Empathetic
                        - Insightful
                        - Supportive
                        - Professional yet relaxed
                        Analysis Goals:
                        1. Look for correlations.
                        2. Provide practical and sound advice.
                        3. Provide emotional validation during difficult days.
                        
                        answer in Indonesian`,
    },
  });

  console.log(response.text);
  if (response.usageMetadata) {
    console.log("=== PENGGUNAAN TOKEN ===");
    console.log(
      `Prompt (Input) Tokens: ${response.usageMetadata.promptTokenCount}`,
    );
    console.log(
      `Candidates (Output) Tokens: ${response.usageMetadata.candidatesTokenCount}`,
    );
    console.log(`Total Tokens: ${response.usageMetadata.totalTokenCount}`);
    console.log("=========================");
  }

  const { data: dataAiInsights, error: errorAiInsights } = await supabase.from("ai_insights").insert([
    {
      user_id: userId,
      start_date: dateStart,
      end_date: dateEnd,
      content: response.text
    },
  ]).select();
  if(errorAiInsights) throw new Error(errorAiInsights.message)

  return dataAiInsights;
}
