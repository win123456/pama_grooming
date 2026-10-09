import {previousHomeFaqs} from './home-faqs';
import 'server-only';
import {confirmedPrices,confirmedPriceNote,defaultHomeFaqs} from './service-rates';
import {cache} from 'react';
import {createClient} from 'next-sanity';
import {apiVersion,dataset,projectId} from '@/sanity/env';
import {defaultContact,defaultServices,defaultGallery,type Branch,type Service,type Price,type Work} from './cms-defaults';
const client=createClient({projectId,dataset,apiVersion,useCdn:false,perspective:'published'});
type Heading={title:string;description:string;eyebrow:string};
export const getContact=cache(async():Promise<Heading & {branches:Branch[]}>=>{
 const doc=await client.fetch<(Heading & {branches:Branch[]})|null>('*[_type=="contactSettings" && _id=="pama-contact-settings"][0]{title,description,eyebrow,branches}',{},{next:{revalidate:60,tags:['site-content']}});
 return doc ? {...defaultContact,...doc,branches:doc.branches||[]} : defaultContact;
});
export const getServices=cache(async():Promise<Heading & {services:Service[];ratesImported?:boolean;prices:Price[];homeFaqs:{_key:string;question:string;answer:string}[];faqs:{_key:string;question:string;answer:string}[];priceNote:string;imageNote:string}>=>{
 const doc=await client.fetch<(Heading & {services:Service[];ratesImported?:boolean;prices:Price[];homeFaqs:{_key:string;question:string;answer:string}[];faqs:{_key:string;question:string;answer:string}[];priceNote:string;imageNote:string})|null>('*[_type=="serviceSettings" && _id=="pama-service-settings"][0]{title,description,eyebrow,priceNote,imageNote,ratesImported,prices,faqs,homeFaqs,services[]{number,title,description,label,"image":coalesce(image.asset->url,imageUrl),"imageAlt":image.alt}}',{},{next:{revalidate:60,tags:['site-content']}});
 const oldExamples=!!doc && !doc.ratesImported && !doc.prices?.some(row=>row.weight);
 return doc ? {...defaultServices,...doc,services:doc.services||[],prices:oldExamples?confirmedPrices:doc.prices||[],priceNote:oldExamples?confirmedPriceNote:doc.priceNote,homeFaqs:doc.homeFaqs?.length===previousHomeFaqs.length&&doc.homeFaqs.every((item,i)=>item.question===previousHomeFaqs[i].question&&item.answer===previousHomeFaqs[i].answer)?defaultHomeFaqs:doc.homeFaqs??defaultHomeFaqs,faqs:doc.faqs||[]} : defaultServices;
});
export const getGallery=cache(async():Promise<Heading & {works:Work[]}>=>{
 const doc=await client.fetch<(Heading & {works:Work[]})|null>('*[_type=="gallerySettings" && _id=="pama-gallery-settings"][0]{title,description,eyebrow,works[]{_key,breed,title,style,tone,illustration,"beforeUrl":coalesce(before.asset->url,beforeUrl),"afterUrl":coalesce(after.asset->url,afterUrl)}}',{},{next:{revalidate:60,tags:['site-content']}});
 return doc ? {...defaultGallery,...doc,works:doc.works||[]} : defaultGallery;
});
