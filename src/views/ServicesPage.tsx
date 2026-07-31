import Link from 'next/link';
import { Lightbulb, Settings, Wrench, Phone, CheckCircle2, FileText } from 'lucide-react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { routes } from '@/lib/routes';

export function ServicesPage() {
  const services = [
    {
      icon: Lightbulb,
      title: 'Lighting Design Consultation',
      description: 'Expert guidance on selecting the right lighting solutions for your specific requirements. Our team analyzes your space, usage patterns, and objectives to design optimal illumination systems.'
    },
    {
      icon: Settings,
      title: 'Custom Solutions',
      description: 'Tailored lighting systems engineered to meet unique project specifications. From concept to implementation, we create bespoke solutions that align with your vision and budget.'
    },
    {
      icon: Wrench,
      title: 'Professional Installation',
      description: 'Certified technicians ensure proper installation following industry best practices. We handle everything from site preparation to final commissioning with minimal disruption.'
    },
    {
      icon: Phone,
      title: 'Technical Support',
      description: 'Comprehensive after-sales support with rapid response times. Our technical team provides troubleshooting, maintenance guidance, and system optimization assistance.'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'Initial assessment of your lighting needs and objectives'
    },
    {
      number: '02',
      title: 'Design',
      description: 'Custom lighting plan with product specifications and layout'
    },
    {
      number: '03',
      title: 'Quotation',
      description: 'Transparent pricing with detailed cost breakdown'
    },
    {
      number: '04',
      title: 'Installation',
      description: 'Professional setup by certified technicians'
    },
    {
      number: '05',
      title: 'Support',
      description: 'Ongoing maintenance and technical assistance'
    }
  ];

  return (
    <div>
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-neutral-300 max-w-3xl">
            Comprehensive lighting solutions from design to deployment and beyond. We're with you every step of the way.
          </p>
        </div>
      </section>

      <Section background="white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            What We Offer
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            End-to-end lighting services tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-neutral-50 p-8 border border-neutral-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mb-6">
                <service.icon className="text-brand-orange" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900">{service.title}</h3>
              <p className="text-neutral-700 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            Our Process
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            A streamlined approach to delivering exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {processSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 border border-neutral-200 text-center h-full">
                <div className="text-5xl font-bold text-brand-orange/20 mb-4">{step.number}</div>
                <h3 className="text-lg font-semibold mb-3 text-neutral-900">{step.title}</h3>
                <p className="text-sm text-neutral-600">{step.description}</p>
              </div>
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-brand-orange"></div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
              Why Choose Our Services?
            </h2>
            <div className="space-y-4">
              {[
                'Experienced team with 18+ years in the industry',
                'ISO 9001 certified quality management systems',
                'Comprehensive 5-year warranty on all installations',
                'Rapid response technical support',
                'Energy efficiency audits and optimization',
                'Flexible maintenance contracts',
                'Competitive pricing with transparent quotes'
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-brand-orange flex-shrink-0 mt-1" size={20} />
                  <span className="text-neutral-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-neutral-50 p-8 border border-neutral-200">
            <div className="text-center mb-6">
              <FileText className="text-brand-orange mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-2 text-neutral-900">Request a Service Quote</h3>
              <p className="text-neutral-600">Get a customized quote for your project</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-700">Service Type</label>
                <select className="w-full px-4 py-3 border border-neutral-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors">
                  <option>Lighting Design Consultation</option>
                  <option>Custom Solutions</option>
                  <option>Professional Installation</option>
                  <option>Technical Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-700">Project Type</label>
                <select className="w-full px-4 py-3 border border-neutral-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-colors">
                  <option>Commercial</option>
                  <option>Industrial</option>
                  <option>Residential</option>
                  <option>Other</option>
                </select>
              </div>

              <Link href={routes.contact} className="block">
                <Button variant="primary" size="lg" className="w-full">
                  Get Detailed Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section background="dark">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-neutral-400 mb-8">
            Let's discuss how our services can transform your lighting infrastructure.
          </p>
          <Link href={routes.contact}>
            <Button variant="primary" size="lg">
              Schedule Consultation
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
