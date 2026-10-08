'use client';
import {useState} from 'react';
import {useClient} from 'sanity';
import {posts} from '@/lib/content';
import {apiVersion} from './env';

export function ImportExistingArticles() {
  const client=useClient({apiVersion});
  const [status,setStatus]=useState('');
  const [busy,setBusy]=useState(false);
  async function importArticles() {
    setBusy(true);setStatus('กำลังตรวจสอบและนำเข้าบทความเดิม…');
    try {
      let transaction=client.transaction();
      for(const post of posts) transaction=transaction.createIfNotExists({
        _id:`pama-article-${post.slug}`,_type:'article',title:post.title,slug:{_type:'slug',current:post.slug},category:post.category,intro:post.intro,publishedAt:new Date().toISOString(),
        body:post.paragraphs.map((text,index)=>({_key:`paragraph-${index}`,_type:'block',style:'normal',markDefs:[],children:[{_key:`span-${index}`,_type:'span',text,marks:[]}]})),
      });
      transaction=transaction.createIfNotExists({_id:'pama-journal-settings',_type:'journalSettings',title:'สาระน่ารู้',description:'แนวทางเตรียมตัวและกิจวัตรง่าย ๆ สำหรับเจ้าของสัตว์เลี้ยง'}).patch('pama-journal-settings',{set:{legacyImported:true}});
      await transaction.commit();
      setStatus('นำเข้าบทความเดิม 3 บทความแล้ว โดยไม่ทับข้อมูลที่มีอยู่ เปิดเมนูบทความเพื่อแก้ไขได้ทันที');
    } catch {setStatus('นำเข้าไม่สำเร็จ กรุณาตรวจสิทธิ์บัญชีและการเชื่อมต่อ แล้วลองใหม่');}
    finally {setBusy(false);}
  }
  return <div style={{padding:'40px 24px',maxWidth:720,margin:'auto',fontFamily:'sans-serif',lineHeight:1.8}}>
    <h1>ย้ายบทความเดิมเข้า CMS</h1><p>นำบทความเดิมของ PAMA จำนวน 3 บทความเข้า Sanity เพื่อให้แก้ไขผ่านแอดมินได้ บทความจะอยู่ในสถานะเผยแพร่ และแสดงบนเว็บไซต์ภายในประมาณ 1 นาที</p>
    <p>ปุ่มนี้จะสร้างเฉพาะรายการที่ยังไม่มี และไม่ทับบทความที่เคยนำเข้าแล้ว</p>
    <button onClick={importArticles} disabled={busy} style={{padding:'14px 24px',border:0,borderRadius:24,background:'#244E43',color:'white',cursor:busy?'wait':'pointer',fontSize:15}}>{busy?'กำลังนำเข้า…':'นำเข้าบทความเดิม'}</button>
    <p role="status">{status}</p><a href="/journal" target="_blank" rel="noopener noreferrer">ดูหน้าสาระน่ารู้ ↗</a>
  </div>;
}
