# Prompt Shaper Weekly Semantic Review

Use the `bb-usage-skill-maintainer` skill in review-only automation mode.

Review recent, complete bb task episodes semantically to decide whether Prompt Shaper or its composer plugin needs one evidence-backed improvement. Prefer episodes since the last weekly Prompt Shaper review; otherwise review the last seven days. Sample older episodes only when needed to confirm that a pattern recurs. Ignore automation runs, smoke tests, report-only threads, and this review thread.

Judge whether each episode reached the user's intended result with the right scope, proof, and progress toward shipping. Do not use prompt length, word count, character count, or message count as a quality proxy.

Classify misses before recommending anything:

- Prompt-addressable context gap or stale context: candidate for the Prompt Shaper skill.
- Composer workflow, draft replacement, recovery, or helper-thread failure: candidate for plugin code.
- Agent nonadherence, reasoning error, false verification, tool/runtime failure, orchestration failure, or healthy preference change: do not pad the prompt; identify the correct owner.

This run is advisory and read-only. Do not edit files, notes, skills, plugin code, automations, or threads. Do not create follow-up threads. Recommend at most one change and require evidence from multiple independent episodes unless a single safety-critical regression is decisive.

Return one of:

- `No change recommended — <brief reason>.`
- A compact recommendation with `Target`, `Failure class`, `Recurring pattern`, `Proposed delta`, `Expected behavior`, `Uncertainty`, and `How to approve`.

Under `How to approve`, tell the user to start a fresh writable thread, invoke `/bb-usage-skill-maintainer`, and reference this review thread. The approved maintenance run must revalidate the finding, snapshot before edits, sync the bundled Prompt Shaper skill when guidance changes, run the relevant fresh-thread or plugin checks, and update only the existing concise Moss report.
