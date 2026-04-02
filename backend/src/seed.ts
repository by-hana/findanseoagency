export default async function seed({ strapi }) {
  // Check if already seeded
  const existingPages = await strapi.documents('api::page.page').findMany({});
  if (existingPages.length > 0) {
    console.log('🌱 Database already seeded, skipping...');
    return;
  }

  console.log('🌱 Seeding database...');

  // ── Global Settings ──
  await strapi.documents('api::global.global').create({
    data: {
      siteName: 'FindAnSEOAgency',
      siteDescription: 'The definitive directory for performance-driven SEO agencies.',
      trustBarHeadline: 'Trusted by 500+ Businesses',
      footerTagline: 'Curating the world\'s most sophisticated digital search partners for the intelligence era.',
      copyrightText: '© 2024 FindAnSEOAgency. All rights reserved.',
      newsletterTitle: 'Stay ahead of the Algorithm.',
      newsletterDescription: 'Get the weekly memo on SEO shifts and AI integration directly from our research team.',
      newsletterPlaceholder: 'Enter your work email',
      navLinks: [
        { label: 'Agencies', href: '/', active: false },
        { label: 'AI Optimization', href: '/ai-optimization', active: false },
        { label: 'SEO Basics', href: '/seo-agencies', active: false },
        { label: 'Blog', href: '/blog', active: false }
      ],
      footerColumns: [
        {
          title: 'Directory',
          links: [
            { label: 'Top Agencies', href: '/' },
            { label: 'Pricing Models', href: '/seo-agencies' },
            { label: 'Case Studies', href: '#' },
            { label: 'Reviews', href: '#' }
          ]
        },
        {
          title: 'Knowledge',
          links: [
            { label: 'AI Optimization', href: '/ai-optimization' },
            { label: 'Search Trends', href: '#' },
            { label: 'SEO Basics', href: '/seo-agencies' },
            { label: 'Webinars', href: '#' }
          ]
        },
        {
          title: 'Company',
          links: [
            { label: 'About Us', href: '#' },
            { label: 'Contact', href: '#' },
            { label: 'Privacy', href: '#' },
            { label: 'Terms', href: '#' }
          ]
        }
      ]
    }
  });

  // ── Trust Partners ──
  const partners = [
    { name: 'Stripe', logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm83LU3Xz3bgZ0Fr3x5650GkwmO3UiD8-f_vigG_qh9KrfVStoU4zDn7evs9OIF6oXdjzQYc4fJNqrFUe9upD0Z3UTKFsaRdUJRhKMzbjpbW1OEu1ml_AXk6q3s65ndmZp1GCE_I5n2gQdWBtTe3fjfjJrJbh7eSqNeSG1AXU9m9j7dBVugUybqDxQy7PM2xeny0b59ZM1xiBe-p-N1uw1PGd_GTW9Gz3fgy_zTIuRASPmCFlgVN7GbHHOAEMUE5YtBntyXjkO7-Q', order: 1 },
    { name: 'Notion', logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJydH7QxX1CHWk3C7Iq9s4B2NyEBYiSlI7wUYittNQ_KZMKtkdgOPpagHZwvzCqxqeZyW1yPqazc6JDlMQYLy4BuaUhhKSqCQtdj0SfS5FuOtgL0kKhs61XqTrMqgK5g5LOiCcdGRBzLNLgiLWTzHk9zRQs2szGVgTAU3ZVCjBHQS6tqcYzEtDezpg8lMgGAJ18jDf0iy68bYGLk_4SVhzoBcHB883UoFvnUPuem1VSOKghBgFI7gVZ0EmzhOLyWhX1NOAv5zkGk8', order: 2 },
    { name: 'Shopify', logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj5H12ZPvzqkVlS7BB4ePoUEgh6Oeaa5WxBPR9ZUAkXxKYpkZNiTeIcaUkVvQAuPifVZvGM7tDYw-qEW4RSJhckGvDqIGBo4Fdew8V_Qs_UgjTA7uhuWAVhvU1eixQjcw_m5s4Kvj5q8iqHJfoiuD0jSVzpALip7UfZ46Ze47oIxbDe-TDhIR7CVbazvM8kxZpAvMsKPthapsAOf1s6aSkm2cVKnwZ215MhtWTxT10vSPNv_Dmy-DCZtNNHqOXtMeUbE69n_PJ0kQ', order: 3 },
    { name: 'Asana', logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7gjo36NDwi1xyCKrhT4G9r1iv4AsRqy_IevVV2yGFfJviuZ8AXw-M_Iw3aXMJ1u0XcueY_1CKEZYDa2wL_VfE2wDcRY1FeNRr03OfRNiSqsoolvGcb8BvXYmMXQrlE_NTrsNa4fgptAcaoTdtta2hAHZDIUKjv23cJJSM35sSmQZiDuFOaLE9T_RlV4q33gOucEFRiIySmJh_UpJxRKD4DjNBPG3KJzZsxl8btkvphN8ch1c8X5QKRM8VtkHls0hbm80M_9X1InY', order: 4 },
    { name: 'Linear', logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvupVY-1mHKPsWUZr4-iyB7qxuNUaOOvuq4R360xtqkS9rArodG-g2j8mEb9U0Vis6ddFNvKvEBptz3Ky07a0AI4ribTV3zKy91Su20AbOKDHIOqcws93GdvAeltbPhg_MsGLv3LMB9FXKMz7izc28NrqMiQmo5VbyYDax0eOYxrmK_rx8SYz_jL5hp6S5_2G5kV4smi_d--EqRibX_L0JaPBDKGgqXuHeBAmeWY_JFhvRQ4JMdi3qZ8aeIvl9qUZjerfyQUfqq18', order: 5 }
  ];
  for (const p of partners) {
    await strapi.documents('api::trust-partner.trust-partner').create({ data: p, status: 'published' });
  }

  // ── Service Categories ──
  const services = [
    { title: 'AI-Powered Content Strategy', description: 'Leveraging generative models to create authoritative, human-centric content at scale.', icon: 'auto_awesome', label: 'DATA-FIRST CONTENT', order: 1 },
    { title: 'LLM Training & Fine-Tuning', description: 'Ensuring your brand data is accurately represented in Large Language Model results.', icon: 'model_training', label: 'MODEL OPTIMIZATION', order: 2 },
    { title: 'Semantic Search Integration', description: 'Mapping entity relationships to dominate knowledge graph placements and rich snippets.', icon: 'hub', label: 'GRAPH STRUCTURE', order: 3 },
    { title: 'Predictive SEO Analytics', description: 'Using machine learning to forecast algorithmic shifts and adjust strategy in real-time.', icon: 'query_stats', label: 'ML FORECASTING', order: 4 }
  ];
  for (const s of services) {
    await strapi.documents('api::service-category.service-category').create({ data: s, status: 'published' });
  }

  // ── Agencies ──
  const agencies = [
    {
      name: 'TJ Digital',
      slug: 'tj-digital',
      description: 'Founded by TJ Robertson, a Las Vegas-based SEO veteran with 15 years of experience. TJ Digital specializes in AI-driven search strategy, LLM optimization, and predictive analytics for enterprise brands.',
      rating: 5.0,
      badge: 'Premier Agency',
      badgeStyle: 'premier',
      icon: 'auto_awesome',
      logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArieJfXqX0ojywJyced16HxbUpsooBgN8smckBqGxuayRaTgut65VjjxfkwqlTlMWfMNsjyiJxfaD1dHGeDR_cacGs8wC9UuO4NUc71_1DVMykSdbZYLjED5edckOenZu71qC_FRsq9m1ajKQC4gCdehRk9SQCkE8KxsMjSBi1oPrziO-3QBR-dxraTYTTp6GM7n6oTr0kvzvHut_m_JSf7aJKahwiwqfrsHsyJA62dtM0Qsq2pMscnlJWz_CNiR-HtmEAoN9Q-JE',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWrP4s_3Ta_-xElz3_AxyBzIMyYmGNiE3XY-aGmSLcxQsZaxplT3GsP6zu0ry1jnc4bYaf7zv7Cwoe2tsTj026MMW4H16ZjGGTBoUWNQl7B5Y_CTX3z0SBUG6mcRB8_hQ782q70G2TwwQC_DqwLZsM93VCIKo9Y7EkBpALixMbMgRpHyPIFD1XZ66nEg_ssF1bbWRe_MvGpEw40L6do-h5LPFDVVjAIXDgQoZlwFmne1wSSsnuDl_96HDWfojEh3WK00ERa8K6pJY',
      retentionRate: '98% Client Retention',
      ctaText: 'View Full Case Study',
      featured: true,
      order: 1
    },
    {
      name: 'Vortex SEO Lab',
      slug: 'vortex-seo-lab',
      description: 'Specializing in Enterprise E-commerce and technical architecture audits for global brands.',
      rating: 4.9,
      badge: 'Premium',
      badgeStyle: 'premium',
      icon: 'rocket_launch',
      featured: false,
      order: 2
    },
    {
      name: 'Summit Digital',
      slug: 'summit-digital',
      description: 'Award-winning content strategy and semantic SEO for high-growth SaaS and Tech firms.',
      rating: 5.0,
      badge: 'Niche Expert',
      badgeStyle: 'niche',
      icon: 'hub',
      featured: false,
      order: 3
    },
    {
      name: 'Metric Bloom',
      slug: 'metric-bloom',
      description: 'Combining AI-driven keyword research with traditional PR for authoritative link building.',
      rating: 4.8,
      badge: 'Data Driven',
      badgeStyle: 'data-driven',
      icon: 'query_stats',
      featured: false,
      order: 4
    }
  ];
  for (const a of agencies) {
    await strapi.documents('api::agency.agency').create({ data: a, status: 'published' });
  }

  // ── Blog Posts ──
  const posts = [
    {
      title: 'What is GEO? A Complete Guide to Generative Engine Optimization',
      slug: 'what-is-geo-complete-guide',
      excerpt: 'Traditional SEO is evolving. Learn how to optimize your brand for AI-driven answers in ChatGPT, Perplexity, and Google Gemini.',
      category: 'Featured Guide',
      readTime: '12 Min Read',
      publishDate: '2024-03-18',
      featured: true,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-ajd6QMKyVbZTepTWxxYw8XQxNRlhXksCKTjaPZmvR_nflONjbECqYtgzsrE4t2uQJBYx9FfifPrCsfj3eHGvCFxxloBJQdiUumeQM1v9gcQudKSBAQX_uvoQO7j-0zP9VBRstpv_9jxiOx1VzfRJ8OEwyYTKUFnDDUCV41EXbaDlx3NjKGIVCZTRwrnvrhAr6v9nmJ-sURxB7vHbV4h14Pgh0SPiNlcwBhVuE2lfL2Gr6RebOToH241Ia9NpNM-d3l5Bw5lIvQg',
      order: 1
    },
    {
      title: 'How Much Does SEO Cost? 2024 Pricing Guide for Mid-Market Brands',
      slug: 'seo-cost-2024-pricing-guide',
      excerpt: 'A detailed breakdown of monthly retainers, project-based fees, and what you should expect to pay for top-tier SEO performance.',
      category: 'Market Insights',
      readTime: '5 min read',
      publishDate: '2024-03-14',
      featured: false,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq42o-8YXhd-nWWOeNfVRr0eIkkzs3Yv7VMUn_jhaycbeineCS4bpxBY8oM24-GTnrzWNsWZC7PAZ9ZHSSrq4f4zGhmw3jUtPB8H3Fy_XCKGd4I1tMrKwbp5Ic6Jvvhqepi6PCKHTDNMAeVx-sQBqKOHfPy-2GT9-IWysd6JpTPFEwlh2_7M6XH3x2-IUYnwJF1u4P3MgWvCevNhMU0ngeA8aUqZAgGEvUOTGcFQm71RF9brNsN3NSdxVpknZt5zaV3owzYchU8uk',
      order: 2
    },
    {
      title: 'SEO vs. GEO: Why You Need a Dual Strategy for 2025',
      slug: 'seo-vs-geo-dual-strategy-2025',
      excerpt: 'Understanding the fundamental differences between ranking for search engines and ranking for large language models.',
      category: 'Strategy',
      readTime: '8 min read',
      publishDate: '2024-03-10',
      featured: false,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoOr6UMhtnPPwwCK05gXzjFq6z1lSX42tU08NcVBXiBnHO3mfvgalRDcctPzaW99C99dkC6OUuS1w44vwS_A9VIeEG-B1XjnXeGsFiUvawYcKEg-TqXyw6KobUzkOjIOssm3AUjU77-ALkqhf96V5PPWBEmBtwG_5nQ9i9nxK1m3vPzgLD3Zfucf9cQAKDGtqJLMYC7gRvyukeMyAb0PPedlOeO_cPW34aP_vqbTuwl6s0ZeKo2qvU4i5zZX0RuFvTagRKpzAPrRY',
      order: 3
    },
    {
      title: 'Can You Do SEO Without an Agency? The In-House Reality Check',
      slug: 'seo-without-agency-in-house',
      excerpt: 'Evaluating the resources, technology stack, and talent required to run a successful internal SEO program versus outsourcing.',
      category: 'Agency Reviews',
      readTime: '12 min read',
      publishDate: '2024-03-02',
      featured: false,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClb51AeqRMOZT33LqRgVh1lipDx4wwvQJph9Z0GQmJ6dx2McKDrb7UHBq9iqoqEkSl9_MDcuaq5ZimULx6w_UEh2b7o4EdiHDWVQUQRz3wy5lanbxkRMvcuCDJOqM3ZLTsUIj1XCZDXikd7h8K3lUS38-J0Qpf4zf90YfoR5Pubc4Tmx4qzCcQJo_nJPS528EXRk21_62YBN4raqrsTmTBhf6XVbDoVlfx8x9zcShQkzukBTJpABl6SKbBkH5IZ9oQnhhy3ve6WHo',
      order: 4
    },
    {
      title: 'The GEO Playbook: Citations in 2024',
      slug: 'geo-playbook-citations-2024',
      excerpt: 'Mastering the art of appearing in ChatGPT\'s "Sources" footer.',
      category: 'AI Optimization',
      readTime: '5 min read',
      publishDate: '2024-03-20',
      featured: false,
      order: 5
    },
    {
      title: 'LLM Branding: Establishing Truth',
      slug: 'llm-branding-establishing-truth',
      excerpt: 'How to correct misinformation about your brand in Gemini & Claude.',
      category: 'AI Optimization',
      readTime: '8 min read',
      publishDate: '2024-03-19',
      featured: false,
      order: 6
    },
    {
      title: 'Vector Search and Your Content Strategy',
      slug: 'vector-search-content-strategy',
      excerpt: 'Moving from keyword strings to high-dimensional intent.',
      category: 'Strategy',
      readTime: '12 min read',
      publishDate: '2024-03-17',
      featured: false,
      order: 7
    }
  ];
  for (const p of posts) {
    await strapi.documents('api::blog-post.blog-post').create({ data: p, status: 'published' });
  }

  // ── Pages ──

  // Home page
  await strapi.documents('api::page.page').create({
    data: {
      title: 'Home',
      slug: 'home',
      heroEyebrow: 'The Technical Curator',
      heroTitle: 'Find Your Next SEO Partner for the',
      heroHighlight: 'AI Era',
      heroDescription: 'The definitive directory for performance-driven SEO agencies. We vet the experts specializing in LLM optimization, semantic search, and predictive analytics.',
      heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKn-ugPOooNwwne4iaEgzIovotzJOaz0txOqGBwLaljzt9mV5y7VwiC5n81RMZz3Vf5_KJrv2W7NnT2ElF8Zr-hp8tjR8ncZAgeI97Cbd0dODHmy5_ws0qXppGY0qFeV28C6acKjITLoYLJJaiJBtqoSAYXJmOU6PgD9trdrCcLNmyMWl7WrnAWD7q73E3vxYie6ZNqdaRJ7oSpIS9gYUUbIDVS0KCtXoc0ak4T9OUVmUj0QwlTn6bacCfZs0u1PnLoa7_YH12ap8',
      heroPrimaryButtonText: 'Search Agencies',
      heroPrimaryButtonLink: '/',
      heroSecondaryButtonText: 'How It Works',
      heroSecondaryButtonLink: '#how-it-works',
      sections: {
        howItWorks: [
          { step: '01', icon: 'target', title: 'Define Your Needs', description: 'Tell us about your industry, current SEO status, and specific AI integration goals for your organic search strategy.' },
          { step: '02', icon: 'view_kanban', title: 'Browse Top Agencies', description: 'Access our hand-picked list of elite agencies. Each profile includes case studies focused on modern search algorithms.' },
          { step: '03', icon: 'handshake', title: 'Connect & Optimize', description: 'Request introductions directly. Start building an SEO roadmap designed for the next generation of search engines.' }
        ],
        eventCard: {
          label: 'UPCOMING EVENT',
          title: 'The Future of E-E-A-T in 2024',
          date: 'AUG 24, 2024'
        },
        joinCard: {
          title: 'Ready to transform your search visibility?',
          buttonText: 'Join the Directory'
        }
      },
      ctaTitle: 'The future of SEO isn\'t human-only. It\'s augmented.',
      ctaDescription: 'Join 50,000+ marketing leaders getting the latest on AI search shifts and agency insights delivered weekly.',
      ctaButtonText: 'Subscribe',
      ctaStyle: 'newsletter',
      seoTitle: 'FindAnSEOAgency | Find Your Next SEO Partner for the AI Era',
      seoDescription: 'The definitive directory for performance-driven SEO agencies specializing in AI optimization.'
    },
    status: 'published'
  });

  // AI Optimization page
  await strapi.documents('api::page.page').create({
    data: {
      title: 'AI Search Optimization',
      slug: 'ai-optimization',
      heroEyebrow: 'The Future of Search',
      heroTitle: 'Master AI Search Optimization',
      heroHighlight: '(GEO)',
      heroDescription: 'The future of SEO is generative. Learn how to optimize for LLMs like ChatGPT, Claude, and Gemini to ensure your brand remains visible in the age of AI.',
      heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ8wnselxflaEJKxYFyB7S515iisR8nEpcMcESSA5ZzMR5ZZJR7jw94Wlf_z-N_NNHzKyNFdCPmMtkKTugFZZw3JnF0ker2Yx4bY4r5trE9PiWezwrf4sftOd-O6EKCpDIlN1kt3-_CbCxYEGQf5m9FKIoHrCl4CC8uO_CPP4a6tee5_UP93w0bcftyyVr4GQ50Cdm0uaoGF2Twp-uh1pOxuh-X3mAqH9rXAt53YiPYhrRni17kF_v2hcDvmS9gZn_LGFrCdK3Kh0',
      heroPrimaryButtonText: 'Download GEO Guide',
      heroPrimaryButtonLink: '#',
      heroSecondaryButtonText: 'Explore Agencies',
      heroSecondaryButtonLink: '/',
      heroStatLabel: 'LLM Reach',
      heroStatValue: '+142%',
      heroStatDescription: 'Increased visibility in Gemini responses',
      sections: {
        whatIsGeo: {
          title: 'What is GEO?',
          description: 'Generative Engine Optimization (GEO) is the evolution of traditional search engine optimization. It focuses on how Large Language Models (LLMs) synthesize and present information to users.',
          detail: 'Unlike classic SEO which targets ranked lists, GEO targets citations and contextual inclusion. We help you transition from ranking for keywords to becoming the definitive source for AI recommendation engines.',
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaerD8X0QsiryX8kwcG3JoX6Rwvf643O8XHwZ8msfZ2QQg_ggd6rF2kO5BsRPggK_Xpv90t25MHkGxmF6FU_ASnhtHIJuNxGJzJJxvJGJEzWowWVIMF6zoZnJrhbsLBivFYHXT7r3XVtnmr5Ow56mdzBb5HUUbuGhJAXx8KaOu-ZyYIVCikANVDp-hjKxGC0iTHtiavhzqRh8fLsi2ljhQZGIvwnF6o3u20cIrjGjz9BRbPq18GvfKja6XG1LyAnmXRUviKS46n98',
          features: [
            { icon: 'terminal', title: 'Citation Engineering', description: 'Structured data that LLMs can easily parse and credit.' },
            { icon: 'account_tree', title: 'Semantic Weighting', description: 'Positioning your content as a high-authority node in vector space.' }
          ]
        },
        expertise: [
          { title: 'AI-First Strategy', description: 'Comprehensive audits of how LLMs currently perceive your brand and a roadmap to improve generative visibility across all major models.', icon: 'psychology', features: ['LLM Sentiment Audits', 'Prompt Sensitivity Testing'], span: 2 },
          { title: 'LLM Engines', description: 'Optimizing recommendation engines within ChatGPT and Claude to prioritize your services.', icon: 'hub', span: 1 },
          { title: 'Semantic Indexing', description: 'Aligning your website\'s knowledge graph with the high-dimensional vector space of generative engines.', icon: 'dataset', span: 1 },
          { title: 'Real-time LLM Monitoring', description: 'Track your brand\'s share-of-voice in generative search results with our proprietary GEO dashboard.', icon: 'query_stats', span: 2 }
        ],
        guides: [
          { number: '01', title: 'The GEO Playbook: Citations in 2024', description: 'Mastering the art of appearing in ChatGPT\'s "Sources" footer.', readTime: '5 min read' },
          { number: '02', title: 'LLM Branding: Establishing Truth', description: 'How to correct misinformation about your brand in Gemini & Claude.', readTime: '8 min read' },
          { number: '03', title: 'Vector Search and Your Content Strategy', description: 'Moving from keyword strings to high-dimensional intent.', readTime: '12 min read' }
        ]
      },
      ctaTitle: 'Ready to Audit Your AI Presence?',
      ctaDescription: 'Connect with one of our specialized GEO agencies today and secure your spot in the future of search.',
      ctaButtonText: 'Find a GEO Agency Now',
      ctaButtonLink: '/',
      ctaStyle: 'dark',
      seoTitle: 'AI Search Optimization Hub | FindAnSEOAgency',
      seoDescription: 'Master Generative Engine Optimization (GEO) and optimize for LLMs like ChatGPT, Claude, and Gemini.'
    },
    status: 'published'
  });

  // SEO Agencies page
  await strapi.documents('api::page.page').create({
    data: {
      title: 'Finding an SEO Agency',
      slug: 'seo-agencies',
      heroEyebrow: 'Expert Navigation',
      heroTitle: 'Your Path to the Right',
      heroHighlight: 'SEO Partner',
      heroDescription: 'Comprehensive resources to help you evaluate, select, and work with top-tier SEO agencies. We bridge the gap between complex data and business growth.',
      heroPrimaryButtonText: 'Browse Top Rated',
      heroPrimaryButtonLink: '/',
      heroSecondaryButtonText: 'Download Guide',
      heroSecondaryButtonLink: '#',
      sections: {
        evaluationCriteria: {
          sectionLabel: 'Selection Framework',
          sectionTitle: 'Agency Evaluation Criteria',
          sectionDescription: 'Our data-driven checklist ensures you skip the fluff and find partners that deliver measurable ROI.',
          mainCard: {
            icon: 'verified',
            title: 'Technical Proficiency Audit',
            description: 'Evaluate an agency\'s ability to handle complex site architectures, Core Web Vitals, and semantic schema markup.',
            checklist: ['Backlink Profile Integrity', 'Content Strategy Depth', 'Page Speed Optimization', 'Mobile-First Readiness']
          },
          roiCard: {
            title: 'ROI Modeling',
            description: 'Top agencies don\'t just report rankings; they forecast revenue and lead generation metrics.',
            buttonText: 'View Calculator'
          },
          smallCards: [
            { icon: 'contract', title: 'Transparency & Ethics', description: 'Ensure the agency follows White-Hat guidelines and provides full visibility into their process.' },
            { icon: 'forum', title: 'Reporting Frequency', description: 'Dedicated account managers and real-time dashboarding should be standard, not an extra.' },
            { icon: 'history', title: 'Proven Track Record', description: 'Case studies should demonstrate long-term retention and historical performance in your niche.' }
          ]
        },
        pricing: {
          title: 'SEO Pricing Breakdown:',
          highlight: 'What Should You Pay?',
          description: 'The cost of SEO can vary from $500 to $50,000 per month. Our comprehensive guide deconstructs the pricing models—hourly, retainer, and project-based—to ensure you\'re getting fair market value.',
          items: [
            { icon: 'payments', text: 'Monthly Retainers: $2,500 - $10k+' },
            { icon: 'speed', text: 'Project-Based: $5k - $25k' }
          ],
          buttonText: 'Full Pricing Guide',
          stats: [
            { label: 'Average ROI', value: '320%' },
            { label: 'Payback Period', value: '6 Mo' }
          ]
        }
      },
      seoTitle: 'FindAnSEOAgency | Your Path to the Right SEO Partner',
      seoDescription: 'Comprehensive resources to help you evaluate, select, and work with top-tier SEO agencies.'
    },
    status: 'published'
  });

  // Blog page
  await strapi.documents('api::page.page').create({
    data: {
      title: 'Blog',
      slug: 'blog',
      heroEyebrow: 'Editorial Intelligence',
      heroTitle: 'Deep Dives into',
      heroHighlight: 'SEO & AI',
      heroDescription: 'Analyzing the intersection of generative search, technical optimization, and high-performance agency partnerships.',
      sections: {
        categories: ['All Insights', 'AI Optimization', 'SEO Basics', 'Agency Reviews', 'Industry News']
      },
      seoTitle: 'Blog | FindAnSEOAgency',
      seoDescription: 'Deep dives into SEO and AI — analyzing generative search, technical optimization, and agency partnerships.'
    },
    status: 'published'
  });

  console.log('🌱 Seeding complete!');
}
