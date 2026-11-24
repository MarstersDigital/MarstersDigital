import { onRequestPost, onRequestOptions } from "../functions/api/contact.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method === "POST") {
        return onRequestPost({ request, env, ctx });
      }
      if (request.method === "OPTIONS") {
        return onRequestOptions({ request, env, ctx });
      }
      return new Response(JSON.stringify({ ok: false, error: "Method not allowed." }), {
        status: 405,
        headers: { "Content-Type": "application/json", Allow: "POST, OPTIONS" },
      });
    }

    if (env && env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not Found", { status: 404 });
  },
};
