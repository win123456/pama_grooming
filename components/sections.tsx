import Link from 'next/link';
import type { ReactNode } from 'react';
import {getContact,getServices} from '@/lib/site-content';
import {getArticles} from '@/lib/articles';
import {WorkGallery} from './work-gallery';
import {CustomerReviews} from './customer-reviews';
import { BookingButton } from './booking';
import {Button} from '@/components/ui/button';
import {ArrowUpRight,MapPin,MessageCircle} from 'lucide-react';

export function PageTitle({eyebrow,title,description}: {eyebrow:string;title:string;description:string}) {
  return <div className="wrap"><div className="page-title"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></div>;
}
export function SectionHeading({eyebrow,title,children}: {eyebrow:string;title:string;children?:ReactNode}) {
  return <div className="section-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{children}</div>;
}
export async function BranchCards({maps = false}: {maps?:boolean}) {
  const {branches}=await getContact();
  return <div className="branch-grid">{branches.map((branch,index) => {
    const query = encodeURIComponent(`PAMA Grooming ${branch.name}`);
    return <article className="branch" key={branch.name}>
      <span className="tag">PAMA GROOMING · BRANCH 0{index+1}</span><h3>สาขา{branch.name}</h3>
      <p>อาบน้ำ · ตัดขน · ฝากเลี้ยง สุนัขและแมว<br/>เวลาเปิด–ปิด: {branch.hours || 'กรุณาสอบถามสาขาผ่าน LINE'}</p>
      {branch.address && <p>{branch.address}</p>}<div className="contact"><a href={`tel:${branch.phone}`}>โทร {branch.display} ↗</a><a href={branch.url} target="_blank" rel="noopener noreferrer">LINE {branch.line} ↗</a>{branch.fb && <a href={branch.fb} target="_blank" rel="noopener noreferrer">Facebook สาขา{branch.name} ↗</a>}</div>
      <div className="actions"><Button asChild><a href={branch.url} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true"/>จองคิวสาขานี้<ArrowUpRight className="action-arrow" aria-hidden="true"/></a></Button><Button variant="outline" asChild><a href={branch.mapUrl || `https://www.google.com/maps/search/?api=1&query=${query}`} target="_blank" rel="noopener noreferrer"><MapPin aria-hidden="true"/>ค้นหาแผนที่</a></Button></div>
      {maps && <><iframe title={`แผนที่ค้นหา PAMA Grooming ${branch.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={branch.mapEmbedUrl || `https://maps.google.com/maps?q=${query}&output=embed`}/>{!branch.mapEmbedUrl && <p className="note">แผนที่แสดงผลการค้นหา กรุณายืนยันหมุดร้านกับสาขาก่อนเดินทาง</p>}</>}
    </article>;
  })}</div>;
}
export async function ServiceCards() {
  const {services,imageNote}=await getServices();
  return <><div className="cards">{services.map(service => <article className="service" key={`${service.number}-${service.title}`}>
    <Link href="/services" aria-label={`ดูบริการและราคา ${service.title}`}><img src={service.image} alt={service.imageAlt?.replaceAll('ภาพประกอบ','') || service.title} loading="lazy" width={700} height={460}/></Link>
    <div className="body"><span className="num">{service.number} / {service.label}</span><h3>{service.title}</h3><p>{service.description}</p><div className="row"><span>สอบถามราคาผ่าน LINE</span><Link className="link" href="/services">ดูรายละเอียด ↗</Link></div></div>
  </article>)}</div>{imageNote && !imageNote.includes('ภาพประกอบ') && <p className="note">{imageNote}</p>}</>;
}
export function CallToAction() {
  return <div className="wrap section"><div className="callout"><div><h2>นัดวันดูแล ให้เจ้าตัวโปรด</h2><p>เลือกสาขาที่สะดวก แล้วทัก LINE เพื่อสอบถามราคาและคิวว่าง</p></div><BookingButton/></div></div>;
}
export function Gallery() {
  return <WorkGallery/>;
}
export function Reviews() {
  return <CustomerReviews/>;
}
export async function Articles() {
  const posts=await getArticles();
  if(!posts.length)return <p className="muted">กำลังเตรียมบทความดี ๆ สำหรับเพื่อนตัวโปรดของคุณ</p>;
  return <div className="cards articles">{posts.map(post => <article key={post._id}>{post.coverUrl && <Link href={`/journal/${post.slug}`} tabIndex={-1} aria-hidden="true"><img className="article-card-image" src={post.coverUrl} alt={post.coverAlt||''} loading="lazy"/></Link>}<div className="label">{post.category}</div><h3>{post.title}</h3><p>{post.intro}</p><Link className="link" href={`/journal/${post.slug}`}>อ่านบทความ ↗</Link></article>)}</div>;
}
export async function Footer() {
  const {branches}=await getContact();
  return <footer><div className="wrap"><div className="footer-grid"><div><Link className="logo footer-logo" href="/">PAMA<small>GROOMING & CARE</small></Link><p className="footer-description">ดูแลด้วยใจ ให้ทุกวันของน้องเป็นวันที่ดี<br/>อาบน้ำ · ตัดขน · ฝากเลี้ยง สุนัขและแมว</p></div><div><h4>สำรวจ PAMA</h4><Link href="/services">บริการและราคา</Link><Link href="/branches">สาขาของเรา</Link><Link href="/gallery">ผลงานของเรา</Link><Link href="/journal">สาระน่ารู้</Link></div>{branches.map(branch => <div key={branch.name}><h4>{branch.name}</h4><a href={`tel:${branch.phone}`}>{branch.display}</a><a href={branch.url} target="_blank" rel="noopener noreferrer">LINE {branch.line}</a>{branch.fb && <a href={branch.fb} target="_blank" rel="noopener noreferrer">Facebook ↗</a>}</div>)}</div><div className="footer-bottom"><span>© {new Date().getFullYear()} PAMA GROOMING. All rights reserved.</span><span>Made for little paws, with a lot of love. ♡</span></div></div></footer>;
}
