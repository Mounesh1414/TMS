# TMS Deployment Guide

## 🚀 Deploying Without Exposing Source Code

This guide shows you how to deploy the TMS application **without** exposing your implementation details, source code, or configuration files.

## 🎯 Deployment Strategy

### What Gets Deployed:
✅ Built frontend files (HTML, CSS, JS bundles)
✅ Static assets (images, fonts)
✅ Production-ready code only

### What Stays Private:
❌ Source code (frontend/src, backend/)
❌ Configuration files (.env, vite.config.js, etc.)
❌ Documentation with implementation details
❌ node_modules
❌ Development files

## 📋 Deployment Options

### Option 1: Automated Deployment (Recommended)

Using GitHub Actions (already configured):

1. **Push to main branch** - Automatic deployment triggers
2. **GitHub Actions builds** the frontend
3. **Deploys to gh-pages branch** with only built files
4. **Source code stays private** in main branch

**Setup:**
```bash
# Enable GitHub Actions (if not already enabled)
# Go to: Repository Settings → Actions → Allow all actions

# The workflow will automatically deploy on push to main
git push origin main
```

### Option 2: Manual Deployment

Use the provided deployment script:

```powershell
# Run deployment script
.\deploy.ps1

# Follow the prompts to deploy to gh-pages branch
```

### Option 3: Deploy to Other Platforms

#### Netlify
```bash
cd frontend
npm install
npm run build
# Deploy the 'dist' folder via Netlify dashboard or CLI
netlify deploy --dir=dist --prod
```

#### Vercel
```bash
cd frontend
npm install
npm run build
# Deploy via Vercel CLI
vercel --prod
```

#### Traditional Hosting
```bash
# Build frontend
cd frontend
npm install
npm run build

# Upload the 'frontend/dist' folder to your hosting provider
# via FTP, SSH, or their upload interface
```

## 🔒 Security Best Practices

### 1. Keep Source Code Private

**GitHub Settings:**
- Go to: Repository → Settings → General
- Under "Danger Zone" → Change repository visibility
- Set to **Private** if you want complete privacy
- Or keep **Public** but deploy only to gh-pages branch

### 2. Environment Variables

For production API endpoint:

**GitHub Secrets:**
1. Go to: Repository → Settings → Secrets and variables → Actions
2. Add secret: `VITE_API_URL` = `https://your-backend-url.com/api`
3. The deployment workflow will use this automatically

**Local .env:**
```env
VITE_API_URL=https://your-production-api.com/api
```

### 3. Separate Backend Deployment

Deploy backend separately to:
- Heroku: `heroku create your-app-name`
- Railway: `railway up`
- Render: Upload via dashboard
- DigitalOcean, AWS, Azure, etc.

**Never expose** backend code in the same deployment!

## 📊 Deployment Structure

### Main Branch (Private)
```
TMS/
├── frontend/src/          # React source code (private)
├── backend/               # Node.js API (private)
├── .env                   # Environment vars (private)
├── *.config.js            # Config files (private)
└── Documentation files    # Private documentation
```

### gh-pages Branch (Public)
```
gh-pages/
├── index.html            # Built HTML
├── assets/
│   ├── index-[hash].js   # Minified, bundled JS
│   └── index-[hash].css  # Minified CSS
├── .nojekyll             # Disable Jekyll
└── README.md             # Public readme (no impl. details)
```

## 🌐 GitHub Pages Configuration

### Enable GitHub Pages:

1. Go to: **Repository → Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / **(root)**
4. Click **Save**

### Custom Domain (Optional):

1. Add CNAME file to deployment
2. Configure DNS:
   - Type: `CNAME`
   - Name: `@` or `www`
   - Value: `yourusername.github.io`
3. Add domain in GitHub Pages settings

## 🔐 Hide Implementation Documentation

The following files should NOT be accessible on the deployed site:

- `ADMIN_LOGIN_ENHANCED.md`
- `IMPLEMENTATION_COMPLETE.md`
- `SECURITY_FIXES.md`
- `TESTING_GUIDE.md`
- `USAGE_GUIDE.md`
- `FIXES_APPLIED.md`
- All `*.md` files except public README

**Solution:** These files are automatically excluded when deploying to gh-pages branch.

## ✅ Verification Checklist

After deployment, verify:

- [ ] Website loads correctly
- [ ] No source code visible in browser DevTools
- [ ] No `.env` files accessible
- [ ] No `/src` directory accessible
- [ ] No configuration files visible
- [ ] API endpoints working (if backend deployed)
- [ ] Only minified/bundled JS/CSS files present

## 🚨 Troubleshooting

### Issue: Source code visible on GitHub Pages
**Solution:** Make sure you're deploying to `gh-pages` branch, not `main`

### Issue: 404 errors on refresh
**Solution:** Add a `404.html` that redirects to `index.html` (for SPA routing)

### Issue: API calls failing
**Solution:** Update `VITE_API_URL` environment variable with production backend URL

### Issue: White screen after deployment
**Solution:** Check browser console for errors, ensure base URL is correct in vite.config.js

## 📞 Support

For deployment issues:
1. Check GitHub Actions logs
2. Verify environment variables
3. Test build locally: `npm run build && npm run preview`

---

**Remember:** Keep your main branch private or use gh-pages for deployment to hide implementation!
