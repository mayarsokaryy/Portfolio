# 🚀 Deployment Guide

Complete guide to deploy your portfolio with contact form functionality.

## 📋 Architecture

- **Frontend**: Next.js static site → Firebase Hosting (Free)
- **Backend**: Node.js Express API → Render/Railway/Vercel (Free tier)
- **Email Service**: Brevo API

## 🎯 Part 1: Deploy Backend API

### Option A: Render (Recommended)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     ```
     Name: portfolio-backend
     Root Directory: backend
     Environment: Node
     Build Command: npm install
     Start Command: npm start
     ```

3. **Add Environment Variables**
   Go to "Environment" tab and add:
   ```
   BREVO_API_KEY=your_brevo_api_key_here
   FROM_NAME=Mayar Elsokary
   FROM_EMAIL=a27971001@smtp-brevo.com
   TO_NAME=Mayar Elsokary
   TO_EMAIL=mayarsokary@gmail.com
   ENABLE_AUTO_REPLY=true
   FRONTEND_URL=https://your-username.firebaseapp.com
   PORT=3001
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy your backend URL (e.g., `https://portfolio-backend-xxxx.onrender.com`)

### Option B: Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select repository → Choose `backend` folder
4. Add all environment variables from above
5. Deploy and copy the URL

### Option C: Vercel (Serverless)

```bash
cd backend
npm install -g vercel
vercel
```

Follow prompts and copy the deployment URL.

## 🎯 Part 2: Update Frontend Config

1. **Update `.env.local`**
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```

2. **Update `.firebaserc`**
   Replace `your-project-id` with your Firebase project ID

## 🎯 Part 3: Deploy Frontend to Firebase

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Create Firebase Project

- Go to [console.firebase.google.com](https://console.firebase.google.com)
- Click "Add Project"
- Enter project name (e.g., `portfolio-mayar`)
- Disable Google Analytics (optional)
- Create project

### 4. Initialize Firebase

```bash
firebase init
```

Select:
- ✅ Hosting
- Choose existing project or create new one
- Public directory: `out`
- Single-page app: `Yes`
- GitHub deploys: `No`

### 5. Build & Deploy

```bash
# Build the Next.js static site
npm run build

# Deploy to Firebase
firebase deploy
```

Your site will be live at: `https://your-project-id.web.app`

## 🔄 Update Backend CORS

After deploying, update backend environment variable:

```env
FRONTEND_URL=https://your-project-id.web.app
```

Redeploy backend for changes to take effect.

## ✅ Testing

1. **Test Backend Health**
   ```bash
   curl https://your-backend-url.onrender.com/
   ```

2. **Test Contact Form**
   - Visit your Firebase hosted site
   - Scroll to contact section
   - Fill out and submit the form
   - Check your email (mayarsokary@gmail.com)

## 📝 Future Updates

### Frontend Updates

```bash
# 1. Make changes to your code
# 2. Build
npm run build

# 3. Deploy
firebase deploy
```

### Backend Updates

Just push to GitHub - Render/Railway will auto-deploy (if enabled)

Or manually:
```bash
cd backend
# Make changes
git add .
git commit -m "Update backend"
git push
```

## 🎨 Customization

### Email Templates

Edit email templates in `backend/server.js`:
- `buildMainEmailHTML()` - Your notification email
- `buildAutoReplyHTML()` - User's auto-reply

### Form Fields

Edit `components/Contact.tsx` to add/modify form fields.

### Styling

Update form styles in `app/globals.css` and `components/Contact.tsx`.

## 🔒 Security

- ✅ Backend `.env` contains sensitive keys (never commit!)
- ✅ Frontend `.env.local` only has public API URL
- ✅ CORS is configured in backend
- ✅ Input validation on both client and server
- ✅ Email sanitization prevents XSS

## 💰 Cost Estimate

- **Firebase Hosting**: FREE (10 GB storage, 360 MB/day bandwidth)
- **Render Free Tier**: FREE (750 hours/month)
- **Brevo Free Tier**: FREE (300 emails/day)

**Total: $0/month** 🎉

## 🆘 Troubleshooting

### Contact form not working

1. Check backend is running: `curl https://your-backend-url.onrender.com/`
2. Check browser console for errors
3. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
4. Check CORS settings in backend

### No emails received

1. Verify Brevo API key is correct
2. Check `TO_EMAIL` in backend `.env`
3. Check spam folder
4. Test Brevo directly: [app.brevo.com](https://app.brevo.com)

### Build errors

```bash
# Clean build cache
rm -rf .next out node_modules
npm install
npm run build
```

### Firebase deployment fails

```bash
# Ensure you're logged in
firebase login

# Ensure project is selected
firebase use --add

# Try deploying again
firebase deploy --only hosting
```

## 📚 Additional Resources

- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Render Docs](https://render.com/docs)
- [Brevo API Docs](https://developers.brevo.com/)

## 🎯 Quick Commands Cheat Sheet

```bash
# Backend
cd backend
npm install          # Install dependencies
npm start            # Start server locally

# Frontend
npm run dev          # Local development
npm run build        # Build for production
firebase deploy      # Deploy to Firebase

# Full deployment flow
cd backend && git push                    # Deploy backend (auto-deploy)
cd .. && npm run build && firebase deploy # Deploy frontend
```
