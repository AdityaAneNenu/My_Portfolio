'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '', email: '', subject: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Message sent. I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.error || 'Failed to send');
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage('Failed to send. Email me directly at adityaduggi0@gmail.com');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => { setSubmitStatus('idle'); setStatusMessage(''); }, 6000);
    }
  };

  const inputClass = `w-full bg-transparent border-b border-border py-4 text-fg text-sm
    placeholder:text-dim focus:outline-none focus:border-accent transition-colors duration-300`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus !== 'idle' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm p-4 border ${submitStatus === 'success' ? 'text-green-500 border-green-500/30' : 'text-red-500 border-red-500/30'}`}
        >
          {statusMessage}
        </motion.p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <input
          type="text" name="name" value={formData.name} onChange={handleChange}
          placeholder="YOUR NAME" required disabled={isSubmitting}
          className={`${inputClass} tracking-widest uppercase`} aria-label="Your name"
        />
        <input
          type="email" name="email" value={formData.email} onChange={handleChange}
          placeholder="EMAIL ADDRESS" required disabled={isSubmitting}
          className={`${inputClass} tracking-widest uppercase`} aria-label="Your email"
        />
      </div>
      <input
        type="text" name="subject" value={formData.subject} onChange={handleChange}
        placeholder="SUBJECT" required disabled={isSubmitting}
        className={`${inputClass} tracking-widest uppercase`} aria-label="Subject"
      />
      <textarea
        name="message" value={formData.message} onChange={handleChange}
        placeholder="MESSAGE" rows={5} required disabled={isSubmitting}
        className={`${inputClass} resize-none tracking-widest uppercase`} aria-label="Your message"
      />

      <MagneticButton className="w-full sm:w-auto pt-4">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto text-sm font-semibold text-bg bg-accent border border-accent px-10 py-4
            hover:bg-fg hover:border-fg transition-all duration-300 cursor-pointer tracking-widest uppercase"
          whileTap={{ scale: 0.97 }}
        >
          {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
        </motion.button>
      </MagneticButton>
    </form>
  );
}
