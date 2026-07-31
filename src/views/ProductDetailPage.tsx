'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, 
  CheckCircle2, 
  Download, 
  ShoppingCart,
  Package,
  Thermometer,
  Zap,
  Clock,
  Sun,
  Lightbulb,
  Shield,
  Activity,
  Droplet,
  Target,
  Battery,
  Ruler,
  Gauge,
  Settings,
  Layers
} from 'lucide-react';
import { Button } from '../components/Button';
import { Section } from '../components/Section';
import { Product, Category } from '../lib/data';
import { RequestQuotePopup } from '../components/RequestQuotePopup';
import { routes } from '@/lib/routes';

interface ProductDetailPageProps {
  product: Product;
  category: Category | null;
}

// Function to get appropriate icon for specification key
function getSpecIcon(key: string) {
  const keyLower = key.toLowerCase();
  
  if (keyLower.includes('material') || keyLower.includes('housing')) {
    return Package;
  }
  if (keyLower.includes('temp') || keyLower.includes('temperature')) {
    return Thermometer;
  }
  if (keyLower.includes('voltage') || keyLower.includes('volt')) {
    return Zap;
  }
  if (keyLower.includes('lifespan') || keyLower.includes('life')) {
    return Clock;
  }
  if (keyLower.includes('cri') || keyLower.includes('color')) {
    return Sun;
  }
  if (keyLower.includes('lumen') || keyLower.includes('efficacy') || keyLower.includes('led')) {
    return Lightbulb;
  }
  if (keyLower.includes('surge') || keyLower.includes('protection')) {
    return Shield;
  }
  if (keyLower.includes('power') || keyLower.includes('factor')) {
    return Activity;
  }
  if (keyLower.includes('ip') || keyLower.includes('rating')) {
    return Droplet;
  }
  if (keyLower.includes('beam') || keyLower.includes('angle')) {
    return Target;
  }
  if (keyLower.includes('battery')) {
    return Battery;
  }
  if (keyLower.includes('dimension') || keyLower.includes('size')) {
    return Ruler;
  }
  if (keyLower.includes('ampere') || keyLower.includes('current')) {
    return Gauge;
  }
  if (keyLower.includes('type') || keyLower.includes('feature')) {
    return Settings;
  }
  if (keyLower.includes('backup')) {
    return Battery;
  }
  
  // Default icon
  return Layers;
}

interface ProductModelRow {
  code?: string;
  wattage?: string;
  wattagePerMeter?: string;
  dimensions?: string;
  outerDimensions?: string;
  cutout?: string;
  packing?: string;
  price?: string | number | null;
  pricePerMeter?: string | number | null;
}

export function ProductDetailPage({ product, category }: ProductDetailPageProps) {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const rawModels = product.specifications?.models;
  const models: ProductModelRow[] = Array.isArray(rawModels) ? (rawModels as ProductModelRow[]) : [];
  const hasModels = models.length > 0;

  return (
    <div className="bg-white">
      {/* Product Header - Combined with breadcrumb */}
      <section className="bg-white pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {/* Breadcrumb */}
          <Link
            href={routes.products}
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-brand-orange transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            <span>Back to Products</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Product Image */}
            <div className="lg:sticky lg:top-24">
              <div className="aspect-square bg-white rounded-lg overflow-hidden border border-neutral-200 shadow-sm">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-contain p-6 md:p-8"
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              {category && (
                <div className="text-sm font-medium text-brand-orange uppercase tracking-wider mb-3">
                  {category.name}
                </div>
              )}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-neutral-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-6 leading-relaxed">
                {product.short_description || product.description}
              </p>
              
              {product.description !== product.short_description && (
                <div className="mb-8">
                  <p className="text-neutral-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-neutral-900">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="text-brand-orange mt-0.5 flex-shrink-0" size={20} />
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setQuotePopupOpen(true)}
                  className="flex-1"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Request Quote
                </Button>
                {product.datasheet_url && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <Download size={20} className="mr-2" />
                    Download Datasheet
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <Section background="gray">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Specifications</h2>
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {Object.entries(product.specifications)
                  .filter(([key]) => key !== 'models')
                  .map(([key, value], index) => {
                    const Icon = getSpecIcon(key);
                    return (
                      <div
                        key={key}
                        className={`p-6 border-b border-neutral-200 ${
                          index % 2 === 0 ? 'md:border-r' : ''
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                            <Icon className="text-brand-orange" size={24} />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-1">
                              {key}
                            </div>
                            <div className="text-lg font-semibold text-neutral-900">
                              {typeof value === 'string' || typeof value === 'number' ? String(value) : JSON.stringify(value)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Models & Pricing */}
      {hasModels && (
        <Section background="white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Available Models</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg border border-neutral-200 overflow-hidden">
                <thead className="bg-neutral-800 text-white">
                  <tr>
                    <th className="p-4 text-left font-semibold">Item Code</th>
                    <th className="p-4 text-left font-semibold">Wattage</th>
                    <th className="p-4 text-left font-semibold">Dimensions</th>
                    <th className="p-4 text-left font-semibold">Packing</th>
                    <th className="p-4 text-right font-semibold">Price (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model, index) => (
                    <tr
                      key={model.code || index}
                      className={`border-t border-neutral-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                      }`}
                    >
                      <td className="p-4 font-medium text-neutral-900">{model.code || '-'}</td>
                      <td className="p-4 text-neutral-700">
                        {model.wattage || model.wattagePerMeter || '-'}
                      </td>
                      <td className="p-4 text-neutral-700">
                        {model.dimensions || model.outerDimensions || model.cutout || '-'}
                      </td>
                      <td className="p-4 text-neutral-700">{model.packing || '-'}</td>
                      <td className="p-4 text-right font-semibold text-brand-orange">
                        {model.price || model.pricePerMeter ? `₹${model.price || model.pricePerMeter}` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>
      )}

      {/* Applications */}
      {product.applications && product.applications.length > 0 && (
        <Section background="gray">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.applications.map((application, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg border border-neutral-200 hover:border-brand-orange transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-brand-orange flex-shrink-0" size={24} />
                    <span className="text-neutral-700 font-medium">{application}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Gallery */}
      {product.gallery_images && product.gallery_images.length > 0 && (
        <Section background="white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.gallery_images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="aspect-square bg-white rounded-lg overflow-hidden border border-neutral-200"
                >
                  <img
                    src={imageUrl}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section background="dark">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Interested in {product.name}?
          </h2>
          <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
            Contact our experts to get a custom quote, technical support, or learn more about this product.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setQuotePopupOpen(true)}
            >
              Request a Quote
            </Button>
            <Link href={routes.products}>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white/30 text-white hover:bg-white hover:text-neutral-900"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      <RequestQuotePopup
        isOpen={quotePopupOpen}
        onClose={() => setQuotePopupOpen(false)}
        productName={product.name}
      />
    </div>
  );
}

