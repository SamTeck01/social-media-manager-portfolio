# Admin dashboard: adding your own work

Go to **yoursite.com/admin**.

## One-time setup (done by Sam)
1. She needs a free GitHub account. Add it as a collaborator on `samteck01/social-media-manager-portfolio` (Settings → Collaborators, Write access).
2. On her account, create a token: GitHub → Settings → Developer settings → Fine-grained tokens → New token. Repository: this repo only. Permission: **Contents: Read and write**. Copy the token.
3. At /admin, choose **Sign In Using Access Token** and paste it. The browser remembers it.

("Sign In with GitHub" needs an extra OAuth helper, for example the free sveltia-cms-auth Cloudflare Worker. Optional; the token is enough.)

## Adding a video
1. **My work → Videos → Add Video**.
2. Title, client, category, video file (MP4, under 25 MB; export at 720p), shape. A cover image is optional.
3. **Save**. The site updates in about 2 minutes.

Categories become the tabs on the site. Spell them the same each time (e.g. "UGC", not "ugc" one time and "UGC" the next).

## Adding a voice clip
**My work → Voice clips → Add**: title, style (becomes a tab), MP3 file.

## Contact details
**Contact details**: public email, booking link, social links. These appear on the contact section.

## Notes
- Each save commits to `claude/admiring-johnson-0qnmbu`, the branch Vercel deploys.
- Big phone videos (over ~50 MB) will fail. Compress first (CapCut export 720p, or handbrake.fr).
- Only add numbers you can prove. No made-up metrics or testimonials.
