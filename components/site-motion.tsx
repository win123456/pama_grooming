'use client';

import {useEffect,useRef} from 'react';
import {usePathname} from 'next/navigation';

export function SiteMotion() {
  const pathname=usePathname();
  const progress=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const main=document.getElementById('main-content');
    if(!main)return;
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
    const seen=new WeakSet<Element>();
    const animations=new Set<Animation>();
    const selector='.hero > div, .section-head, .service, .branch, .journal-card, .reviewbox, .story > *, .gallery figure, .work-card, .callout, .page-title, .journal-hero, .article-body > h2';
    const observer=new IntersectionObserver(entries=>{
      let order=0;
      for(const entry of entries){
        if(!entry.isIntersecting)continue;
        observer.unobserve(entry.target);
        if(preference.matches)continue;
        const animation=entry.target.animate([
          {opacity:0,transform:'translateY(24px)'},
          {opacity:1,transform:'translateY(0)'},
        ],{duration:650,delay:Math.min(order++,3)*70,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
        animations.add(animation);
        animation.onfinish=()=>animations.delete(animation);
      }
    },{threshold:0.08});
    function scan(){main!.querySelectorAll(selector).forEach(element=>{if(!seen.has(element)){seen.add(element);observer.observe(element)}})}
    scan();
    const changes=new MutationObserver(scan);
    changes.observe(main,{childList:true,subtree:true});
    let frame=0;
    function update(){frame=0;const height=document.documentElement.scrollHeight-window.innerHeight;const ratio=height>0?Math.min(1,Math.max(0,window.scrollY/height)):0;if(progress.current)progress.current.style.transform=`scaleX(${ratio})`;}
    function onScroll(){if(!frame)frame=requestAnimationFrame(update)}
    function onPreference(){if(preference.matches){animations.forEach(animation=>animation.cancel());animations.clear()}}
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    preference.addEventListener('change',onPreference);
    update();
    return()=>{observer.disconnect();changes.disconnect();animations.forEach(animation=>animation.cancel());cancelAnimationFrame(frame);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);preference.removeEventListener('change',onPreference)};
  },[pathname]);
  return <div className="site-scroll-progress" ref={progress} aria-hidden="true"/>;
}
