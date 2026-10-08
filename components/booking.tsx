'use client';

import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import type {Branch} from '@/lib/cms-defaults';
import {ArrowUpRight,MapPin,MessageCircle,X} from 'lucide-react';
import {Button} from '@/components/ui/button';

const BookingContext = createContext<(() => void) | null>(null);

export function BookingButton({ className = '' }: {className?: string}) {
  const open = useContext(BookingContext);
  return <Button type="button" className={`booking-button ${className}`} onClick={() => open?.()}><MessageCircle aria-hidden="true"/><span>จองคิวผ่าน LINE</span><ArrowUpRight className="action-arrow" aria-hidden="true"/></Button>;
}

export function BookingProvider({children,branches}: {children: ReactNode;branches:Branch[]}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => () => document.body.classList.remove('locked'), []);
  function open() {ref.current?.showModal(); document.body.classList.add('locked');}
  return <BookingContext.Provider value={open}>
    {children}
    <BookingButton className="book-float" />
    <dialog ref={ref} aria-labelledby="booking-title" onClose={() => document.body.classList.remove('locked')} onClick={event => {
      if(event.target === ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) ref.current.close();
      }
    }}>
      <Button type="button" variant="ghost" size="icon" className="booking-close" aria-label="ปิดหน้าต่าง" onClick={() => ref.current?.close()}><X aria-hidden="true"/></Button>
      <span className="eyebrow">LET’S MAKE A DATE</span><h3 id="booking-title">เลือกสาขาที่สะดวก</h3>
      <p>ทัก LINE เพื่อสอบถามราคาและคิวว่าง<br/>การจองจะสมบูรณ์เมื่อสาขายืนยันกับคุณ</p>
      <div className="booking-branches">{branches.map(branch => <Button key={branch.name} variant="outline" className="booking-branch" asChild><a href={branch.url} target="_blank" rel="noopener noreferrer"><MapPin className="branch-icon" aria-hidden="true"/><span><strong>{branch.name}</strong><small>LINE {branch.line}</small></span><ArrowUpRight className="action-arrow" aria-hidden="true"/></a></Button>)}</div>
    </dialog>
  </BookingContext.Provider>;
}
