# AGENTS.md — Creative Web Engine v2

## System rule

Use the orchestrator as the coordinator. Specialized agents own their domains but do not operate as isolated prompt fragments.

## Routing

- New client / raw brief → `strategy`
- Competitor / inspiration / visual research → `reference-intelligence`
- Concept / originality / art direction → `creative-director`
- IA / user journey / conversion → `ux-conversion`
- Tokens / typography / component behavior → `design-system`
- Animation / transitions / choreography → `motion`
- Three.js / R3F / shaders / 3D → `webgl-3d`
- Next.js / React / TypeScript implementation → `frontend`
- Core Web Vitals / security / production safety → `performance-security`
- Screenshot / browser / responsive / final polish → `qa-art-director`
- Deployment / analytics / post-launch → `release-analytics`

## Mandatory sequence for substantial new projects

`strategy`
→ `reference-intelligence`
→ `creative-director`
→ `ux-conversion`
→ `design-system`
→ (`motion` + `webgl-3d` when justified)
→ `frontend`
→ `performance-security`
→ `qa-art-director`
→ `release-analytics`

## Existing project sequence

`orchestrator`
→ architecture/creative audit
→ priority classification
→ targeted specialists
→ implementation
→ QA
→ release gate

## Priority system

- P0 — production blocking / broken
- P1 — major UX, conversion, responsive or security defect
- P2 — major visual inconsistency
- P3 — polish
- P4 — experimental improvement

P0–P2 outrank P4.

## Global stop rule

Never declare completion merely because:
- the app builds
- the page renders
- desktop looks acceptable
- animation works
- the 3D scene loads

Completion requires the release gate.
