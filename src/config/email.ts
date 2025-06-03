// EmailJS Configuration
// You'll need to set up an EmailJS account and replace these values

export const emailConfig = {
  // Get these from your EmailJS dashboard
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_portfolio',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_contact',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  
  // Your email address where messages will be sent
  toEmail: 'adityaduggi0@gmail.com',
};

// Template parameters structure for EmailJS
export interface EmailTemplateParams {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  to_email: string;
  reply_to?: string;
}
