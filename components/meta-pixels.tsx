'use client';
import Script from 'next/script';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
type Pixel={pixelId:string;enabled:boolean};
type Fbq={(...args:unknown[]):void;callMethod?:(...args:unknown[])=>void;queue:unknown[][];push?:Fbq;loaded?:boolean;version?:string};
declare global {interface Window{fbq?:Fbq;_fbq?:Fbq;pamaPixelIds?:Set<string>;}}
export function MetaPixels({pixels}:{pixels:Pixel[]}){
 const pathname=usePathname();
 const [ready,setReady]=useState(false);
 const last=useRef('');
 const ids=[...new Set(pixels.filter(p=>p.enabled&&/^[0-9]{5,30}$/.test(p.pixelId)).map(p=>p.pixelId))];
 const key=ids.join(',');
 const enabled=process.env.NODE_ENV==='production'&&!!key&&!pathname.startsWith('/admin');
 useEffect(()=>{
  if(!enabled||!ready||!window.fbq)return;
  const current=pathname+'|'+key;
  if(last.current===current)return;
  last.current=current;
  const fbq=window.fbq;
  const initialized=window.pamaPixelIds??=new Set<string>();
  for(const id of key.split(',')){
   if(!initialized.has(id)){
    fbq('set','autoConfig',false,id);
    fbq('init',id);
    initialized.add(id);
   }
   fbq('trackSingle',id,'PageView');
  }
 },[pathname,key,enabled,ready]);
 if(!enabled)return null;
 return <><Script id="pama-meta-queue" strategy="afterInteractive" onReady={()=>{
  if(!window.fbq){
   const queue:unknown[][]=[];
   const fbq=((...args:unknown[])=>{if(fbq.callMethod)fbq.callMethod(...args);else queue.push(args);}) as Fbq;
   fbq.queue=queue;fbq.push=fbq;fbq.loaded=true;fbq.version='2.0';
   window.fbq=fbq;window._fbq??=fbq;
  }
  setReady(true);
 }}>{'/* Initialize Meta Pixel queue before sending events. */'}</Script>{ready&&<Script id="pama-meta-library" src="https://connect.facebook.net/en_US/fbevents.js" strategy="afterInteractive"/>}</>;
}
