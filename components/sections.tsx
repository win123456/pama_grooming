import Link from 'next/link';
import type { ReactNode } from 'react';
import { branches, images, posts, services } from '@/lib/content';
import { BookingButton } from './booking';

export function PageTitle({eyebrow,title,description}: {eyebrow:string;title:string;description:string}) {
  return <div className="wrap"><div className="page-title"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></div>;
}
export function SectionHeading({eyebrow,title,children}: {eyebrow:string;title:string;children?:ReactNode}) {
  return <div className="section-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{children}</div>;
}
export function BranchCards({maps = false}: {maps?:boolean}) {
  return <div className="branch-grid">{branches.map((branch,index) => {
    const query = encodeURIComponent(`PAMA Grooming ${branch.name}`);
    return <article className="branch" key={branch.name}>
      <span className="tag">PAMA GROOMING · BRANCH 0{index+1}</span><h3>สาขา{branch.name}</h3>
      <p>อาบน้ำ · ตัดขน · ฝากเลี้ยง สุนัขและแมว<br/>เวลาเปิด–ปิด: กรุณาสอบถามสาขาผ่าน LINE</p>
      <div className="contact"><a href={`tel:${branch.phone}`}>โทร {branch.display} ↗</a><a href={branch.url} target="_blank" rel="noopener noreferrer">LINE {branch.line} ↗</a><a href={branch.fb} target="_blank" rel="noopener noreferrer">Facebook สาขา{branch.name} ↗</a></div>
      <div className="actions"><a className="btn" href={branch.url} target="_blank" rel="noopener noreferrer">จองคิวสาขานี้ ↗</a><a className="btn outline" href={`https://www.google.com/maps/search/?api=1&query=${query}`} target="_blank" rel="noopener noreferrer">ค้นหาแผนที่ ↗</a></div>
      {maps && <><iframe title={`แผนที่ค้นหา PAMA Grooming ${branch.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://maps.google.com/maps?q=${query}&output=embed`}/><p className="note">แผนที่แสดงผลการค้นหา กรุณายืนยันหมุดร้านกับสาขาก่อนเดินทาง</p></>}
    </article>;
  })}</div>;
}
export function ServiceCards() {
  return <><div className="cards">{services.map(service => <article className="service" key={service.number}>
    <img src={service.image} alt={`ภาพประกอบบริการ ${service.title}`} loading="lazy" width={700} height={460}/>
    <div className="body"><span className="num">{service.number} / {service.label}</span><h3>{service.title}</h3><p>{service.description}</p><div className="row"><span>สอบถามราคาผ่าน LINE</span><Link className="link" href="/services">ดูรายละเอียด ↗</Link></div></div>
  </article>)}</div><p className="note">ภาพประกอบบรรยากาศ ไม่ใช่ภาพผลงานของร้าน</p></>;
}
export function CallToAction() {
  return <div className="wrap section"><div className="callout"><div><h2>นัดวันดูแล ให้เจ้าตัวโปรด</h2><p>เลือกสาขาที่สะดวก แล้วทัก LINE เพื่อสอบถามราคาและคิวว่าง</p></div><BookingButton/></div></div>;
}
export function Gallery() {
  return <><div className="gallery">{[[images.dog,'ช่วงเวลาดี ๆ ของน้องหมา'],[images.cat,'ความน่ารักของเพื่อนตัวเล็ก'],[images.hero,'พร้อมสำหรับวันสดใส']].map(([image,label]) => <figure key={label}><img src={image} alt="ภาพประกอบสัตว์เลี้ยง" loading="lazy" width={700} height={600}/><figcaption>{label} · ภาพประกอบ</figcaption></figure>)}</div>
    <div className="reviewbox gallery-pending"><h3>Before & After จาก PAMA</h3><p>กำลังเตรียมภาพผลงานจริงของแต่ละสาขา ระหว่างนี้ชมภาพล่าสุดและสอบถามตัวอย่างทรงขนได้ทาง Facebook ของร้าน</p><div className="branch-grid">{branches.map(branch => <a className="link" key={branch.name} href={branch.fb} target="_blank" rel="noopener noreferrer">ชมผลงานสาขา{branch.name} ↗</a>)}</div></div>
  </>;
}
export function Reviews() {
  return <div className="branch-grid">{branches.map(branch => <article className="reviewbox" key={branch.name}><span className="eyebrow">CUSTOMER STORIES</span><h3>สาขา{branch.name}</h3><p>ดูความคิดเห็นจากลูกค้าบน Facebook ของสาขา<br/>คะแนนและลิงก์รีวิว Google: อยู่ระหว่างยืนยันข้อมูล</p><a className="btn outline" href={branch.fb} target="_blank" rel="noopener noreferrer">ดูความคิดเห็นบน Facebook ↗</a></article>)}</div>;
}
export function Articles() {
  return <div className="cards articles">{posts.map(post => <article key={post.slug}><div className="label">{post.category}</div><h3>{post.title}</h3><p>{post.intro}</p><Link className="link" href={`/journal/${post.slug}`}>อ่านบทความ ↗</Link></article>)}</div>;
}
export function Footer() {
  return <footer><div className="wrap"><div className="footer-grid"><div><Link className="logo footer-logo" href="/">PAMA<small>GROOMING & CARE</small></Link><p className="footer-description">ดูแลด้วยใจ ให้ทุกวันของน้องเป็นวันที่ดี<br/>อาบน้ำ · ตัดขน · ฝากเลี้ยง สุนัขและแมว</p></div><div><h4>สำรวจ PAMA</h4><Link href="/services">บริการและราคา</Link><Link href="/branches">สาขาของเรา</Link><Link href="/gallery">ผลงานของเรา</Link><Link href="/journal">สาระน่ารู้</Link></div>{branches.map(branch => <div key={branch.name}><h4>{branch.name}</h4><a href={`tel:${branch.phone}`}>{branch.display}</a><a href={branch.url} target="_blank" rel="noopener noreferrer">LINE {branch.line}</a><a href={branch.fb} target="_blank" rel="noopener noreferrer">Facebook ↗</a></div>)}</div><div className="footer-bottom"><span>© {new Date().getFullYear()} PAMA GROOMING. All rights reserved.</span><span>Made for little paws, with a lot of love. ♡</span></div></div></footer>;
}
