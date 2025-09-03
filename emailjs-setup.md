# EmailJS Setup Guide

To enable direct email sending from your contact form, follow these steps:

## 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account

## 2. Create Email Service
- In EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose Gmail (or your preferred email provider)
- Connect your email account

## 3. Create Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use this template:

```
Subject: Contact Form: {{from_name}} from {{company}}

From: {{from_name}}
Email: {{from_email}}
Company: {{company}}

Message:
{{message}}
```

## 4. Update contact.html
Replace these placeholders in contact.html:
- `YOUR_PUBLIC_KEY` - Your EmailJS public key
- `YOUR_SERVICE_ID` - Your email service ID
- `YOUR_TEMPLATE_ID` - Your email template ID

## 5. Test the Form
- Open contact.html in browser
- Fill out and submit the form
- Check your email for the message

## Free Tier Limits
- 200 emails per month
- EmailJS branding in emails
- Upgrade for more features