'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle, Handshake, TrendingUp, Users, Shield, Building2 } from 'lucide-react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { dataService, FranchiseSubmission } from '../lib/data';
import { routes } from '@/lib/routes';
import { useSiteSettings } from '@/context/SiteSettingsContext';

export function FranchisePage() {
  const siteSettings = useSiteSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    business_experience: '',
    investment_capacity: '',
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
      const submission: FranchiseSubmission = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        business_experience: formData.business_experience || undefined,
        investment_capacity: formData.investment_capacity || undefined,
        message: formData.message
      };

      const result = await dataService.submitFranchise(submission, siteSettings.formRecipientEmail);

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        business_experience: '',
        investment_capacity: '',
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Franchise</h1>
          <p className="text-xl text-neutral-300 max-w-3xl">
            To understand further opportunities
          </p>
        </div>
      </section>

      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
                Join the Clair Family
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                Become a part of India's leading lighting solutions provider. With over 18 years of experience and a presence in 13+ locations worldwide, Clair offers you a proven business model with exceptional growth potential.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed">
                As a Clair franchise partner, you'll benefit from our brand reputation, comprehensive training, ongoing support, and access to our extensive product portfolio.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Why Partner With Us?</h3>

              {[
                {
                  icon: Building2,
                  title: 'Established Brand',
                  description: 'Leverage 18+ years of market presence and brand recognition across India and internationally'
                },
                {
                  icon: TrendingUp,
                  title: 'Growing Market',
                  description: 'Tap into the rapidly expanding LED lighting market with increasing demand for energy-efficient solutions'
                },
                {
                  icon: Users,
                  title: 'Comprehensive Support',
                  description: 'Complete training, marketing support, and ongoing technical assistance from our expert team'
                },
                {
                  icon: Shield,
                  title: 'Quality Assurance',
                  description: 'ISO 9001 certified products with 5-year warranty, ensuring customer satisfaction and repeat business'
                }
              ].map((benefit, index) => (
                <div key={index} className="flex gap-4 items-start border-l-4 border-brand-orange pl-6 py-2">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-orange/10 rounded flex items-center justify-center">
                    <benefit.icon className="text-brand-orange" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-neutral-900">{benefit.title}</h4>
                    <p className="text-neutral-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-neutral-50 p-8 border border-neutral-200 sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-brand-orange rounded flex items-center justify-center">
                <Handshake className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">Express Your Interest</h2>
            </div>

            <p className="text-neutral-600 mb-6">
              Kindly provide your details and our franchise team will get in touch with you within 24-48 hours to discuss opportunities.
            </p>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded flex items-start gap-3 animate-slide-up">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-semibold text-green-900">Application Submitted Successfully!</div>
                  <div className="text-sm text-green-700">Our team will contact you soon.</div>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Your full name"
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
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors"
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-700">
                  City/Location *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors"
                  placeholder="City where you want to open franchise"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-700">
                  Business Experience
                </label>
                <input
                  type="text"
                  name="business_experience"
                  value={formData.business_experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors"
                  placeholder="Years of experience or business background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-700">
                  Investment Capacity
                </label>
                <select
                  name="investment_capacity"
                  value={formData.investment_capacity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors"
                >
                  <option value="">Select investment range</option>
                  <option value="5-10 Lakhs">₹5-10 Lakhs</option>
                  <option value="10-25 Lakhs">₹10-25 Lakhs</option>
                  <option value="25-50 Lakhs">₹25-50 Lakhs</option>
                  <option value="50 Lakhs - 1 Crore">₹50 Lakhs - 1 Crore</option>
                  <option value="1 Crore+">₹1 Crore+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-700">
                  Message / Additional Details *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors resize-none"
                  placeholder="Tell us about your interest, location preferences, or any questions..."
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
                className="w-full group"
              >
                {submitting ? (
                  'Submitting...'
                ) : (
                  <>
                    Submit Application
                    <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-neutral-600 mb-8">
            Join our growing network of successful franchise partners and be part of India's lighting revolution. For more information, you can also reach us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={routes.contact}>
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
            </Link>
            <Link href={routes.about}>
              <Button variant="outline" size="lg">
                Learn About Clair
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
