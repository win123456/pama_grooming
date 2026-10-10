import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CallToAction, PageTitle } from '@/components/sections';
import {getArticle,getArticles} from '@/lib/articles';
import {ArticleBody} from '@/components/article-body';

type Props = {params:Promise<{slug:string}>};
export const dynamicParams = true;
export const revalidate=60;
export async function generateStaticParams(){return (await getArticles()).map(post => ({slug:post.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {slug} = await params;const post = await getArticle(slug);
  if(!post) return {};
  return {title:post.seoTitle?{absolute:post.seoTitle}:post.title, description:post.seoDescription||post.intro, alternates:{canonical:`/journal/${slug}`}, openGraph:{title:post.seoTitle||post.title,description:post.seoDescription||post.intro,type:'article',url:`/journal/${slug}`,...(post.publishedAt?{publishedTime:post.publishedAt}:{}),...(post.coverUrl?{images:[{url:post.coverUrl,alt:post.coverAlt||post.title}]}:{})}};
}
export default async function ArticlePage({params}:Props) {
  const {slug} = await params;const post = await getArticle(slug);
  if(!post) notFound();
  return <><PageTitle eyebrow={post.category} title={post.title} description={post.intro}/><article className="wrap section page-section"><div className="article-body">{post.coverUrl&&<img className="article-cover" src={post.coverUrl} alt={post.coverAlt||post.title}/>}<ArticleBody body={post.body}/><Link className="link" href="/journal">← กลับไปสาระน่ารู้</Link></div></article><CallToAction/></>;
}
