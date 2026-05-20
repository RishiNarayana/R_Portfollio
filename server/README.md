# Email Configuration Guide

## Setup Instructions

### 1. Generate Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/apppasswords)
2. Make sure you have **2-Step Verification enabled** (if not, enable it first)
3. Select **Mail** as the app and **Windows Computer** as the device
4. Google will generate a 16-character app password
5. Copy this password

### 2. Configure .env File

Edit `server/.env` and replace `your_16_digit_app_password_here` with the password from step 1:

```
EMAIL_USER=rishinarayana2805@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
PORT=5000
```

### 3. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install
```

### 4. Start the Backend Server

```bash
# From the server directory
npm run dev
```

The server will run on `http://localhost:5000`

### 5. Start Your Frontend

In a new terminal:

```bash
# From the project root
npm run dev
```

## How It Works

1. User fills out the contact form with their name, email, and message
2. Frontend sends the form data to the backend via POST request to `/api/send-email`
3. Backend uses Nodemailer to send two emails:
   - **Admin email**: Sent to your Gmail (rishinarayana2805@gmail.com) with the user's details
   - **Reply email**: Sent to the user's email confirming receipt of their message
4. User sees success/error feedback in the form

## Troubleshooting

- **"Network error" message**: Make sure the backend server is running on localhost:5000
- **"Failed to send email"**: Check your .env file has the correct app password (16 characters, with spaces)
- **Gmail login errors**: Ensure 2-Step Verification is enabled on your Gmail account
- **Check server logs**: Look at the terminal where you ran `npm run dev` for error messages

## Optional: Deploy to Production

For production, you'll need to:
1. Update the API endpoint in ContactSection.tsx from `http://localhost:5000` to your deployed backend URL
2. Deploy the backend server (Heroku, Vercel, Azure, etc.)
3. Update CORS settings in `server/index.js` to allow your production domain
