import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Insight } from "../types/insight";

export default async function serviceGetInsight(userId: string): Promise<Insight[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ai_insights")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  const ai_insights = data.map((item: any) => ({
    id: item.id,
    content: item.content,
    period: `${format(new Date(item.start_date), "d MMM", { locale: localeId })} - ${format(new Date(item.end_date), "d MMM yyyy", { locale: localeId })}`,
    date: format(new Date(item.created_at), "d MMM yyyy", { locale: localeId }),
  }));

  return ai_insights;
}
