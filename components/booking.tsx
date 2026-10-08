'use client';

import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { branches } from '@/lib/content';

const BookingContext = createContext<(() => void) | null>(null);

export function BookingButton({ className = 'btn' }: {className?: string}) {
  const open = useContext(BookingContext);
  return <button className={className} onClick={() => open?.()}>จองคิวผ่าน LINE <span>↗</span></button>;
}

export function BookingProvider({children}: {children: ReactNode}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => () => document.body.classList.remove('locked'), []);
  function open() {ref.current?.showModal(); document.body.classList.add('locked');}
  return <BookingContext.Provider value={open}>
    {children}
    <BookingButton className="btn book-float" />
    <dialog ref={ref} aria-labelledby="booking-title" onClose={() => document.body.classList.remove('locked')} onClick={event => {
      if(event.target === ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) ref.current.close();
      }
    }}>
      <button className="close" aria-label="ปิดหน้าต่าง" onClick={() => ref.current?.close()}>×</button>
      <span className="eyebrow">LET’S MAKE A DATE</span><h3 id="booking-title">เลือกสาขาที่สะดวก</h3>
      <p>ทัก LINE เพื่อสอบถามราคาและคิวว่าง<br/>การจองจะสมบูรณ์เมื่อสาขายืนยันกับคุณ</p>
      {branches.map(branch => <a key={branch.name} className="btn" href={branch.url} target="_blank" rel="noopener noreferrer">{branch.name} · {branch.line} ↗</a>)}
    </dialog>
  </BookingContext.Provider>;
}
