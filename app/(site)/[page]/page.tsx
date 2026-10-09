import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BranchCards, CallToAction, Gallery, PageTitle, Reviews, ServiceCards } from '@/components/sections';
import { Prices } from '@/components/prices';
import {ServiceFaq} from '@/components/service-faq';
import { pageInfo } from '@/lib/content';
import {getArticles,getJournalSettings} from '@/lib/articles';
import {JournalPage} from '@/components/journal';
import {paginate} from '@/lib/pagination';
import {getContact,getServices,getGallery} from '@/lib/site-content';
async function getPageInfo(page:string) {
 const base=findPage(page);
 if(!base)return undefined;
 const data=page==='journal'?await getJournalSettings():page==='services'?await getServices():page==='gallery'?await getGallery():page==='contact'?await getContact():null;
 return {...base,...data};
}

type PageKey = keyof typeof pageInfo;
type Props = {params:Promise<{page:string}>;searchParams:Promise<{pg?:string|string[]}>};
export const dynamicParams = false;
export const revalidate=60;
export function generateStaticParams() {return Object.keys(pageInfo).map(page => ({page}));}
function findPage(key:string) {return Object.prototype.hasOwnProperty.call(pageInfo,key) ? pageInfo[key as PageKey] : undefined;}
export async function generateMetadata({params,searchParams}:Props):Promise<Metadata> {
  const {page} = await params;
  const info = await getPageInfo(page);
  if(!info) return {};
  let title = info.title;
  let url=`/${page}`;
  if(page==='journal') {
    const {pg}=await searchParams;
    const {page:current}=paginate(await getArticles(),Array.isArray(pg)?pg[0]:pg);
    if(current>1) {title+=` — หน้า ${current}`;url+=`?pg=${current}`;}
  }
  return {title,description:info.description,alternates:{canonical:url},openGraph:{title:`${title} | PAMA GROOMING`,description:info.description,url}};
}
export default async function ContentPage({params,searchParams}:Props) {
  const {page} = await params;
  const info = await getPageInfo(page);
  if(!info) notFound();
  if(page === 'journal') { const {pg} = await searchParams; return <JournalPage title={info.title} description={info.description} requestedPage={Array.isArray(pg)?pg[0]:pg}/>; }
  const pricing=page==='services'?await getServices():null;
  return <><PageTitle {...info}/><section className="wrap section page-section">
    {page === 'services' && <>{pricing && <Prices prices={pricing.prices} note={pricing.priceNote}/>}{!!pricing?.faqs.length && <ServiceFaq items={pricing.faqs}/>}</>}
    {(page === 'branches' || page === 'contact') && <BranchCards maps/>}
    {page === 'gallery' && <Gallery/>}
    {page === 'reviews' && <Reviews/>}
  </section><CallToAction/></>;
}
