# GitHub Actions Permissions Fix

## Required GitHub Repository Settings

To enable GitHub Actions to deploy to gh-pages branch, you need to configure permissions:

### Step 1: Enable GitHub Actions Permissions

1. Go to your repository: **https://github.com/Mounesh1414/TMS**
2. Click on **Settings** (top menu)
3. In the left sidebar, click on **Actions** → **General**
4. Scroll down to **Workflow permissions**
5. Select **"Read and write permissions"**
6. Check ✅ **"Allow GitHub Actions to create and approve pull requests"**
7. Click **Save**

### Step 2: Enable GitHub Pages

1. Still in **Settings**, click on **Pages** (left sidebar)
2. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / **(root)**
3. Click **Save**

### Step 3: Trigger Deployment

After changing the settings, the next push will deploy successfully:

```bash
git push origin main
```

Or manually trigger the workflow:
1. Go to **Actions** tab
2. Click on **Deploy Frontend Only** workflow
3. Click **Run workflow** button
4. Select **main** branch
5. Click **Run workflow**

## What This Fixes

✅ **Permissions Error** - GitHub Actions can now push to gh-pages branch
✅ **Automatic Deployment** - Push to main triggers deployment
✅ **Separate Branches** - main (source code) and gh-pages (built files)

## Your Site URL

After successful deployment, your site will be live at:
**https://mounesh1414.github.io/TMS/**

## Verification

Check deployment status:
1. Go to **Actions** tab
2. Click on the latest workflow run
3. Verify all steps completed successfully ✅
4. Check **Deploy to GitHub Pages** step

Then visit your site URL to verify it's working!
