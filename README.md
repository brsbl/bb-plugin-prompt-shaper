# Prompt Shaper

Prompt Shaper adds **Enhance prompt** to the bb composer. It turns the current rough draft into a concise, context-complete prompt, puts the result back into the same composer, and leaves sending to you.

## How It Works

- Click **Enhance prompt** after writing a rough request.
- A hidden, read-only bb thread applies the bundled Prompt Shaper skill.
- In an existing thread, the worker inherits that thread's semantic context. If session cloning is unavailable, it explicitly inspects the source thread.
- If the draft is unchanged, the enhanced prompt replaces it and can be undone.
- If you kept typing or the worker made an assumption, you review the result before replacing anything.

Attachments stay attached. The plugin never sends the prompt or performs the drafted task.

## Use It

1. Write a rough prompt in any bb composer.
2. Click **Enhance prompt**.
3. Review the shaped draft, then send normally.

## Release Requirement

This source targets bb Plugin SDK `0.4.0`, where `useComposer()` exposes the shared draft through `text` and `setText()`. It is ready to build and install with that bb release; the current public `0.0.30` app cannot load it.

```bash
npm test
npm run typecheck
bb plugin build
bb plugin install .
```

## Maintenance

The personal skill at `~/.bb/skills/prompt-shaper/SKILL.md` is the source of truth. The bundled copy must match it exactly so the composer action and `/prompt-shaper` use the same transformation.

The weekly bb automation reviews semantic task episodes and proposes at most one improvement. It is read-only: a person must approve a recommendation before a fresh maintenance thread can change the skill or plugin.

```bash
npm run skill:snapshot
# Edit the approved personal skill.
npm run skill:sync
npm run skill:check
```

Use `npm run skill:restore -- <snapshot-path>` to restore both copies from a saved version. Plugin behavior changes are made as normal versioned, tested releases; the automation never rewrites plugin code.
