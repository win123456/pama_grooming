import {BookingTextLink} from './booking';
import Link from 'next/link';
import {getServices} from '@/lib/site-content';
export async function HomeFaq(){
 const {homeFaqs}=await getServices();
 if(!homeFaqs.length)return null;
 return <section className="wrap section"><div className="section-head"><div><span className="eyebrow">GOOD TO KNOW</span><h2>คำถามที่พบบ่อยเกี่ยวกับ PAMA GROOMING (FAQ)</h2></div><Link className="link" href="/contact">สอบถามเพิ่มเติม ↗</Link></div><div className="faq home-faq">{homeFaqs.map(faq=><details key={faq._key}><summary>{faq.question}</summary><p>{faq.answer.split(/(จองคิวผ่าน\s*(?:LINE|ไลน์))/gi).map((text,index)=>/^จองคิวผ่าน\s*(?:LINE|ไลน์)$/i.test(text)?<BookingTextLink key={index}>{text}</BookingTextLink>:text)}</p></details>)}</div></section>;
}
