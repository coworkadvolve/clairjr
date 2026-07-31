'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Filter, X } from 'lucide-react';
import { Section } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import { Product, Category } from '../lib/data';
import { Button } from '../components/Button';
import { RequestQuotePopup } from '../components/RequestQuotePopup';
import { routes } from '@/lib/routes';

interface ProductsPageProps {
  initialProducts: Product[];
  initialCategories: Category[];
}

export function ProductsPage({ initialProducts, initialCategories }: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState<string>('');

  const products = initialProducts;
  const categories = initialCategories;

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category_id === selectedCategory);

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || 'Product';
  };

  return (
    <div>
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-neutral-300 max-w-3xl">
            Explore our comprehensive range of lighting solutions engineered for performance, efficiency, and reliability across all applications.
          </p>
        </div>
      </section>

      <Section background="gray">
        <div className="lg:grid lg:grid-cols-[280px,1fr] gap-12">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white p-6 border border-neutral-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Filter by Category</h3>
                <button
                  className="lg:hidden"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  aria-label="Toggle filters"
                >
                  {showMobileFilters ? <X size={20} /> : <Filter size={20} />}
                </button>
              </div>

              <div className={`space-y-2 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-4 py-3 transition-colors border-l-4 ${
                    selectedCategory === 'all'
                      ? 'border-brand-orange bg-orange-50 text-brand-orange font-medium'
                      : 'border-transparent hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  All Products ({products.length})
                </button>

                {categories.map((category) => {
                  const count = products.filter((p) => p.category_id === category.id).length;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 transition-colors border-l-4 ${
                        selectedCategory === category.id
                          ? 'border-brand-orange bg-orange-50 text-brand-orange font-medium'
                          : 'border-transparent hover:border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      {category.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900">
                {selectedCategory === 'all'
                  ? 'All Products'
                  : categories.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <div className="text-neutral-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    shortDescription={product.short_description || product.description.substring(0, 120) + '...'}
                    imageUrl={product.image_url}
                    category={getCategoryName(product.category_id)}
                    slug={product.slug}
                    onRequestQuote={() => {
                      setSelectedProductName(product.name);
                      setQuotePopupOpen(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg border border-neutral-200">
                <p className="text-neutral-600 text-lg mb-4">No products found in this category.</p>
                <Button variant="outline" onClick={() => setSelectedCategory('all')}>
                  View All Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section background="dark">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Help Choosing?
          </h2>
          <p className="text-xl text-neutral-400 mb-8">
            Our lighting experts are ready to help you find the perfect solution for your specific requirements.
          </p>
          <Link href={routes.contact}>
            <Button variant="primary" size="lg">
              Contact Our Experts
            </Button>
          </Link>
        </div>
      </Section>

      <RequestQuotePopup
        isOpen={quotePopupOpen}
        onClose={() => setQuotePopupOpen(false)}
        productName={selectedProductName}
      />
    </div>
  );
}
