import React, { useState } from 'react';
import PageBanner from '../../components/PageBanner/PageBanner';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import BlogCard from '../../components/BlogCard/BlogCard';
import CTASection from '../../components/CTASection/CTASection';
import SEO from '../../components/SEO/SEO';
import { blogPostsData } from '../../data/blogPosts';
import './Blog.css';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Gospodinjstvo', 'Optimizacija', 'Upravljanje kakovosti'];

  const filteredPosts = selectedCategory === 'all'
    ? blogPostsData
    : blogPostsData.filter(post => post.category === selectedCategory);

  return (
    <div className="blog-page">
      <SEO
        title="Blog in novice | Williams Housekeeping hotelsko čiščenje"
        description="Preberite strokovne članke in nasvete o hotelskem gospodinjstvu, optimizaciji čiščenja, higienskih standardih in učinkovitem vodenju ekip v turizmu."
        canonical="https://www.williamscleaning.si/blog"
      />
      <PageBanner
        title="Blog in novice"
        subtitle="Strokovni vpogledi, nasveti za vodenje gospodinjstva in najnovejši trendi v hotelirstvu."
        breadcrumbs={[{ name: 'Domov', path: '/' }]}
        image="/images/blog_lp.png"
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Novice &amp; Članki"
            title="Aktualne novice in strokovne objave"
            subtitle="Preberite najnovejše članke naših strokovnjakov za hotelsko in poslovno čiščenje."
            centered={true}
          />

          {/* Category filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0B70A6] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'Vsi prispevki' : cat}
              </button>
            ))}
          </div>

          {/* Grid of Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                image={post.image}
                date={post.date}
                category={post.category}
                excerpt={post.excerpt}
                readTime={post.readTime}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Želite prejemati obvestila o novostih in trendih?"
        subtitle="Stopite v stik z nami za partnersko sodelovanje in strokovne nasvete glede vzdrževanja vaših objektov."
        primaryBtnText="Stopite v stik"
        primaryBtnTo="/kontakt"
      />
    </div>
  );
}
