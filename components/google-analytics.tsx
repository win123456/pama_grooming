'use client';
import Script from 'next/script';
import {useEffect} from 'react';
const measurementId=process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-8VDEVTX683';
declare global {interface Window {gtag?:(...args:unknown[])=>void;}}
export function GoogleAnalytics(){
 const enabled=process.env.NODE_ENV==='production' && /^G-[A-Z0-9]+$/.test(measurementId);
 useEffect(()=>{
  if(!enabled)return;
  function click(event:MouseEvent){
   if(location.pathname.startsWith('/admin'))return;
   const element=event.target instanceof Element?event.target.closest('a'):null;
   if(!element)return;
   const href=element.getAttribute('href')||'';
   const kind=href.startsWith('tel:')?'phone_click':/^https:\/\/(lin\.ee|line\.me)\//i.test(href)?'line_click':null;
   if(kind)window.gtag?.('event',kind,{page_path:location.pathname,transport_type:'beacon'});
  }
  document.addEventListener('click',click);
  return()=>document.removeEventListener('click',click);
 },[enabled]);
 if(!enabled)return null;
 return <><Script id="pama-ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(measurementId)});`}</Script><Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive"/></>;
}
