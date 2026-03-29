const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';

export async function fetchFromStrapi(endpoint: string, params?: Record<string, string>) {
  const url = new URL(`/api/${endpoint}`, STRAPI_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
}

export async function getGlobal() {
  return fetchFromStrapi('global');
}

export async function getPages() {
  return fetchFromStrapi('pages');
}

export async function getPageBySlug(slug: string) {
  const data = await fetchFromStrapi('pages', {
    'filters[slug][$eq]': slug,
  });
  return Array.isArray(data) ? data[0] : data;
}

export async function getBlogPosts() {
  return fetchFromStrapi('blog-posts', {
    'sort': 'order:asc',
  });
}

export async function getAgencies() {
  return fetchFromStrapi('agencies', {
    'sort': 'order:asc',
  });
}

export async function getServiceCategories() {
  return fetchFromStrapi('service-categories', {
    'sort': 'order:asc',
  });
}

export async function getTrustPartners() {
  return fetchFromStrapi('trust-partners', {
    'sort': 'order:asc',
  });
}
