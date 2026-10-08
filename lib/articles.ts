import 'server-only';
import {cache} from 'react';
import {createClient} from 'next-sanity';
import type {PortableTextBlock} from '@portabletext/types';
import {apiVersion,dataset,projectId} from '@/sanity/env';
import {posts as existingPosts} from './content';
import {researchedArticles,seedDocument} from '@/sanity/researched-articles';
import {articleCover} from './article-images';

export type Article = {
  _id:string; title:string; slug:string; category:string; intro:string;
  publishedAt:string; coverUrl?:string; coverAlt?:string;
  seoTitle?:string; seoDescription?:string; topic?:string; featured?:boolean; body:PortableTextBlock[];
};
const client=createClient({projectId,dataset,apiVersion,useCdn:false,perspective:'published'});
const fields=`_id,title,"slug":slug.current,category,intro,publishedAt,"coverUrl":coalesce(cover.asset->url,coverUrl),"coverAlt":coalesce(cover.alt,coverAlt),seoTitle,seoDescription,topic,featured,body`;
const publishedFilter=`_type == "article" && defined(slug.current) && !(_id in path("drafts.**"))`;
// Preserve the three existing website articles until their transactional CMS import is complete.
// CMS content always takes precedence; once imported, deletion/unpublishing never resurrects legacy content.
function legacyArticles():Article[] {return existingPosts.map(post=>({_id:`pama-article-${post.slug}`,title:post.title,slug:post.slug,category:post.category,intro:post.intro,publishedAt:'',body:post.paragraphs.map((text,index)=>({_key:`paragraph-${index}`,_type:'block',style:'normal',markDefs:[],children:[{_key:`span-${index}`,_type:'span',text,marks:[]}]}))}));}
function starterArticles():Article[] {
  return researchedArticles.map(seed=>{
    const doc=seedDocument(seed,'2026-10-08T00:00:00+07:00');
    return {...doc,slug:seed.slug};
  });
}
export const getJournalSettings=cache(async():Promise<{title:string;description:string;legacyImported?:boolean;researchedImported?:boolean}|null>=>client.fetch(`*[_type == "journalSettings" && _id == "pama-journal-settings"][0]{title,description,legacyImported,researchedImported}`,{},{next:{revalidate:60,tags:['articles']}}));
export const getArticles=cache(async():Promise<Article[]>=>{
  const [articles,settings,managed]=await Promise.all([client.fetch<Article[]>(`*[${publishedFilter}] | order(publishedAt desc){${fields}}`,{},{next:{revalidate:60,tags:['articles']}}),getJournalSettings(),client.withConfig({perspective:'raw'}).fetch<{_id:string;slug?:string}[]>(`*[_type == "article"]{_id,"slug":slug.current}`,{},{next:{revalidate:60,tags:['articles']}})]);
  const fallback=[...(settings?.legacyImported?[]:legacyArticles()),...(settings?.researchedImported?[]:starterArticles())];
  return [...articles,...fallback.filter(post=>!managed.some(record=>record.slug===post.slug||record._id.replace(/^drafts\./,'')===post._id))].map(post=>({...post,coverUrl:articleCover(post.slug,post.coverUrl)})).sort((a,b)=>(Date.parse(b.publishedAt)||0)-(Date.parse(a.publishedAt)||0));
});
export const getArticle=cache(async(slug:string):Promise<Article|null>=>{
  return (await getArticles()).find(post=>post.slug===slug)||null;
});
