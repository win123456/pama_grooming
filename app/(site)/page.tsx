import Link from 'next/link';
import type { Metadata } from 'next';
import { BookingButton } from '@/components/booking';
import { Articles, BranchCards, CallToAction, Gallery, Reviews, SectionHeading, ServiceCards } from '@/components/sections';
import { images } from '@/lib/content';

export const metadata: Metadata = {alternates:{canonical:'/'}};
export const revalidate=60;

export default function HomePage() {
  return <>
    <section className="wrap hero"><div><span className="eyebrow">A LITTLE CARE. A LOT OF LOVE.</span><h1>ดูแลด้วยใจ<br/>ให้ทุกวันของน้อง<br/>เป็นวันที่ดี <span className="hero-heart">♡</span></h1><p>PAMA GROOMING บริการอาบน้ำ ตัดขน และฝากเลี้ยง<br/>สำหรับน้องหมาน้องแมว เพราะเพื่อนตัวเล็กของคุณ<br/>ควรได้รับช่วงเวลาดี ๆ ในทุกครั้งที่มาเจอกัน</p><div className="actions"><BookingButton/><Link href="/services" className="btn outline">สำรวจบริการ ↗</Link></div><div className="hero-note"><span>♧</span>ต้อนรับน้องหมาและน้องแมว · 2 สาขาในกรุงเทพฯ</div></div><div className="hero-visual"><div className="stamp">LITTLE PAWS<br/>BIG LOVE<br/>♡</div><img className="hero-image" src={images.hero} alt="ภาพประกอบสุนัขโกลเด้นรีทรีฟเวอร์" width={1000} height={1000} fetchPriority="high"/><div className="float"><span>♡</span><div><strong>ความสุข เริ่มจากการดูแล</strong><small>Bath · Grooming · Boarding</small></div></div><span className="image-label">ภาพประกอบ</span></div></section>
    <div className="strip"><div className="wrap"><b>อาบน้ำ & ดูแลขน</b><i>✳</i><b>ตัดขน & จัดทรง</b><i>✳</i><b>ฝากเลี้ยงสัตว์เลี้ยง</b><i>✳</i><b>รามคำแหง 114 · พหลโยธิน 64</b></div></div>
    <section className="wrap section"><SectionHeading eyebrow="OUR SERVICES" title="ทุกการดูแล เพื่อเพื่อนตัวโปรด"><Link href="/services" className="link">บริการและราคาทั้งหมด ↗</Link></SectionHeading><ServiceCards/></section>
    <section className="soft section"><div className="wrap story"><img src={images.stay} alt="ภาพประกอบสุนัขสองตัว" loading="lazy" width={700} height={600}/><div><span className="eyebrow">HELLO, WE ARE PAMA</span><h2>เพราะน้องคือครอบครัว<br/>การดูแลจึงมีความหมาย</h2><p>จากวันอาบน้ำ ไปจนถึงวันฝากเลี้ยง PAMA เป็นอีกหนึ่งจุดหมายสำหรับการดูแลเพื่อนสี่ขา เลือกบริการและพูดคุยกับสาขาที่สะดวก เพื่อเตรียมการดูแลให้เหมาะกับน้องของคุณ</p><div className="points"><div><strong>ครบทั้ง 3 บริการ</strong><small>อาบน้ำ ตัดขน และฝากเลี้ยง</small></div><div><strong>เลือกได้ 2 สาขา</strong><small>รามคำแหงและพหลโยธิน</small></div><div><strong>พูดคุยก่อนจอง</strong><small>แจ้งรายละเอียดผ่าน LINE OA</small></div><div><strong>สำหรับหมาและแมว</strong><small>สอบถามบริการที่เหมาะกับน้อง</small></div></div><p className="note">ภาพประกอบบรรยากาศ</p></div></div></section>
    <section className="wrap section"><SectionHeading eyebrow="FIND YOUR PAMA" title="ใกล้บ้านคุณ ใกล้ใจน้อง"><p>เลือกสาขาที่สะดวก แล้วให้เราเป็นส่วนหนึ่ง<br/>ของวันดี ๆ ของเพื่อนตัวเล็ก</p></SectionHeading><BranchCards/></section>
    <section className="wrap section section-no-top"><SectionHeading eyebrow="OUR LITTLE FRIENDS" title="ความน่ารักที่อยากแบ่งปัน"><Link className="link" href="/gallery">ชมผลงานของเรา ↗</Link></SectionHeading><Gallery/></section>
    <section className="soft section"><div className="wrap"><SectionHeading eyebrow="FROM OUR CUSTOMERS" title="เสียงจากครอบครัวของน้อง"><Link className="link" href="/reviews">ดูช่องทางรีวิว ↗</Link></SectionHeading><Reviews/></div></section>
    <section className="wrap section"><SectionHeading eyebrow="THE PAMA JOURNAL" title="เรื่องเล็ก ๆ เพื่อการดูแลที่ดี"><Link className="link" href="/journal">อ่านสาระน่ารู้ ↗</Link></SectionHeading><Articles/></section><CallToAction/>
  </>;
}
