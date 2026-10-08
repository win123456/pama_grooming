import 'server-only';
import {cache} from 'react';
import {createClient} from 'next-sanity';
import type {PortableTextBlock} from '@portabletext/types';
import {apiVersion,dataset,projectId} from '@/sanity/env';
import {posts as existingPosts} from './content';

export type Article = {
  _id:string; title:string; slug:string; category:string; intro:string;
  publishedAt:string; coverUrl?:string; coverAlt?:string;
  seoTitle?:string; seoDescription?:string; body:PortableTextBlock[];
};
const client=createClient({projectId,dataset,apiVersion,useCdn:false,perspective:'published'});
const fields=`_id,title,"slug":slug.current,category,intro,publishedAt,"coverUrl":cover.asset->url,"coverAlt":cover.alt,seoTitle,seoDescription,body`;
const publishedFilter=`_type == "article" && defined(slug.current) && !(_id in path("drafts.**"))`;
// Preserve the three existing website articles until their transactional CMS import is complete.
// CMS content always takes precedence; once imported, deletion/unpublishing never resurrects legacy content.
function legacyArticles():Article[] {return existingPosts.map(post=>({_id:`pama-article-${post.slug}`,title:post.title,slug:post.slug,category:post.category,intro:post.intro,publishedAt:'',body:post.paragraphs.map((text,index)=>({_key:`paragraph-${index}`,_type:'block',style:'normal',markDefs:[],children:[{_key:`span-${index}`,_type:'span',text,marks:[]}]}))}));}
export const getJournalSettings=cache(async():Promise<{title:string;description:string;legacyImported?:boolean}|null>=>client.fetch(`*[_type == "journalSettings" && _id == "pama-journal-settings"][0]{title,description,legacyImported}`,{},{next:{revalidate:60,tags:['articles']}}));
export const getArticles=cache(async():Promise<Article[]>=>{
  const [articles,settings]=await Promise.all([client.fetch<Article[]>(`*[${publishedFilter}] | order(publishedAt desc){${fields}}`,{},{next:{revalidate:60,tags:['articles']}}),getJournalSettings()]);
  return settings?.legacyImported?articles:[...articles,...legacyArticles().filter(post=>!articles.some(article=>article.slug===post.slug))];
});
export const getArticle=cache(async(slug:string):Promise<Article|null>=>{
  const article=await client.fetch<Article|null>(`*[${publishedFilter} && slug.current == $slug][0]{${fields}}`,{slug},{next:{revalidate:60,tags:['articles']}});
  if(article)return article;
  return (await getJournalSettings())?.legacyImported?null:legacyArticles().find(post=>post.slug===slug)||null;
});
