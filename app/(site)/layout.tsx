import type {ReactNode} from 'react';
import './globals.css';
import './ui.css';
import {BookingProvider} from '@/components/booking';
import {Header} from '@/components/header';
import {Footer} from '@/components/sections';

export default function SiteLayout({children}:{children:ReactNode}) {
  return <><a className="skip-link" href="#main-content">ข้ามไปเนื้อหา</a><BookingProvider><Header/><main id="main-content">{children}</main><Footer/></BookingProvider></>;
}
