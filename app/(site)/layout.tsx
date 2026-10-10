import {MetaPixels} from '@/components/meta-pixels';
import {GoogleAnalytics} from '@/components/google-analytics';
import type {ReactNode} from 'react';
import './globals.css';
import './ui.css';
import '@/components/site-motion.css';
import './polish.css';
import {SiteMotion} from '@/components/site-motion';
import {BackToTop} from '@/components/back-to-top';
import {BookingProvider} from '@/components/booking';
import {Header} from '@/components/header';
import {Footer} from '@/components/sections';
import {getContact,getWebsite} from '@/lib/site-content';

export default async function SiteLayout({children}:{children:ReactNode}) {
  const [{branches},site]=await Promise.all([getContact(),getWebsite()]);
  return <><a className="skip-link" href="#main-content">ข้ามไปเนื้อหา</a><BookingProvider branches={branches}><GoogleAnalytics/><MetaPixels pixels={site.metaPixels||[]}/><SiteMotion/><BackToTop/><Header/><main id="main-content">{children}</main><Footer/></BookingProvider></>;
}
