'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowRight,Sparkles,ChevronLeft,ChevronRight,X} from 'lucide-react';
import type {Work} from '@/lib/cms-defaults';
import './work-gallery.css';
export function WorkGalleryClient({works}:{works:Work[]}){
 const items=works.filter(w=>w.beforeUrl&&w.afterUrl);
 const photos=items.flatMap(w=>[{src:w.beforeUrl,title:w.title,caption:'BEFORE',illustration:w.illustration},{src:w.afterUrl,title:w.title,caption:'AFTER',illustration:w.illustration}]);
 const [active,setActive]=useState<number|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 const isOpen=active!==null;
 useEffect(()=>{if(!isOpen)return;const element=dialog.current;const previous=document.body.style.overflow;element?.showModal();document.body.style.overflow='hidden';return()=>{element?.close();document.body.style.overflow=previous;};},[isOpen]);
 function move(direction:number){setActive(i=>i===null?null:Math.floor(i/2)*2+((i%2+direction+2)%2));}
 const current=active===null?null:photos[active];
 return <><div className="work-grid">{items.map((item,index)=><article className={`work-card work-${item.tone}`} key={item._key} aria-labelledby={`work-${item._key}`}>
 <img className="work-backdrop" src={item.afterUrl} alt="" aria-hidden="true" width={1000} height={667} loading="lazy"/><div className="work-wash" aria-hidden="true"/>
 <div className="work-content"><div className="work-heading"><span className="work-kicker">PAMA GROOMING <Sparkles size={18} aria-hidden="true"/></span><span id={`work-${item._key}`} className="work-breed">{item.breed}</span></div>
 <div className="work-comparison">{['BEFORE','AFTER'].map((caption,i)=><figure className={`work-photo ${i===0?'work-before':'work-after'}`} key={caption}><button type="button" className="work-image-button" onClick={()=>setActive(index*2+i)} aria-label={`ขยายภาพ ${item.title} ${caption}`}><img src={i===0?item.beforeUrl:item.afterUrl} alt={`${item.title} ${caption}`} width={1000} height={667} loading="lazy"/></button><figcaption>{caption}</figcaption></figure>)}<span className="work-arrow" aria-hidden="true"><ArrowRight size={22}/></span></div>
 <div className="work-footer"><span>{item.style}</span></div></div>
 </article>)}</div>
 <dialog className="work-lightbox" ref={dialog} aria-labelledby="work-viewer-title" onClose={()=>{if(!dialog.current?.open)setActive(null);}} onClick={event=>{if(event.target===event.currentTarget){const r=event.currentTarget.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)setActive(null);}}} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();move(1);}if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}}}>
 <button className="work-viewer-close" type="button" aria-label="ปิดรูปภาพ" onClick={()=>setActive(null)}><X/></button>
 {current&&<><div className="work-viewer-heading"><h2 id="work-viewer-title">{current.title} · {current.caption}</h2><span aria-live="polite">{(active??0)%2+1} / 2</span></div><div className="work-viewer-image"><button className="work-viewer-nav work-viewer-prev" type="button" aria-label="ภาพก่อนหน้า" onClick={()=>move(-1)}><ChevronLeft/></button><button className="work-viewer-nav work-viewer-next" type="button" aria-label="ภาพถัดไป" onClick={()=>move(1)}><ChevronRight/></button><img src={current.src} alt={`${current.title} ${current.caption}`}/></div><div className="work-viewer-controls"><span>Before & After</span></div></>}
 </dialog></>;
}
