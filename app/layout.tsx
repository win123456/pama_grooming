import {getWebsite} from '@/lib/site-content';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { branches, getSiteUrl } from '@/lib/content';

const description = 'PAMA GROOMING บริการอาบน้ำ ตัดขน และฝากเลี้ยงสุนัขและแมว สาขารามคำแหง 114 และพหลโยธิน 64 จองคิวผ่าน LINE';
export async function generateMetadata():Promise<Metadata> {
 const site=await getWebsite();
 return {
  metadataBase: new URL(getSiteUrl()),
  title: {default:'PAMA GROOMING | อาบน้ำ ตัดขน ฝากเลี้ยงสัตว์เลี้ยง', template:'%s | PAMA GROOMING'},
  description:description,
  openGraph: {title:'PAMA GROOMING', description:description, type:'website', locale:'th_TH', siteName:'PAMA GROOMING'},
  icons: {icon:site.faviconUrl||'/favicon.svg',apple:site.faviconUrl||'/favicon.svg'},
};
}
export const viewport: Viewport = {themeColor:'#244E43'};

export default function RootLayout({children}: {children:ReactNode}) {
  const structuredData = {'@context':'https://schema.org', '@type':'Organization', name:'PAMA GROOMING', url:getSiteUrl(), description,
    department:branches.map(branch => ({'@type':'LocalBusiness',name:`PAMA GROOMING ${branch.name}`, telephone:`+66${branch.phone.slice(1)}`,sameAs:[branch.fb,branch.url]})),
  };
  return <html lang="th"><body style={{margin:0}}>
    {children}
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,'\\u003c')}}/>
  </body></html>;
}
