'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navigation } from '@/lib/content';
import { BookingButton } from './booking';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <>
    <div className="top">PAMA GROOMING &nbsp; · &nbsp; BATH, GROOM & BOARDING &nbsp; · &nbsp; ดูแลเพื่อนตัวโปรดของคุณ</div>
    <header><div className="wrap nav">
      <Link className="logo" href="/" aria-label="PAMA Grooming หน้าแรก">PAMA<span className="paw">♧</span><small>GROOMING & CARE</small></Link>
      <button className="menu" aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? '×' : '☰'}</button>
      <nav id="navigation" aria-label="เมนูหลัก" className={open ? 'open' : ''}>
        {navigation.map(([href,label]) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href+'/'));
          return <Link key={href} href={href} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>;
        })}
      </nav><BookingButton/>
    </div></header>
  </>;
}
