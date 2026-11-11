# Pumpkin Your Day — Product direction (12 November 2026)

## Positioning

**A warm, proactive companion for happier, more interesting and more manageable days.**

Pumpkin is NOT a generic chatbot, task tracker or list of eight categories. It is a thoughtful companion that comes toward you with gentle ideas and action, helps you plan your time, supplies creative inspiration when you feel stuck, and follows through on small wins.

Brand line: **Together, we make your day. 🌞**

Messaging:
- "A little help, a happier day."
- "Don't know what to do next? Let's find something lovely."
- "One small win, one new idea, one better day."
- "Your day, your way. Pumpkin's here to help."

Avoid saying or implying: therapy, diagnosis, guaranteed happiness, an actual human friend, or a relationship that should replace real people.

## Opening experience — revised priority

The user should see a character and a direct invitation **before** a menu. The first 5 seconds should answer: "Why am I here? What can I do right now?"

1. Friendly welcome from Pumpkin: contextually relevant when actual information is available; never fake knowledge.
2. Four prominent intentions:
   - Give me an idea
   - Help plan my day
   - I need a little lift
   - Help me unwind
3. Start assisting immediately, using at most one relevant follow-up per turn.
4. Show a concrete result, a small next action and a clear way to refine or try something else.
5. Later: with consent, remember declared preferences and completed plans; allow review and deletion.

### Small-win planner

An enjoyable planner rather than a demanding productivity tool:
- One useful thing, one moment for yourself, one enjoyable moment.
- Each item can be marked complete; praise without guilt, punishment, or fabricated claims.
- Simple rescheduling; variable energy and budget; no unnecessary forms.
- Voice dictation and accessible tap targets, with actual AI after the server-side integration is secure.

### Creative spark

Dynamic suggestions for food with existing ingredients, outings, music, home activities, learning, creativity, social connection, relaxing, play, and surprise. Include the person's feedback in the next idea; don't keep asking the same questions.

### Original music

Music & Mindfulness is part of the core companion, not a hidden extra. When the user wants quiet, Pumpkin can recommend a self-produced mindfulness session, including the original first recording **A Little Room to Breathe** (audio publication pending, rights to be verified before launch).

## Current status

- First public static Pumpkin homepage and Music & Mindfulness page exist in the GitHub feature branch.
- The homepage now includes a front-and-center **interactive demo check-in** with actionable small-win plans and mood pathways.
- The Amsterdam Nginx HTTPS server and its localhost-only Node.js API are running.
- AI is **not** yet on. Do not pretend the browser demo is live AI.
- No sensitive memories or personal accounts are collected by the demo.

## Engineering and product sequence

1. Review/check the revised public demo locally; deploy via an explicit Termius instruction, not unattended SSH.
2. Test the AI backend response quality privately using temporary controlled credentials, accounting controls, auth, abuse prevention and real cost limits.
3. Wire real AI to the homepage through the same-origin /pumpkin/api/chat proxy only after production safeguards; keep private secrets server-side.
4. Add user accounts, consent, memory controls, daily plans and optional reminders; notifications only when invited.
5. Extend optional real-time integrations (weather, places, events, deals) only with provider verification and no invented live data.
6. Build the mobile app in React Native + Expo, sharing API/logic with web.
7. Consider optional premium features and paid services only after meaningful daily use.

## Separate children's product

**DreamShield by Pumpkin** is a distinct app / project. Do not merge children's chat or monitoring capabilities into this adult prototype. Different privacy, compliance and safety requirements apply. Development must be parent-led, age-appropriate and security reviewed.
