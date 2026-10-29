# Admin dashboard ("Your studio")

She goes to **yoursite.com/admin** and logs in with a password. No GitHub account needed.

## One-time setup in Vercel (Sam)
Project → **Settings → Environment Variables**, add for Production:

| Name | Value |
|---|---|
| `ADMIN_USERNAME` | her login name |
| `ADMIN_PASSWORD_HASH` | scrypt hash of her password (never the password itself). Make one with `node -e` in `web/lib/admin.ts` comments, or ask Sam |
| `ADMIN_SECRET` | random string, at least 32 characters (`openssl rand -base64 32`) |
| `GITHUB_TOKEN` | GitHub → Settings → Developer settings → Fine-grained tokens. Repository: `social-media-manager-portfolio` only. Permission: **Contents: Read and write**. |

Then **Storage → Create → Blob**, connect it to the project. This adds `BLOB_READ_WRITE_TOKEN` automatically. Free tier: 1 GB storage.

Redeploy once after adding these.

Also check **Settings → Build & Output**: Output Directory must be the default (not `out`). The site is no longer a static export because the dashboard needs server routes.

## How it works
- Username and password are checked on the server against a scrypt hash; the password is stored nowhere. 5 wrong tries lock that connection out for 15 minutes. A signed, httpOnly, same-site cookie keeps her logged in for 24 hours. Requests from other websites are rejected, and /admin can't be embedded, cached or indexed.
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

## Google Drive (her media storage)
New videos and voice clips live in her shared Drive folder (https://drive.google.com/drive/folders/1Y3nXCbL5Ay4IqqxzuLualofPN5CspMgi) and play from there. Nothing is copied to the website. Videos open in Google Drive's own player inside the site's video window (it converts any format, including iPhone .MOV); covers come from Drive thumbnails; voice clips play the Drive file directly. All videos play from Drive (moved there on 29/10/2026 because 860 MB of media in every Vercel deployment pushed deployment storage to ~13 GB). Covers and voice clips stay on the site; they total under 7 MB.

One-time setup:
1. https://console.cloud.google.com → create a project (any name).
2. **APIs & Services → Library → Google Drive API → Enable.**
3. **APIs & Services → Credentials → Create credentials → API key.** Restrict it: API restrictions → Google Drive API only.
4. In Vercel, add `GOOGLE_API_KEY` = that key (optionally `DRIVE_FOLDER_ID` for a different folder). Redeploy.
5. Keep the folder (and the files in it) shared as **Anyone with the link → Viewer**. If a file is made private, it stops playing on the site.

Her steps: drop a video or MP3 into the folder (subfolders fine) → dashboard → Videos or Voice clips → **From Google Drive** → **Add** (title, shape and cover are filled in) → add client and category → **Done** → **Publish changes**. Files already on the site show "On the site".

Trade-off: Drive-hosted videos start slower and buffer more on weak connections than the site's own streams, and Drive may pause very popular files for a while. Vercel Blob is now only needed for the "Upload" button (uploading straight from her phone).
