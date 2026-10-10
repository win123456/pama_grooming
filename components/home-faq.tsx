import {BookingTextLink} from './booking';
import Link from 'next/link';
import {getServices} from '@/lib/site-content';
export async function HomeFaq({title='คำถามที่พบบ่อยเกี่ยวกับ PAMA GROOMING (FAQ)',eyebrow='GOOD TO KNOW',linkLabel='สอบถามเพิ่มเติม ↗'}:{title?:string;eyebrow?:string;linkLabel?:string}={}){
 const {homeFaqs}=await getServices();
 if(!homeFaqs.length)return null;
 return <section className="wrap section"><div className="section-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><Link className="link" href="/contact">{linkLabel}</Link></div><div className="faq home-faq">{homeFaqs.map(faq=><details key={faq._key}><summary>{faq.question}</summary><p>{faq.answer.split(/(จองคิวผ่าน\s*(?:LINE|ไลน์))/gi).map((text,index)=>/^จองคิวผ่าน\s*(?:LINE|ไลน์)$/i.test(text)?<BookingTextLink key={index}>{text}</BookingTextLink>:text)}</p></details>)}</div></section>;
}
