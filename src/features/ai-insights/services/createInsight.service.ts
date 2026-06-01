import { createClient } from "@/lib/supabase/server";
import { format, subDays } from "date-fns";
import { AI_GEMINI } from "../utils/GoogleGenAI";

export default async function ServiceCreateInsight(userId: string) {
  const supabase = await createClient();

  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);

  const dateStart = format(sevenDaysAgo, "yyyy-MM-dd");
  const dateEnd = format(today, "yyyy-MM-dd");

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", userId)
    .gte("date", dateStart)
    .lte("date", dateEnd)
    .order("date", { ascending: false });

  if (error) throw new Error(error.message);

  // console.log({ data });

  const genAI = AI_GEMINI();
  const response = await genAI.models.generateContent({
    model: "gemini-3.5-flash",
    contents: "Jawab iya"
  })

  console.log(response.text)
  if (response.usageMetadata) {
    console.log("=== PENGGUNAAN TOKEN ===");
    console.log(`Prompt (Input) Tokens: ${response.usageMetadata.promptTokenCount}`);
    console.log(`Candidates (Output) Tokens: ${response.usageMetadata.candidatesTokenCount}`);
    console.log(`Total Tokens: ${response.usageMetadata.totalTokenCount}`);
    console.log("=========================");
  }
  return data;
}
