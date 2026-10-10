import {defaultHome,type HomeContent} from './home-content';
import {previousHomeFaqs} from './home-faqs';
import 'server-only';
import {confirmedPrices,confirmedPriceNote,defaultHomeFaqs} from './service-rates';
import {cache} from 'react';
import {createClient} from 'next-sanity';
import {apiVersion,dataset,projectId} from '@/sanity/env';
import {defaultContact,defaultServices,defaultGallery,type Branch,type Service,type Price,type Work} from './cms-defaults';
const client=createClient({projectId,dataset,apiVersion,useCdn:false,perspective:'published'});
type Heading={seoTitle?:string;seoDescription?:string;title:string;description:string;eyebrow:string};
export const getContact=cache(async():Promise<Heading & {branches:Branch[]}>=>{
 const doc=await client.fetch<(Heading & {branches:Branch[]})|null>('*[_type=="contactSettings" && _id=="pama-contact-settings"][0]{seoTitle,seoDescription,title,description,eyebrow,branches}',{},{next:{revalidate:60,tags:['site-content']}});
 return doc ? {...defaultContact,...doc,branches:doc.branches||[]} : defaultContact;
});
export const getServices=cache(async():Promise<Heading & {services:Service[];ratesImported?:boolean;prices:Price[];homeFaqs:{_key:string;question:string;answer:string}[];faqs:{_key:string;question:string;answer:string}[];priceNote:string;imageNote:string}>=>{
 const doc=await client.fetch<(Heading & {services:Service[];ratesImported?:boolean;prices:Price[];homeFaqs:{_key:string;question:string;answer:string}[];faqs:{_key:string;question:string;answer:string}[];priceNote:string;imageNote:string})|null>('*[_type=="serviceSettings" && _id=="pama-service-settings"][0]{seoTitle,seoDescription,title,description,eyebrow,priceNote,imageNote,ratesImported,prices,faqs,homeFaqs,services[]{number,title,description,label,"image":coalesce(image.asset->url,imageUrl),"imageAlt":image.alt}}',{},{next:{revalidate:60,tags:['site-content']}});
 const oldExamples=!!doc && !doc.ratesImported && !doc.prices?.some(row=>row.weight);
 return doc ? {...defaultServices,...doc,services:doc.services||[],prices:oldExamples?confirmedPrices:doc.prices||[],priceNote:oldExamples?confirmedPriceNote:doc.priceNote,homeFaqs:doc.homeFaqs?.length===previousHomeFaqs.length&&doc.homeFaqs.every((item,i)=>item.question===previousHomeFaqs[i].question&&item.answer===previousHomeFaqs[i].answer)?defaultHomeFaqs:doc.homeFaqs??defaultHomeFaqs,faqs:doc.faqs||[]} : defaultServices;
});
export const getGallery=cache(async():Promise<Heading & {works:Work[]}>=>{
 const doc=await client.fetch<(Heading & {works:Work[]})|null>('*[_type=="gallerySettings" && _id=="pama-gallery-settings"][0]{seoTitle,seoDescription,title,description,eyebrow,works[]{_key,breed,title,style,tone,illustration,"beforeUrl":coalesce(before.asset->url,beforeUrl),"afterUrl":coalesce(after.asset->url,afterUrl)}}',{},{next:{revalidate:60,tags:['site-content']}});
 return doc ? {...defaultGallery,...doc,works:doc.works||[]} : defaultGallery;
});

export const getHome=cache(async():Promise<HomeContent>=>{
 const doc=await client.fetch<Partial<HomeContent>|null>('*[_type=="homeSettings" && _id=="pama-home-settings"][0]{...,"heroImageUrl":coalesce(heroImage.asset->url,heroImageUrl),"storyImageUrl":coalesce(storyImage.asset->url,storyImageUrl)}',{},{next:{revalidate:60,tags:['site-content']}});
 return Object.fromEntries(Object.entries(defaultHome).map(([key,value])=>[key,doc?.[key as keyof HomeContent]??value])) as HomeContent;
});

export type PageSeo={seoTitle?:string;seoDescription?:string};
export const getPageSeo=cache(async(type:string,id:string):Promise<PageSeo>=>await client.fetch<PageSeo|null>('*[_type==$type && _id==$id][0]{seoTitle,seoDescription}',{type,id},{next:{revalidate:60,tags:['site-content']}})??{});
export const getWebsite=cache(async()=>await client.fetch<{metaPixels?:{_key:string;name:string;pixelId:string;enabled:boolean}[];siteTitle?:string;siteName?:string;siteDescription?:string;faviconUrl?:string;branchesSeo?:{title?:string;description?:string};reviewsSeo?:{title?:string;description?:string}}|null>('*[_type=="websiteSettings" && _id=="pama-website-settings"][0]{metaPixels[]{_key,name,pixelId,enabled},siteTitle,siteName,siteDescription,"faviconUrl":favicon.asset->url,branchesSeo,reviewsSeo}',{},{next:{revalidate:60,tags:['site-content']}})??{});
