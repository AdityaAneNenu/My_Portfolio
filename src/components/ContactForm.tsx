'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send email using our API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Message sent successfully! I\'ll get back to you soon.');

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(result.error || 'Failed to send email');
      }

    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
      setStatusMessage('Failed to send message. Please try again or contact me directly at adityaduggi0@gmail.com');
    } finally {
      setIsSubmitting(false);

      // Clear status message after 6 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setStatusMessage('');
      }, 6000);
    }
  };

  return (
    <div className={`futuristic-card ${className}`}>
      <h3 className="text-2xl font-display font-bold text-white mb-6">Send a Message</h3>
      
      {/* Status Message */}
      {submitStatus !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
            submitStatus === 'success' 
              ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
              : 'bg-red-500/20 border border-red-500/30 text-red-400'
          }`}
        >
          {submitStatus === 'success' ? (
            <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <FaExclamationTriangle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="text-sm">{statusMessage}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Subject"
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            rows={5}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`futuristic-button w-full flex items-center justify-center space-x-2 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          <FaRocket className={`w-5 h-5 ${isSubmitting ? 'animate-spin' : ''}`} />
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
        </motion.button>
      </form>
    </div>
  );
}
