# Portfolio Backend - Contact Form API

Node.js + Express backend for portfolio contact form using **Brevo SMTP** with Nodemailer.

## 🚀 Features

- ✉️ Send contact form emails using Brevo SMTP
- 🤖 Automatic reply to users
- 🎨 Beautiful HTML email templates
- 🔒 CORS enabled for frontend communication
- 📊 Client info tracking (IP, user agent, timestamp)

## 📦 Installation

```bash
cd backend
npm install
```

## ⚙️ Configuration

The `.env` file is already configured with your Brevo SMTP credentials:

```env
SMTP_USER=a27971001@smtp-brevo.com
SMTP_PASS=your_brevo_smtp_key_here
FROM_NAME=Mayar Elsokary
FROM_EMAIL=a27971001@smtp-brevo.com
TO_EMAIL=mayarsokary@gmail.com
ENABLE_AUTO_REPLY=true
FRONTEND_URL=http://localhost:3000
PORT=3001
```

**SMTP Settings:**
- **Host:** smtp-relay.brevo.com
- **Port:** 587
- **Security:** STARTTLS
- **Authentication:** Username + Password (SMTP API key)

## 🏃 Running Locally

```bash
npm start
```

Server will start on `http://localhost:3001`

## 🌐 Deployment Options

### Option 1: Render (Recommended - Free)

1. Create account at [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add environment variables from `.env` file
6. Deploy!

### Option 2: Railway (Free Tier)

1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables
5. Set root directory to `backend`
6. Deploy!

### Option 3: Vercel (Serverless)

Create `vercel.json` in backend folder:

```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "/server.js" }]
}
```

Then:
```bash
cd backend
vercel
```

## 🔗 Update Frontend

After deploying, update `.env.local` in the frontend:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

Then rebuild and redeploy your frontend to Firebase.

## 📧 Testing

Send a POST request to `/api/contact`:

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message"
  }'
```

## 🛠️ API Endpoints

### GET /
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "message": "Portfolio Contact API - Brevo Integration",
  "timestamp": "2026-02-16T..."
}
```

### POST /api/contact
Submit contact form

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "subject": "string (required)",
  "message": "string (required)"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! I'll get back to you within 24-48 hours.",
  "messageId": "...",
  "autoReplyId": "..."
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🔒 Security Notes

- Never commit `.env` file to Git (already in `.gitignore`)
- Keep your Brevo API key secret
- Update `FRONTEND_URL` to your actual frontend domain when deployed
- Consider adding rate limiting for production

## 📝 Email Templates

Both the main email (to you) and auto-reply (to user) use beautiful HTML templates with:
- Gradient headers
- Responsive design
- Proper formatting
- Professional styling

Templates can be customized in `server.js`:
- `buildMainEmailHTML()` - Email you receive
- `buildAutoReplyHTML()` - Auto-reply to user
