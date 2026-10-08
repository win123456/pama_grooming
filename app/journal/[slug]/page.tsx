import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CallToAction, PageTitle } from '@/components/sections';
import { posts } from '@/lib/content';

type Props = {params:Promise<{slug:string}>};
export const dynamicParams = false;
export function generateStaticParams(){return posts.map(post => ({slug:post.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {slug} = await params;const post = posts.find(post => post.slug === slug);
  if(!post) return {};
  return {title:post.title, description:post.intro, alternates:{canonical:`/journal/${slug}`}, openGraph:{title:post.title,description:post.intro,type:'article',url:`/journal/${slug}`}};
}
export default async function ArticlePage({params}:Props) {
  const {slug} = await params;const post = posts.find(post => post.slug === slug);
  if(!post) notFound();
  return <><PageTitle eyebrow={post.category} title={post.title} description={post.intro}/><article className="wrap section page-section"><div className="article-body">{post.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<Link className="link" href="/journal">← กลับไปสาระน่ารู้</Link></div></article><CallToAction/></>;
}
