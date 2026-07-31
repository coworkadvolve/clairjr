'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Award, Users, Zap, CheckCircle2, TrendingUp, Shield, Download, Building2, Factory, Store, Quote, Star } from 'lucide-react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../lib/data';
import { RequestQuotePopup } from '../components/RequestQuotePopup';
import { CataloguePopup } from '../components/CataloguePopup';
import { BlogCard } from '../components/BlogCard';
import { routes } from '@/lib/routes';
import type { Catalogue, Testimonial } from '@/lib/content-types';
import type { BlogPostSummary } from '@/lib/blog';

interface HomePageProps {
  initialProducts: Product[];
  testimonials: Testimonial[];
  catalogues: Catalogue[];
  latestPosts: BlogPostSummary[];
}

export function HomePage({ initialProducts, testimonials, catalogues, latestPosts }: HomePageProps) {
  const router = useRouter();
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [cataloguePopupOpen, setCataloguePopupOpen] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState<string>('');

  const products = initialProducts;

  const getCategoryName = (productName: string) => {
    if (productName.includes('Glass')) return 'Commercial';
    if (productName.includes('Dawn')) return 'Industrial';
    if (productName.includes('Track')) return 'Office';
    if (productName.includes('Bulb')) return 'General';
    return 'Decorative';
  };

  return (
    <div>
      <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(30deg,#f5821f_12%,transparent_12.5%,transparent_87%,#f5821f_87.5%,#f5821f),linear-gradient(150deg,#f5821f_12%,transparent_12.5%,transparent_87%,#f5821f_87.5%,#f5821f),linear-gradient(30deg,#f5821f_12%,transparent_12.5%,transparent_87%,#f5821f_87.5%,#f5821f),linear-gradient(150deg,#f5821f_12%,transparent_12.5%,transparent_87%,#f5821f_87.5%,#f5821f)] bg-[length:80px_140px] bg-[position:0_0,0_0,40px_70px,40px_70px]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="py-20 md:py-32 lg:py-40">
            <div className="max-w-4xl">
              <div className="inline-block mb-6 px-4 py-2 bg-brand-orange/20 border border-brand-orange/30 backdrop-blur-sm">
                <span className="text-brand-orange font-medium text-sm tracking-wide">
                  SINCE 2006 • TRUSTED BY INDUSTRY LEADERS
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
                Illuminating Tomorrow with{' '}
                <span className="text-brand-orange">Intelligent</span> Lighting Solutions
              </h1>

              <p className="text-xl md:text-2xl text-neutral-300 mb-8 leading-relaxed max-w-3xl">
                Eco-friendly, energy-efficient lighting systems engineered for commercial, industrial, and architectural excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href={routes.products}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="group"
                  >
                    Explore Products
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </Link>
                <Link href={routes.contact}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/5 border-white/30 text-white hover:bg-white hover:text-neutral-900 hover:!text-neutral-900"
                  >
                    Get Consultation
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-brand-orange" size={20} />
                  <span>ISO 9001 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-brand-orange" size={20} />
                  <span>50,000+ Installations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-brand-orange" size={20} />
                  <span>5-Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <Section background="white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-brand-orange mb-2">18+</div>
            <div className="text-neutral-600 font-medium">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-brand-orange mb-2">50K+</div>
            <div className="text-neutral-600 font-medium">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-brand-orange mb-2">500+</div>
            <div className="text-neutral-600 font-medium">Corporate Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-brand-orange mb-2">99%</div>
            <div className="text-neutral-600 font-medium">Client Satisfaction</div>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-neutral-900">
            Featured Products
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Discover our premium range of lighting solutions designed for performance, efficiency, and longevity.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-neutral-200 animate-pulse h-96 rounded"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      name={product.name}
                      shortDescription={product.short_description || product.description.substring(0, 100) + '...'}
                      imageUrl={product.image_url}
                      category={getCategoryName(product.name)}
                      slug={product.slug}
                      onRequestQuote={() => {
                        setSelectedProductName(product.name);
                        setQuotePopupOpen(true);
                      }}
                    />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href={routes.products}>
            <Button
              variant="secondary"
              size="lg"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </Section>

      <Section background="white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            Industries We Serve
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Trusted lighting solutions across multiple sectors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Building2,
              title: 'Commercial',
              description: 'Office buildings, retail spaces, hotels, and hospitality venues'
            },
            {
              icon: Factory,
              title: 'Industrial',
              description: 'Manufacturing plants, warehouses, logistics centers, and heavy industries'
            },
            {
              icon: Store,
              title: 'Retail & Showrooms',
              description: 'Shopping centers, boutiques, galleries, and exhibition spaces'
            }
          ].map((industry, index) => (
            <div key={index} className="bg-neutral-50 p-8 border border-neutral-200 hover:shadow-lg transition-all group">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <industry.icon className="text-brand-orange" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">{industry.title}</h3>
              <p className="text-neutral-600">{industry.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {latestPosts.length > 0 ? (
        <Section background="white">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
                Latest Insights
              </span>
              <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
                Lighting Knowledge Hub
              </h2>
              <p className="max-w-2xl text-lg text-neutral-600">
                Practical guidance for better lighting decisions, efficient projects, and
                comfortable spaces.
              </p>
            </div>
            <Link
              href={routes.blog}
              className="inline-flex items-center gap-2 font-semibold text-brand-orange transition-all hover:gap-3"
            >
              View all articles
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section background="gray">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
              Why Industry Leaders Choose Clair
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              With over 18 years of experience, we've become the preferred lighting partner for businesses that demand excellence, reliability, and innovation.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Award,
                  title: 'Certified Excellence',
                  description: 'ISO 9001 certified with international quality standards'
                },
                {
                  icon: Zap,
                  title: 'Energy Efficiency',
                  description: 'Up to 80% energy savings with advanced LED technology'
                },
                {
                  icon: Shield,
                  title: 'Extended Warranty',
                  description: '5-year comprehensive warranty on all products'
                },
                {
                  icon: Users,
                  title: 'Expert Support',
                  description: 'Dedicated technical support and consultation services'
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-orange/10 rounded flex items-center justify-center">
                    <item.icon className="text-brand-orange" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-neutral-900">{item.title}</h3>
                    <p className="text-neutral-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
              <img
                src={products[0]?.image_url || '/WELL glass light.webp'}
                alt="Quality lighting"
                className="w-full h-full object-contain p-12"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl border border-neutral-100">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-brand-orange" size={32} />
                <div>
                  <div className="text-2xl font-bold text-neutral-900">80%</div>
                  <div className="text-sm text-neutral-600">Energy Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white p-12 rounded-lg">
            <Download className="mb-6" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Download Product Catalogue
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Explore our complete range of lighting solutions with detailed specifications, applications, and technical data.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Complete product specifications',
                'Technical drawings and dimensions',
                'Installation guidelines',
                'Energy efficiency data',
                'Application examples'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              size="lg"
              className="bg-white border-white text-brand-orange hover:bg-brand-orange hover:text-white hover:border-brand-orange shadow-lg"
              onClick={() => setCataloguePopupOpen(true)}
            >
              <Download className="mr-2" size={20} />
              Download Catalogue (PDF)
            </Button>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-neutral-900">What's Inside?</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Product Categories',
                  description: 'Browse through Commercial, Industrial, Office, General, and Decorative lighting solutions'
                },
                {
                  title: 'Technical Specifications',
                  description: 'Detailed electrical, photometric, and dimensional data for all products'
                },
                {
                  title: 'Installation Guides',
                  description: 'Step-by-step instructions with diagrams for proper installation'
                },
                {
                  title: 'Case Studies',
                  description: 'Real-world applications and success stories from various industries'
                }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-brand-orange pl-4 py-2">
                  <h4 className="font-semibold text-neutral-900 mb-1">{item.title}</h4>
                  <p className="text-neutral-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            What Our Clients Say
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Trusted by leading organizations across industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 border border-neutral-200 shadow-sm">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="text-brand-orange fill-brand-orange" size={18} />
                ))}
              </div>
              <Quote className="text-brand-orange/20 mb-4" size={32} />
              <p className="text-neutral-700 mb-6 leading-relaxed">{testimonial.content}</p>
              <div className="border-t border-neutral-200 pt-4">
                <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                <div className="text-sm text-neutral-600">{testimonial.title}</div>
                <div className="text-sm text-brand-orange">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section background="dark">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-neutral-400 mb-8">
            Get in touch with our lighting experts for a customized solution tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={routes.contact}>
              <Button
                variant="primary"
                size="lg"
              >
                Request a Quote
              </Button>
            </Link>
            <Link href={routes.catalogue}>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white/30 text-white hover:bg-white hover:text-neutral-900"
              >
                Browse Catalog
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      <RequestQuotePopup
        isOpen={quotePopupOpen}
        onClose={() => setQuotePopupOpen(false)}
        productName={selectedProductName}
      />
      <CataloguePopup
        isOpen={cataloguePopupOpen}
        onClose={() => setCataloguePopupOpen(false)}
        catalogues={catalogues}
        onBrowseFull={() => {
          setCataloguePopupOpen(false);
          router.push(routes.catalogue);
        }}
      />
    </div>
  );
}
