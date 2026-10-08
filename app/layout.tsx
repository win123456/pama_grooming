import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { BookingProvider } from '@/components/booking';
import { Header } from '@/components/header';
import { Footer } from '@/components/sections';
import { branches, getSiteUrl } from '@/lib/content';

const description = 'PAMA GROOMING บริการอาบน้ำ ตัดขน และฝากเลี้ยงสุนัขและแมว สาขารามคำแหง 114 และพหลโยธิน 64 จองคิวผ่าน LINE';
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {default:'PAMA GROOMING | อาบน้ำ ตัดขน ฝากเลี้ยงสัตว์เลี้ยง', template:'%s | PAMA GROOMING'},
  description,
  openGraph: {title:'PAMA GROOMING', description, type:'website', locale:'th_TH', siteName:'PAMA GROOMING'},
  icons: {icon:'/favicon.svg'},
};
export const viewport: Viewport = {themeColor:'#244E43'};

export default function RootLayout({children}: {children:ReactNode}) {
  const structuredData = {'@context':'https://schema.org', '@type':'Organization', name:'PAMA GROOMING', url:getSiteUrl(), description,
    department:branches.map(branch => ({'@type':'LocalBusiness',name:`PAMA GROOMING ${branch.name}`, telephone:`+66${branch.phone.slice(1)}`,sameAs:[branch.fb,branch.url]})),
  };
  return <html lang="th"><body>
    <a className="skip-link" href="#main-content">ข้ามไปเนื้อหา</a>
    <BookingProvider><Header/><main id="main-content">{children}</main><Footer/></BookingProvider>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,'\\u003c')}}/>
  </body></html>;
}
