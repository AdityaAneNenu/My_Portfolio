# Email Setup Guide for Contact Form

This guide will help you set up email functionality to receive contact form submissions directly to your email.

## Method 1: Nodemailer with Gmail (Recommended)

This method sends emails directly from your server using Gmail SMTP.

### Step 1: Enable 2-Factor Authentication on Gmail

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to "Security"
3. Enable "2-Step Verification" if not already enabled

### Step 2: Generate App Password

1. In Google Account Security settings
2. Go to "2-Step Verification"
3. Scroll down to "App passwords"
4. Click "Generate app password"
5. Select "Mail" as the app
6. Copy the generated 16-character password

### Step 3: Update Environment Variables

Update the `.env.local` file with your Gmail credentials:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### Step 4: Test the Form

1. Restart your development server: `npm run dev`
2. Fill out the contact form on your website
3. Check your Gmail inbox for the message

## Method 2: Other Email Providers

### For Outlook/Hotmail:

```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

Update the API route to use Outlook SMTP:

```javascript
const transporter = nodemailer.createTransporter({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

### For Custom SMTP:

```env
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-password
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
```

## Features Included

✅ **Direct Email Sending** - No redirects, emails sent from your server
✅ **Beautiful HTML Emails** - Formatted with your branding colors
✅ **Form Validation** - Client and server-side validation
✅ **Error Handling** - Graceful error messages
✅ **Reply-To Setup** - Easy to reply to the sender
✅ **Spam Protection** - Server-side processing

## Troubleshooting

- **"Invalid credentials"**: Check your email and app password
- **"Connection refused"**: Verify SMTP settings and firewall
- **"Authentication failed"**: Ensure 2FA is enabled and app password is correct
- **No email received**: Check spam folder and email address

## Security Notes

- Never commit your `.env.local` file to version control
- Use app passwords instead of your main email password
- Consider using environment variables in production
- The API route validates all inputs before sending

## Production Deployment

For production, set these environment variables in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Railway: Project → Variables
