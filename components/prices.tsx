import {Bath,Cat,Dog,House,Scissors,ArrowUpRight} from 'lucide-react';
import {BookingButton} from './booking';
import type {Price} from '@/lib/cms-defaults';
import './prices.css';
export function Prices({prices,note}:{prices:Price[];note?:string}) {
 return <div className="price-menu" id="prices">
   <div className="price-pet-grid">{(['สุนัข','แมว'] as const).map(pet=>{
     const rows=prices.filter(row=>row.pet===pet);const PetIcon=pet==='สุนัข'?Dog:Cat;
     return <section className={`price-pet-panel ${pet==='แมว'?'price-cat':'price-dog'}`} key={pet} aria-labelledby={pet==='แมว'?'cat-prices':'dog-prices'}>
       <div className="price-pet-heading"><span className="price-pet-icon"><PetIcon size={30} aria-hidden="true"/></span><div><span className="eyebrow">{pet==='สุนัข'?'FOR DOGS':'FOR CATS'}</span><h3 id={pet==='แมว'?'cat-prices':'dog-prices'}>ราคาสำหรับ{pet}</h3></div></div>
       <div className="price-service-list">{rows.map(row=>{const boarding=/ฝากเลี้ยง/.test(row.service);const Icon=boarding?House:/ตัดขน/.test(row.service)?Scissors:Bath;return <div className="price-service-row" key={row._key}><span className="price-service-icon"><Icon size={19} aria-hidden="true"/></span><div className="price-service-copy"><h4>{row.service}</h4>{boarding&&<small>เฉพาะสาขาพหลโยธิน 64</small>}</div><strong className="price-amount">{row.price}</strong></div>})}{!rows.length&&<p>สอบถามราคาจากสาขาผ่าน LINE</p>}</div>
       <a className="price-contact-link" href="#booking-prices">สอบถามราคาที่เหมาะกับน้อง<ArrowUpRight size={17} aria-hidden="true"/></a>
     </section>;
   })}</div>
   <div className="price-booking" id="booking-prices"><div><strong>ส่งรูปน้อง ให้เราช่วยประเมินราคา</strong><p>{note || 'แจ้งสายพันธุ์ น้ำหนัก และบริการที่ต้องการผ่าน LINE ก่อนจองคิว'}</p></div><BookingButton/></div>
 </div>;
}
