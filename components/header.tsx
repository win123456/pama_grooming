'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {navigation} from '@/lib/content';
import {BookingButton} from './booking';
import {Button} from '@/components/ui/button';
import {Sheet,SheetTrigger,SheetClose,SheetContent,SheetHeader,SheetTitle,SheetDescription} from '@/components/ui/sheet';
import {Menu,PawPrint,ArrowUpRight} from 'lucide-react';
export function Header() {
 const pathname=usePathname();
 const links=navigation.map(([href,label])=>({href,label,active:pathname===href||(href!=='/'&&pathname.startsWith(href+'/'))}));
 return <><div className="top">PAMA GROOMING · ดูแลเพื่อนตัวโปรดของคุณ</div><header><div className="wrap nav">
 <Link className="logo" href="/" aria-label="PAMA Grooming หน้าแรก">PAMA<PawPrint className="brand-paw" aria-hidden="true"/><small>GROOMING & CARE</small></Link>
 <nav aria-label="เมนูหลัก">{links.map(({href,label,active})=><Link key={href} href={href} className={active?'active':''} aria-current={active?'page':undefined}>{label}</Link>)}</nav><BookingButton/>
 <Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" className="mobile-menu-button" aria-label="เปิดเมนู"><Menu aria-hidden="true"/></Button></SheetTrigger><SheetContent className="pama-menu"><SheetHeader><SheetTitle>PAMA GROOMING</SheetTitle><SheetDescription>ทุกการดูแล เพื่อเพื่อนตัวโปรด</SheetDescription></SheetHeader><div className="sheet-links">{links.map(({href,label,active})=><SheetClose key={href} asChild><Link href={href} className={active?'active':''} aria-current={active?'page':undefined}>{label}<ArrowUpRight size={17} aria-hidden="true"/></Link></SheetClose>)}</div><div className="sheet-note"><PawPrint aria-hidden="true"/><p>อาบน้ำ · ตัดขน · ฝากเลี้ยง<br/>รามคำแหง 114 · พหลโยธิน 64</p></div></SheetContent></Sheet>
 </div></header></>;
}
