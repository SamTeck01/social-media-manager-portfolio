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

## Video streaming
The 14 videos added by Sam play as adaptive streams (HLS, `web/public/media/hls/`): they start at a light quality and climb to full quality (up to the original 1080p) as the connection allows. Videos she uploads through the dashboard play as a normal MP4 from Vercel Blob; send long ones to Sam to convert into a stream (`hls.sh` in the session notes).

## Google Drive (her upload folder)
The dashboard reads her shared folder (https://drive.google.com/drive/folders/1Y3nXCbL5Ay4IqqxzuLualofPN5CspMgi) and copies files she picks into Vercel Blob. The site never plays from Drive itself (Drive is slow and limits viewers).

One-time setup:
1. https://console.cloud.google.com → create a project (any name).
2. **APIs & Services → Library → Google Drive API → Enable.**
3. **APIs & Services → Credentials → Create credentials → API key.** Restrict it: API restrictions → Google Drive API only.
4. In Vercel, add `GOOGLE_API_KEY` = that key (and optionally `DRIVE_FOLDER_ID` to use a different folder). Redeploy.
5. Keep the folder shared as **Anyone with the link → Viewer**.

How she uses it: drop a video or MP3 into the folder (subfolders are fine) → dashboard → Videos (or Voice clips) → **From Google Drive** → **Add** → fill in client and category → **Done** → **Publish changes**. Files already on the site show "On the site". iPhone .MOV files may not play on Android; export as MP4 first.

Limits: a Drive import can take up to 5 minutes (Vercel function limit); files over about 1 GB may time out. Imported videos play as a single MP4, not an adaptive stream; send important long videos to Sam to convert.
