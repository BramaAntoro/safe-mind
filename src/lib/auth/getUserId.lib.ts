import { createClient } from "../supabase/server";

export default async function LibGetUserId() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  if (!user) throw new Error("User tidak ditemukan atau belum login");

  return user.id;
}
