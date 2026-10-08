import type { MetadataRoute } from 'next';
import { getSiteUrl, navigation } from '@/lib/content';
import {getArticles} from '@/lib/articles';
export const revalidate=60;
export default async function sitemap():Promise<MetadataRoute.Sitemap> {
  const posts=await getArticles();
  return [...navigation.map(([path]) => path),...posts.map(post => `/journal/${post.slug}`)].map(path => ({url:`${getSiteUrl()}${path}`}));
}
