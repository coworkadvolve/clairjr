'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Building2 } from 'lucide-react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { dataService, ContactSubmission } from '../lib/data';
import { useSiteSettings } from '@/context/SiteSettingsContext';

export function ContactPage() {
  const siteSettings = useSiteSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiry_type: 'General',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const submission: ContactSubmission = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        inquiry_type: formData.inquiry_type,
        message: formData.message
      };

      const result = await dataService.submitContact(submission, siteSettings.formRecipientEmail);

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        inquiry_type: 'General',
        message: ''
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
          <p className="text-xl text-neutral-300 max-w-3xl">
            Reach us
          </p>
        </div>
      </section>

      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 text-neutral-900">Send Us a Message</h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded flex items-start gap-3 animate-slide-up">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-semibold text-green-900">Message Sent Successfully!</div>
                  <div className="text-sm text-green-700">We'll get back to you within 24 hours.</div>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors"
                    placeholder="+1 (234) 567-890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-700">
                  Inquiry Type *
                </label>
                <select
                  name="inquiry_type"
                  value={formData.inquiry_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors"
                >
                  <option value="General">General Inquiry</option>
                  <option value="Product">Product Information</option>
                  <option value="Quote">Request Quote</option>
                  <option value="Support">Technical Support</option>
                  <option value="Partnership">Partnership Opportunity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-700">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
                className="group"
              >
                {submitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-neutral-900">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded flex items-center justify-center flex-shrink-0">
                    <Building2 className="text-brand-orange" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 mb-1">{siteSettings.companyName}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-brand-orange" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 mb-1">Head Office</div>
                    <div className="text-neutral-600">
                      {siteSettings.address.line1}
                      {siteSettings.address.line2 ? <>, {siteSettings.address.line2}</> : null}
                      <br />
                      {siteSettings.address.city}, {siteSettings.address.country}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded flex items-center justify-center flex-shrink-0">
                    <Mail className="text-brand-orange" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 mb-1">Email</div>
                    <a href={`mailto:${siteSettings.primaryEmail}`} className="text-neutral-600 hover:text-brand-orange transition-colors">
                      {siteSettings.primaryEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded flex items-center justify-center flex-shrink-0">
                    <Phone className="text-brand-orange" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 mb-1">Phone</div>
                    <div className="text-neutral-600 space-y-1">
                      {siteSettings.phones.map((phone) => (
                        <a
                          key={phone.tel}
                          href={`tel:${phone.tel}`}
                          className="block hover:text-brand-orange transition-colors"
                        >
                          {phone.number}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded flex items-center justify-center flex-shrink-0">
                    <Clock className="text-brand-orange" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 mb-1">Business Hours</div>
                    <div className="text-neutral-600">
                      {siteSettings.businessHours.map((line) => (
                        <span key={line} className="block">{line}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 p-6 border border-neutral-200">
              <h3 className="font-semibold text-lg mb-3 text-neutral-900">Quick Response Guarantee</h3>
              <p className="text-neutral-600 text-sm">
                We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call our phone number directly.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            Our Locations
          </h2>
          <p className="text-xl text-neutral-600">We serve clients across multiple locations worldwide</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            'Delhi',
            'Chennai',
            'Kolkata',
            'Patna',
            'Lucknow',
            'Noida',
            'Ahmedabad',
            'Bangalore',
            'Ludhiana',
            'Chandigarh',
            'Dubai',
            'London',
            'Singapore'
          ].map((location) => (
            <div
              key={location}
              className="bg-white p-4 border border-neutral-200 hover:shadow-lg transition-all group"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="text-brand-orange" size={20} />
                </div>
                <span className="font-medium text-neutral-900 text-sm text-center">{location}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
