"use server";

import { supabase } from "../supabaselogic/supabaseClient";

export async function saveComment(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const rating = Number(formData.get("rating"));

  if (!name || !email || !message) {
    throw new Error("Missing required fields");
  }

  const { error } = await supabase.from("comments").insert([
    {
      name,
      email,
      message,
      rating,
    },
  ]);

  if (error) {
    console.error(error);
    throw new Error("Failed to save comment");
  }
}
