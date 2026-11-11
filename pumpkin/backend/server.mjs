import http from "node:http";
import { PUMPKIN_INSTRUCTIONS, RESPONSE_FORMAT } from "./prompt.mjs";

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 3080);
const ENABLED = process.env.PUMPKIN_AI_ENABLED === "true" && Boolean(process.env.OPENAI_API_KEY);
const MODEL = process.env.OPENAI_MODEL || "gpt-6-luna";
const LIMIT_BYTES = 16 * 1024;
const callsByIp = new Map();

function reply(res, status, value) {
  const body = JSON.stringify(value);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

function isRateLimited(ip) {
  const now = Date.now();
  if (callsByIp.size > 5000) {
    for (const [key, record] of callsByIp) {
      if (record.expires < now) callsByIp.delete(key);
    }
  }
  const item = callsByIp.get(ip);
  if (!item || item.expires < now) {
    callsByIp.set(ip, { count: 1, expires: now + 60000 });
    return false;
  }
  item.count++;
  return item.count > 12;
}

async function readBody(req) {
  const parts = [];
  let bytes = 0;
  for await (const chunk of req) {
    bytes += chunk.length;
    if (bytes > LIMIT_BYTES) {
      const error = new Error("Payload exceeds the 16KB limit");
      error.status = 413;
      throw error;
    }
    parts.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(parts).toString("utf8"));
  } catch {
    const error = new Error("Malformed JSON");
    error.status = 400;
    throw error;
  }
}

function cleanRequest(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  if (typeof body.message !== "string") return null;
  const message = body.message.trim();
  if (!message || message.length > 1000) return null;
  const history = body.history === undefined ? [] : body.history;
  if (!Array.isArray(history) || history.length > 12) return null;
  if (!history.every(turn => turn && ["user", "assistant"].includes(turn.role) && typeof turn.content === "string" && turn.content.length <= 1000)) return null;
  return {
    message,
    history: history.map(turn => ({ role: turn.role, content: turn.content }))
  };
}

async function generate({ message, history }) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    signal: AbortSignal.timeout(25000),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: MODEL,
      store: false,
      instructions: PUMPKIN_INSTRUCTIONS,
      input: [...history, { role: "user", content: message }],
      text: { format: RESPONSE_FORMAT },
      max_output_tokens: 550
    })
  });
  if (!response.ok) throw new Error("Upstream error " + response.status);
  const data = await response.json();
  const output = (data.output || [])
    .filter(item => item.type === "message")
    .flatMap(item => item.content || [])
    .filter(part => part.type === "output_text")
    .map(part => part.text)
    .join("");
  if (!output) throw new Error("Empty model response");
  const value = JSON.parse(output);
  if (typeof value.reply !== "string" || typeof value.follow_up_question !== "string" || !Array.isArray(value.options)) {
    throw new Error("Invalid model response");
  }
  return {
    reply: value.reply.slice(0, 2000),
    follow_up_question: value.follow_up_question.slice(0, 240),
    options: value.options.filter(x => typeof x === "string").slice(0, 4).map(x => x.slice(0, 80))
  };
}

const server = http.createServer(async (req, res) => {
  const path = new URL(req.url || "/", "http://localhost").pathname;
  if (req.method === "GET" && path === "/health") {
    return reply(res, 200, { service: "pumpkin", status: "ok", ai_enabled: ENABLED });
  }
  if (req.method !== "POST" || path !== "/api/chat") {
    return reply(res, 404, { error: "Not found" });
  }

  // Serve through a same-origin Nginx reverse proxy when ready.
  // This check is not a substitute for authentication or per-user quotas.
  const origin = req.headers.origin;
  if (origin && !["http://kymcore.online", "https://kymcore.online", "http://localhost:3080"].includes(origin)) {
    return reply(res, 403, { error: "Origin not allowed" });
  }
  if (!ENABLED) {
    return reply(res, 503, { error: "Live AI not enabled; public demo remains available." });
  }
  if (isRateLimited(req.socket.remoteAddress || "local")) {
    return reply(res, 429, { error: "Request limit reached. Try again shortly." });
  }
  const ct = req.headers["content-type"] || "";
  if (!ct.toLowerCase().startsWith("application/json")) {
    return reply(res, 415, { error: "Expected application/json" });
  }
  try {
    const payload = cleanRequest(await readBody(req));
    if (!payload) return reply(res, 400, { error: "Invalid request" });
    return reply(res, 200, await generate(payload));
  } catch (error) {
    if (error.status) return reply(res, error.status, { error: error.message });
    // Do not expose upstream details, API keys or private conversation text.
    console.error("Pumpkin service error:", error.name);
    return reply(res, 502, { error: "Pumpkin is temporarily unavailable." });
  }
});

server.requestTimeout = 30000;
server.headersTimeout = 10000;
server.listen(PORT, HOST, () => {
  console.log("Pumpkin listening on " + HOST + ":" + PORT + "; live AI " + (ENABLED ? "enabled" : "disabled"));
});
