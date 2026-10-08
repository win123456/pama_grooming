'use client';
import {useEffect,useState} from 'react';
import {ArrowUp} from 'lucide-react';
import {usePathname} from 'next/navigation';
import './back-to-top.css';
export function BackToTop(){
 const [visible,setVisible]=useState(false);
 const pathname=usePathname();
 useEffect(()=>{const update=()=>setVisible(window.scrollY>600);update();window.addEventListener('scroll',update,{passive:true});return()=>window.removeEventListener('scroll',update);},[pathname]);
 return <button type="button" className="back-to-top" aria-label="กลับขึ้นด้านบน" hidden={!visible} onClick={()=>{window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}><ArrowUp size={21}/></button>;
}
