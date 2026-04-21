# Audio narration for Mulling posts

Every blog post at `/mulling/*` gets a ~3-minute audio version at the top. It's generated from the post's text using **ElevenLabs**, ideally voiced in Emma's own cloned voice. For readers who'd rather listen than scroll.

## Naming convention

Each post's audio file lives in this folder and matches the post's slug:

```
mulling/pain-isnt-damage.html  →  audio/pain-isnt-damage.mp3
mulling/first-session.html     →  audio/first-session.mp3
```

## Generation flow (ElevenLabs)

1. **Voice choice.** Either:
   - Use Emma's cloned voice (requires ElevenLabs Starter plan + a 30-second clean voice sample from Emma. Best result.)
   - Use a stock ElevenLabs voice — the warm British female voices are closest to Emma's brand. *Charlotte* and *Jessica* (Eleven v3) are decent defaults.
2. **Prepare the script.** Copy the post's body text into a plain-text file. Strip out the image captions and the CTA card at the bottom. Re-read it out loud once — if a sentence trips you up, reword it. Text-to-speech is surprisingly honest about awkward phrasing.
3. **Generate.** Feed the text into ElevenLabs (web UI or API). Use the "Eleven Multilingual v2" model for the best prosody. Export MP3 at 128 kbps (smaller than 192 kbps, good enough for speech).
4. **Name and drop.** Save as `<slug>.mp3` in this folder. File size should be ~2.5–3.5 MB for a three-minute post.
5. **Confirm.** Load the post in the browser — the audio player at the top of the article picks up the file automatically as long as the filename matches the post slug.

## Target length

- Aim for **3 minutes** per post.
- Natural speech at ~150–160 words per minute means a 3-min audio = ~450–480 words.
- Most Mulling posts are 800–1,500 words, so the audio is usually a **shortened read-aloud** — trim down into a "best bits" pass that still feels complete.
- Alternatively, read the full post and accept 5–7 min audio. Less snackable but more honest.

## If there's no audio yet

Ship the post without it. The audio player element in the HTML will show broken controls — that's not great. Options:

- Remove the `<div class="audio-player">` block from the post entirely until the audio is ready.
- Or leave it and accept the broken state for a day while the audio gets generated.

Cleaner: keep the post unpublished until audio exists, so every published post has both.

## Automation idea (later)

A small Node/Python script that:

1. Reads each `mulling/*.html` file.
2. Extracts the article body text.
3. Calls the ElevenLabs API with the chosen voice.
4. Saves the MP3 to `audio/<slug>.mp3`.

~30 lines of code. Worth building once we've shipped 3–4 posts manually and know the process holds.

## Credentials

ElevenLabs API key goes in `.env` at project root as `ELEVENLABS_API_KEY`. Do not commit.
