"use server";
import LibGetUserId from "../../../lib/auth/getUserId.lib";
import ServiceCreateInsight from "../services/createInsight.service";

export default async function ActionCreateInsight() {
  console.log("Create Insight sedang dimulai");

  const userId = await LibGetUserId();
  const data = await ServiceCreateInsight(userId);
  console.log("Create Insight sedang berhasil");
  return data;
}
