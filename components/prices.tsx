'use client';
import {useState} from 'react';
import {Bath,Cat,Dog,House,Scissors,ArrowUpRight} from 'lucide-react';
import {BookingButton} from './booking';
import type {Price} from '@/lib/cms-defaults';
import './prices.css';
function PetPrices({pet,prices}:{pet:Price['pet'];prices:Price[]}){
 const weights=Array.from(new Set(prices.map(r=>r.weight).filter((v):v is string=>!!v)));
 const [selectedWeight,setWeight]=useState('');const [selectedCoat,setCoat]=useState('');
 const weight=weights.includes(selectedWeight)?selectedWeight:weights[0];
 const coats=Array.from(new Set(prices.filter(r=>r.weight===weight).map(r=>r.coat).filter((v):v is string=>!!v)));
 const coat=coats.includes(selectedCoat)?selectedCoat:coats[0];
 const rows=weights.length?prices.filter(r=>r.weight===weight&&(!r.coat||r.coat===coat)):prices;
 const PetIcon=pet==='สุนัข'?Dog:Cat;
 return <section className={`price-pet-panel ${pet==='แมว'?'price-cat':'price-dog'}`} aria-labelledby={pet==='แมว'?'cat-prices':'dog-prices'}><div className="price-pet-heading"><span className="price-pet-icon"><PetIcon size={30} aria-hidden="true"/></span><div><span className="eyebrow">{pet==='สุนัข'?'FOR DOGS':'FOR CATS'}</span><h3 id={pet==='แมว'?'cat-prices':'dog-prices'}>ราคาสำหรับ{pet}</h3></div></div>
 {!!weights.length&&<div className="price-selectors"><label>น้ำหนักน้อง<select value={weight} onChange={e=>setWeight(e.target.value)}>{weights.map(w=><option key={w}>{w}</option>)}</select></label>{coats.length>1&&<label>ประเภทขน<select value={coat} onChange={e=>setCoat(e.target.value)}>{coats.map(c=><option key={c}>{c}</option>)}</select></label>}</div>}
 <div className="price-service-list" aria-live="polite">{rows.map(row=>{const Icon=/ฝากเลี้ยง/.test(row.service)?House:/ตัดขน/.test(row.service)?Scissors:Bath;return <div className="price-service-row" key={row._key}><span className="price-service-icon"><Icon size={19} aria-hidden="true"/></span><div className="price-service-copy"><h4>{row.service}</h4>{/ฝากเลี้ยง/.test(row.service)&&<small>เฉพาะสาขาพหลโยธิน 64</small>}</div><strong className="price-amount">{row.price}</strong></div>})}{!rows.length&&<p>สอบถามราคาจากสาขาผ่าน LINE</p>}</div><a className="price-contact-link" href="#booking-prices">สอบถามราคาที่เหมาะกับน้อง<ArrowUpRight size={17} aria-hidden="true"/></a></section>;
}
export function Prices({prices,note}:{prices:Price[];note?:string}){
 return <div className="price-menu" id="prices"><div className="price-pet-grid">{(['สุนัข','แมว'] as const).map(pet=><PetPrices key={pet} pet={pet} prices={prices.filter(r=>r.pet===pet)}/>)}</div>{note&&<details className="price-conditions"><summary>รายละเอียดบริการและค่าใช้จ่ายเพิ่มเติม</summary>{note.split(' · ').map((text,i)=><p key={i}>{text}</p>)}</details>}<div className="price-booking" id="booking-prices"><div><strong>ส่งรูปน้อง ให้เราช่วยประเมินราคา</strong><p>แจ้งสายพันธุ์ น้ำหนัก และบริการที่ต้องการผ่าน LINE ก่อนจองคิว</p></div><BookingButton/></div></div>;
}
