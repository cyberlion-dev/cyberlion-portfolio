# EmailJS Setup Guide

Your contact form is now integrated with EmailJS! Follow these steps to complete the setup.

## 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (supports 200 emails/month)

## 2. Add an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Copy your **Service ID** (you'll need this later)

## 3. Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
From: {{from_name}} <{{from_email}}>
Subject: New Portfolio Contact from {{from_name}}

Hello {{to_name}},

You have a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent via your portfolio contact form.
```

4. Save the template and copy your **Template ID**

## 4. Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called User ID)
3. Copy this value

## 5. Update Your Contact Form Configuration

Open `components/sections/Contact.tsx` and replace these values (around line 18):

```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',    // Replace with your Service ID
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',  // Replace with your Template ID
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',    // Replace with your Public Key
};
```

## 6. Test Your Form

1. Run your dev server: `npm run dev`
2. Navigate to the contact section
3. Fill out the form (don't forget to answer the emoji captcha!)
4. Submit and check your email

## Security Features Included

✅ **Honeypot Field**: Hidden "website" field that catches bots
✅ **Creative Captcha**: Emoji-based human verification
✅ **Client-side Validation**: Required fields and email format
✅ **Loading States**: Prevents double submissions
✅ **Success/Error Feedback**: Clear user feedback

## Spam Protection Details

### Honeypot
- A hidden field called "website" is invisible to humans but may be filled by bots
- If this field has any value, the form submission is silently rejected

### Creative Captcha
- Users must select the correct emoji (🎨 Palette) before submitting
- Fun and engaging alternative to traditional captchas
- Submit button is disabled until an answer is selected

## Template Variables

Make sure your EmailJS template includes these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - The message content
- `{{to_name}}` - Your name (hardcoded as "Jordan Boyce")

## Troubleshooting

**Form not sending?**
- Check browser console for errors
- Verify all three config values are correct
- Ensure your EmailJS service is connected and active
- Check your EmailJS dashboard for usage limits

**Getting error messages?**
- Verify your template ID matches exactly
- Check that template variables match the code
- Ensure your Public Key is correct (not the Private Key)

## Optional: Environment Variables

For better security, you can move these values to environment variables:

1. Create `.env.local` in your project root:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

2. Update `Contact.tsx`:
```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
};
```

3. Add `.env.local` to your `.gitignore` (already done by Next.js)

## Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Guide](https://www.emailjs.com/docs/sdk/installation/)
