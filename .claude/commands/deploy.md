Deploy all local changes to production and verify the deployment is live.

Follow these steps exactly, in order. Do not stop until sentrixi.com is confirmed live with the new version.

## Steps

1. **Read the current version** from `app/layout.tsx` (the `SITE_VERSION` constant). Increment the patch number (e.g. v2.2 → v2.3). Update the constant in `app/layout.tsx`.

2. **Stage all modified and new files** relevant to the site using `git add` (be specific — do not blindly `git add .` and include `.env`, secrets, or unrelated files). Check `git status` first to understand what has changed.

3. **Commit** with a clear message describing what changed. Always end the commit message with:
   `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`

4. **Push** to `origin main`. If the push is rejected (remote ahead), rebase and retry.

5. **Run `vercel deploy --prod`** and stream the output. Watch for:
   - `Aliased: https://sentrixi.com` — confirms production alias updated
   - `"readyState": "READY"` — confirms build succeeded
   - Any build errors — fix them immediately and redeploy

6. **Verify on GitHub** using `git log origin/main -1` to confirm the latest commit is on remote.

7. **Verify on Vercel** by calling the `list_deployments` MCP tool (projectId: `prj_N4NtWjzy7PBQKJkyg4ypggmIB6mn`, teamId: `team_PQQ2tD6f8BAmiNHEnd42C0On`) and confirming the top deployment matches the commit SHA and has `state: READY`.

8. **Report back** with:
   - New version number (e.g. `v2.3`)
   - Commit SHA (short)
   - Vercel deployment ID
   - Confirmation: `sentrixi.com is live`

## Rules

- If `vercel deploy --prod` fails with a build error: read the error, fix the code, re-run `npm run build` locally to confirm it passes, then redeploy.
- If the push is rejected: run `git rebase origin/main` and retry.
- Never use `--no-verify` or skip hooks.
- Never force-push to main.
- Never stop between steps — go all the way to confirmed live.
