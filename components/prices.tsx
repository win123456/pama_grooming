'use client';
import { useState } from 'react';

export function Prices() {
  const [pet, setPet] = useState('สุนัข');
  return <>
    <div className="tabs" role="tablist" aria-label="ประเภทสัตว์เลี้ยง">
      {['สุนัข','แมว'].map(value => <button key={value} id={value === 'สุนัข' ? 'dog-tab' : 'cat-tab'} role="tab" className={`tab ${pet === value ? 'selected' : ''}`} aria-selected={pet === value} aria-controls="prices" tabIndex={pet === value ? 0 : -1} onClick={() => setPet(value)} onKeyDown={event => {
        if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) {
          event.preventDefault();
          const next = event.key === 'Home' ? 'สุนัข' : event.key === 'End' ? 'แมว' : pet === 'สุนัข' ? 'แมว' : 'สุนัข';
          setPet(next);document.getElementById(next === 'สุนัข' ? 'dog-tab' : 'cat-tab')?.focus();
        }
      }}>{value}</button>)}
    </div>
    <div id="prices" role="tabpanel" aria-labelledby={pet === 'สุนัข' ? 'dog-tab' : 'cat-tab'} tabIndex={0} className="tablebox" aria-live="polite">
      <table><thead><tr><th scope="col">บริการ</th><th scope="col">สัตว์เลี้ยง</th><th scope="col">ราคา</th></tr></thead><tbody>
        {['อาบน้ำ','ตัดขน','ฝากเลี้ยง / วัน'].map(service => <tr key={service}><td>{service}</td><td>{pet}</td><td>สอบถามสาขาผ่าน LINE</td></tr>)}
      </tbody></table>
    </div>
    <p className="note">ยังไม่ได้เผยแพร่ราคาที่รับรองโดยร้าน กรุณาส่งรูปน้อง สายพันธุ์ น้ำหนัก และบริการที่ต้องการเพื่อขอราคาก่อนยืนยันคิว</p>
  </>;
}
