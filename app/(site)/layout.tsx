import type {ReactNode} from 'react';
import './globals.css';
import './ui.css';
import '@/components/site-motion.css';
import {SiteMotion} from '@/components/site-motion';
import {BackToTop} from '@/components/back-to-top';
import {BookingProvider} from '@/components/booking';
import {Header} from '@/components/header';
import {Footer} from '@/components/sections';
import {getContact} from '@/lib/site-content';

export default async function SiteLayout({children}:{children:ReactNode}) {
  const {branches}=await getContact();
  return <><a className="skip-link" href="#main-content">ข้ามไปเนื้อหา</a><BookingProvider branches={branches}><SiteMotion/><BackToTop/><Header/><main id="main-content">{children}</main><Footer/></BookingProvider></>;
}
