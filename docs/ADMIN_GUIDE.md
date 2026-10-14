# Admin dashboard ("Your studio")

She goes to **yoursite.com/admin** and logs in with a password. No GitHub account needed.

## One-time setup in Vercel (Sam)
Project → **Settings → Environment Variables**, add for Production:

| Name | Value |
|---|---|
| `ADMIN_PASSWORD` | the password you give her |
| `ADMIN_SECRET` | any long random string (e.g. run `openssl rand -hex 32`) |
| `GITHUB_TOKEN` | GitHub → Settings → Developer settings → Fine-grained tokens. Repository: `social-media-manager-portfolio` only. Permission: **Contents: Read and write**. |

Then **Storage → Create → Blob**, connect it to the project. This adds `BLOB_READ_WRITE_TOKEN` automatically. Free tier: 1 GB storage.

Redeploy once after adding these.

Also check **Settings → Build & Output**: Output Directory must be the default (not `out`). The site is no longer a static export because the dashboard needs server routes.

## How it works
- Login is checked on the server; a signed cookie keeps her logged in for 7 days.
- Uploads go straight from her browser to Vercel Blob (no size issue up to 500 MB).
- **Publish changes** commits the updated list (`web/content/*.json`) to `claude/admiring-johnson-0qnmbu` using the server's GitHub token. Vercel redeploys; the site is live in about 2 minutes.
- Nothing secret is in the page. Repo and branch are set in `web/lib/admin.ts`.

## For her
1. **Videos → + Add video.** Title, client, category, choose the video (shape is detected automatically), optional cover image. Click **Done**.
2. Use ↑ ↓ to reorder, **Edit**, **Delete**.
3. Click **Publish changes**. Nothing goes live until she does.
- Categories become tabs on the site. Pick existing ones from the suggestions so spelling stays the same.
- **Voice clips** work the same way (length is detected automatically).
- **Contact details**: email, booking link, social links.
- Only add numbers she can prove.
