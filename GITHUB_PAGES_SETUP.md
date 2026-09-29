# GitHub Pages Setup Instructions

The Synaris Labs website is ready to deploy but requires one manual step to enable GitHub Pages.

## How to Enable GitHub Pages

1. Navigate to the repository settings:
   **https://github.com/islemyakoubi/synaris-labs/settings/pages**

2. Under **"Build and deployment"**:
   - Find the **"Source"** dropdown
   - Select **"GitHub Actions"** from the dropdown
   - Click **"Save"** (if there's a save button)

3. The GitHub Actions workflow will automatically run and deploy the site

4. After a few moments, refresh the page and you'll see:
   - A message saying "Your site is live at https://islemyakoubi.github.io/synaris-labs/"
   - The deployment status

## Expected Live URL

Once enabled, the website will be accessible at:
**https://islemyakoubi.github.io/synaris-labs/**

## Auto-play Demo

To view the demo with automatic playback, add the query parameter:
**https://islemyakoubi.github.io/synaris-labs/?autoplay=1**

## Troubleshooting

If the workflow fails after enabling Pages:
1. Go to https://github.com/islemyakoubi/synaris-labs/actions
2. Find the failed "Deploy to GitHub Pages" workflow
3. Click "Re-run jobs" → "Re-run all jobs"

The workflow should succeed once Pages is properly enabled.

## What This Enables

- Automatic deployment from the `main` branch
- Updates go live automatically when you push to `main`
- Static site hosting with HTTPS
- No build step required (pure HTML/CSS/JS)
