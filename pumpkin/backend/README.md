# Pumpkin adaptive AI — staged backend

This directory contains the first backend for Pumpkin Your Day, staged in the GitHub development branch. It has NOT been installed on the Amsterdam VPS.

Features: a small Node.js 22+ HTTP server with zero runtime dependencies; a health endpoint; a chat endpoint using OpenAI Responses API; dynamic selection of the next question; a short conversation history; and a structured JSON response.

SECURITY: The backend listens on 127.0.0.1 and its paid-AI integration is disabled by default. It does NOT contain an API key. Never upload a key to GitHub or place one in the web page. OpenAI requests use store:false. There is no durable user-account database.

GET /health — server status.
POST /api/chat — JSON with message (string) and optional history (array of role/content objects).
Response — JSON with reply, follow_up_question and options.

Run locally with Node 22+ using: node server.mjs
Check locally using: curl http://127.0.0.1:3080/health

Before enabling for the public: configure HTTPS and Nginx reverse-proxy routing, per-user rate limits and usage budget, security monitoring, privacy disclosures and manual approval to turn on paid API access. The existing public Pumpkin page remains a scripted demo until its client is deliberately updated.

Do not enable live AI or change the Amsterdam server without the owner's approval.
