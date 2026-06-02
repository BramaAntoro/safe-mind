"use server";
import LibGetUserId from "@/lib/auth/getUserId.lib";
import serviceGetInsight from "../services/GetInsight.service";
import { Insight } from "../types/insight";

export default async function actionGetInsight(): Promise<Insight[]> {
  const userId = await LibGetUserId();
  return await serviceGetInsight(userId);
}
