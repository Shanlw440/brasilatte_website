import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Cache-Control": "no-store",
  },
  body: JSON.stringify(body),
});

const clean = (s) => String(s ?? "").replace(/[<>]/g, "").trim();

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, { ok: true });

  try {
    if (event.httpMethod === "GET") {
      const { data, error } = await supabase
        .from("reviews")
        .select("id,name,rating,message,created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) return json(500, { ok: false, error: error.message });
      return json(200, { ok: true, reviews: data ?? [] });
    }

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");

      // Honeypot (bots fill this in)
      if (body.website) return json(200, { ok: true });

      const name = clean(body.name).slice(0, 60);
      const message = clean(body.message).slice(0, 500);
      const rating = Math.max(1, Math.min(5, parseInt(body.rating, 10) || 0));

      if (!name || !message || !rating) {
        return json(400, { ok: false, error: "Missing name, rating, or message." });
      }

      const { error } = await supabase
        .from("reviews")
        .insert([{ name, rating, message, status: "approved" }]);

      if (error) return json(500, { ok: false, error: error.message });

      return json(200, { ok: true });
    }

    return json(405, { ok: false, error: "Method not allowed" });
  } catch (e) {
    return json(500, { ok: false, error: e.message });
  }
};
