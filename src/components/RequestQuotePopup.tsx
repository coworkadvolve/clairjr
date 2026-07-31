'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Phone, User, Building2, MessageSquare } from 'lucide-react';
import { useSiteSettings } from '@/context/SiteSettingsContext';

interface RequestQuotePopupProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export function RequestQuotePopup({ isOpen, onClose, productName }: RequestQuotePopupProps) {
  const siteSettings = useSiteSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    product: productName || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (productName) {
      setFormData(prev => ({ ...prev, product: productName }));
    }
  }, [productName]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset form when closing
      if (submitStatus === 'success') {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          product: productName || ''
        });
        setSubmitStatus('idle');
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, submitStatus, productName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('phone', formData.phone);
      if (formData.company) formDataToSubmit.append('company', formData.company);
      if (formData.product) formDataToSubmit.append('product', formData.product);
      if (formData.message) formDataToSubmit.append('message', formData.message);
      formDataToSubmit.append('_subject', `Quote Request${formData.product ? ` - ${formData.product}` : ''}`);
      formDataToSubmit.append('_template', 'box');
      formDataToSubmit.append('_captcha', 'false');
      formDataToSubmit.append('_autoresponse', 'Thank you for your quote request. We have received your inquiry and our sales team will contact you shortly with pricing and availability information.');

      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(siteSettings.formRecipientEmail)}`,
        {
          method: 'POST',
          body: formDataToSubmit,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      if (result.success === false) {
        throw new Error('Form submission failed');
      }

      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting quote request:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Request a Quote</h2>
            {productName && (
              <p className="text-sm text-neutral-600 mt-1">Product: {productName}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={24} className="text-neutral-600" />
          </button>
        </div>

        {/* Form */}
        {submitStatus === 'success' ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Thank You!</h3>
            <p className="text-neutral-600 mb-6">
              We've received your quote request. Our team will contact you shortly.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-brand-orange text-white font-medium rounded hover:bg-brand-orange-dark transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  <User size={16} className="inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                  placeholder="+91 1234567890"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
                  <Building2 size={16} className="inline mr-2" />
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                  placeholder="Company Inc."
                />
              </div>
            </div>

            {/* Product (if not pre-filled) */}
            {!productName && (
              <div>
                <label htmlFor="product" className="block text-sm font-medium text-neutral-700 mb-2">
                  Product of Interest
                </label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
                  placeholder="Product name"
                />
              </div>
            )}

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                <MessageSquare size={16} className="inline mr-2" />
                Additional Details (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us about your requirements, quantity, or any specific needs..."
              />
            </div>

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                There was an error submitting your request. Please try again or contact us directly.
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-neutral-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-brand-orange text-white font-medium rounded-lg hover:bg-brand-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}



