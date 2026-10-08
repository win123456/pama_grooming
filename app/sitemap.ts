import type { MetadataRoute } from 'next';
import { getSiteUrl, navigation, posts } from '@/lib/content';
export default function sitemap():MetadataRoute.Sitemap {
  return [...navigation.map(([path]) => path),...posts.map(post => `/journal/${post.slug}`)].map(path => ({url:`${getSiteUrl()}${path}`}));
}
