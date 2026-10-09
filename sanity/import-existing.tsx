'use client';
import {useEffect,useState,useMemo} from 'react';
import {useClient} from 'sanity';
import {posts} from '@/lib/content';
import {apiVersion} from './env';
import {researchedArticles,seedDocument} from './researched-articles';
import {defaultContact,defaultGallery,defaultServices} from '@/lib/cms-defaults';
import {articleCover} from '@/lib/article-images';
import {confirmedPrices,confirmedPriceNote,defaultHomeFaqs} from '@/lib/service-rates';
import type {Price} from '@/lib/cms-defaults';

type Existing={_id:string;title:string;slug?:string};
export function ImportExistingArticles() {
  const studioClient=useClient({apiVersion});
  const client=useMemo(()=>studioClient.withConfig({perspective:'raw'}),[studioClient]);
  const [status,setStatus]=useState('');
  const [busy,setBusy]=useState(false);
  const [existing,setExisting]=useState<Existing[]|null>(null);
  const [loadError,setLoadError]=useState(false);
  const normalize=(text:string)=>text.trim().replace(/\s+/g,' ').toLowerCase();
  const alreadyExists=(seed:typeof researchedArticles[number],records:Existing[])=>records.some(record=>record.slug===seed.slug||record._id.replace(/^drafts\./,'')===`pama-article-${seed.slug}`||normalize(record.title)===normalize(seed.title));
  const fetchExisting=()=>client.fetch<Existing[]>('*[_type == "article"]{_id,title,"slug":slug.current}');
  useEffect(()=>{let active=true;client.fetch<Existing[]>('*[_type == "article"]{_id,title,"slug":slug.current}').then(records=>{if(active)setExisting(records)}).catch(()=>{if(active)setLoadError(true)});return()=>{active=false}},[client]);
  async function updateHomeFaqs() {
    setBusy(true);setStatus('กำลังอัปเดต FAQ หน้าแรก…');
    try {
      const docs=await client.fetch<{_id:string;_rev:string}[]>('*[_id in ["pama-service-settings","drafts.pama-service-settings"]]{_id,_rev}');
      const doc=docs.find(d=>d._id.startsWith('drafts.'))||docs[0];
      if(!doc){setStatus('กรุณานำเข้าข้อมูลเว็บไซต์ก่อน');return;}
      await client.patch(doc._id).ifRevisionId(doc._rev).set({homeFaqs:defaultHomeFaqs}).commit();
      setStatus(doc._id.startsWith('drafts.')?'ใส่ FAQ 8 ข้อในฉบับร่างแล้ว เปิดบริการและราคา แล้วกด Publish':'อัปเดต FAQ หน้าแรกเป็น 8 ข้อแล้ว แก้ต่อได้ในบริการและราคา');
    }catch{setStatus('อัปเดตไม่สำเร็จ กรุณาตรวจสิทธิ์และลองอีกครั้ง');}finally{setBusy(false);}
  }
  async function fillConfirmedPrices() {
    setBusy(true);setStatus('กำลังนำเข้าราคาจากใบค่าบริการ…');
    try {
      const docs=await client.fetch<{_id:string;_rev:string;prices?:Price[]}[]>('*[_id in ["pama-service-settings","drafts.pama-service-settings"]]{_id,_rev,prices}');
      const doc=docs.find(d=>d._id.startsWith('drafts.'))||docs[0];
      if(!doc){setStatus('กรุณานำเข้าข้อมูลเว็บไซต์ก่อน');return;}
      const prices=confirmedPrices;
      await client.patch(doc._id).ifRevisionId(doc._rev).set({prices,priceNote:confirmedPriceNote,ratesImported:true}).setIfMissing({homeFaqs:defaultHomeFaqs}).commit();
      setStatus(doc._id.startsWith('drafts.')?'นำเข้าราคาในฉบับร่างแล้ว เปิดบริการและราคา แล้วกด Publish':'นำเข้าราคาตามใบค่าบริการและ FAQ แล้ว เปิดบริการและราคาเพื่อแก้ไขต่อได้');
    }catch{setStatus('เติมราคาไม่สำเร็จ อาจมีข้อมูลเปลี่ยนระหว่างแก้ไข กรุณาลองใหม่');}finally{setBusy(false);}
  }
  async function initializeWebsite() {
    setBusy(true);setStatus('กำลังนำข้อมูลเว็บไซต์เดิมเข้า Sanity…');
    try {
      const records=await fetchExisting();
      const ids=await client.fetch<string[]>('*[_type in ["serviceSettings","gallerySettings","contactSettings","journalSettings"]]._id');
      let transaction=client.transaction();
      const settings=[defaultContact,defaultGallery,{...defaultServices,services:defaultServices.services.map(({image,...item})=>({...item,imageUrl:image}))}];
      for(const doc of settings) if(!ids.includes(doc._id)&&!ids.includes('drafts.'+doc._id))transaction=transaction.createIfNotExists<Record<string,unknown> & {_id:string;_type:string}>(doc);
      const publishedAt=new Date().toISOString();
      for(const seed of researchedArticles)if(!alreadyExists(seed,records))transaction=transaction.createIfNotExists(seedDocument(seed,publishedAt));
      for(const post of posts)if(!records.some(r=>r.slug===post.slug||r._id.replace(/^drafts\./,'')==='pama-article-'+post.slug))transaction=transaction.createIfNotExists({_id:'pama-article-'+post.slug,_type:'article',title:post.title,slug:{_type:'slug',current:post.slug},category:post.category,intro:post.intro,coverUrl:articleCover(post.slug),coverAlt:post.title,publishedAt,body:post.paragraphs.map((text,i)=>({_key:'paragraph-'+i,_type:'block',style:'normal',markDefs:[],children:[{_key:'span-'+i,_type:'span',text,marks:[]}]}))});
      if(!ids.includes('drafts.pama-journal-settings'))transaction=transaction.createIfNotExists({_id:'pama-journal-settings',_type:'journalSettings',title:'สาระน่ารู้เกี่ยวกับสุนัขและแมว',description:'แนวทางเตรียมตัวและกิจวัตรง่าย ๆ สำหรับเจ้าของสัตว์เลี้ยง'}).patch('pama-journal-settings',{set:{legacyImported:true,researchedImported:true}});
      await transaction.commit();setExisting(await fetchExisting());
      setStatus('นำเข้าเรียบร้อย เปิดเมนูจัดการเนื้อหาเพื่อแก้ทั้ง 4 ส่วนได้ ไม่ทับรายการที่มีอยู่หรือฉบับร่าง กด Publish หลังแก้ไข เว็บไซต์อัปเดตภายในประมาณ 1 นาที');
    }catch{setStatus('นำเข้าไม่สำเร็จ กรุณาล็อกอิน Sanity ด้วยบัญชีที่มีสิทธิ์แก้ไข แล้วลองอีกครั้ง');}finally{setBusy(false);}
  }
  async function importResearched() {
    setBusy(true);setStatus('กำลังตรวจบทความซ้ำและนำเข้าบทความ…');
    try {
      const records=await fetchExisting();
      const pending=researchedArticles.filter(seed=>!alreadyExists(seed,records));
      let transaction=client.transaction();
      const publishedAt=new Date().toISOString();
      for(const seed of pending) transaction=transaction.createIfNotExists(seedDocument(seed,publishedAt));
      transaction=transaction.createIfNotExists({_id:'pama-journal-settings',_type:'journalSettings',title:'สาระน่ารู้',description:'แนวทางเตรียมตัวและกิจวัตรง่าย ๆ สำหรับเจ้าของสัตว์เลี้ยง'}).patch('pama-journal-settings',{set:{researchedImported:true}});
      await transaction.commit();
      setExisting(await fetchExisting());
      setStatus(`เพิ่ม ${pending.length} บทความแล้ว ข้าม ${researchedArticles.length-pending.length} เรื่องที่มีอยู่ เปิดเมนูบทความทั้งหมดเพื่อแก้รูปและเนื้อหาได้ เว็บไซต์จะอัปเดตภายในประมาณ 1 นาที`);
    }catch{setStatus('นำเข้าไม่สำเร็จ กรุณาล็อกอินด้วยบัญชีที่มีสิทธิ์แก้ไขโปรเจกต์ Sanity แล้วลองใหม่');}
    finally{setBusy(false);}
  }
  async function importLegacy() {
    setBusy(true);setStatus('กำลังนำเข้าบทความเดิม…');
    try {
      const records=await fetchExisting();
      const pending=posts.filter(post=>!records.some(record=>record.slug===post.slug||record._id.replace(/^drafts\./,'')===`pama-article-${post.slug}`));
      let transaction=client.transaction();
      for(const post of pending) transaction=transaction.createIfNotExists({
        _id:`pama-article-${post.slug}`,_type:'article',title:post.title,slug:{_type:'slug',current:post.slug},category:post.category,intro:post.intro,publishedAt:new Date().toISOString(),
        body:post.paragraphs.map((text,index)=>({_key:`paragraph-${index}`,_type:'block',style:'normal',markDefs:[],children:[{_key:`span-${index}`,_type:'span',text,marks:[]}]})),
      });
      transaction=transaction.createIfNotExists({_id:'pama-journal-settings',_type:'journalSettings',title:'สาระน่ารู้',description:'แนวทางเตรียมตัวและกิจวัตรง่าย ๆ สำหรับเจ้าของสัตว์เลี้ยง'}).patch('pama-journal-settings',{set:{legacyImported:true}});
      await transaction.commit();setExisting(await fetchExisting());
      setStatus(`เพิ่มบทความเดิม ${pending.length} เรื่องแล้ว โดยไม่ทับรายการที่มีอยู่`);
    }catch{setStatus('นำเข้าไม่สำเร็จ กรุณาตรวจบัญชีและสิทธิ์การแก้ไข');}finally{setBusy(false);}
  }
  const buttonStyle={padding:'13px 24px',border:0,borderRadius:24,background:'#244E43',color:'white',cursor:busy?'wait':'pointer',fontSize:15};
  return <div style={{padding:'40px 24px',maxWidth:900,margin:'auto',fontFamily:'sans-serif',lineHeight:1.8}}>
    <h1 style={{fontSize:28}}>นำข้อมูลเว็บไซต์เข้า Sanity</h1>
    <p>ย้ายข้อมูลปัจจุบันของสาระน่ารู้ ผลงาน Before & After บริการและราคา และข้อมูลติดต่อ เพื่อให้แก้ไขในหลังบ้านได้ทั้งหมด ข้ามข้อมูลที่มีอยู่แล้วรวมทั้งฉบับร่าง</p>
    <button onClick={initializeWebsite} disabled={busy||!existing} style={buttonStyle}>นำเข้าและเผยแพร่ข้อมูลเดิมทั้ง 4 ส่วน</button>
    <p role="status">{status}</p>
    <h2>FAQ หน้าแรก 8 ข้อ</h2><p>แทนคำถามหน้าแรกด้วยข้อความชุดล่าสุดที่ร้านให้มา โดยไม่เปลี่ยนรายการราคา</p><button onClick={updateHomeFaqs} disabled={busy} style={buttonStyle}>ใช้ FAQ หน้าแรกชุดใหม่ 8 ข้อ</button><h2>ค่าบริการและ FAQ</h2><p>ใช้ราคาตามใบค่าบริการที่ร้านให้มา ทั้งสองสาขา แยกน้ำหนักและประเภทขน ปุ่มนี้จะแทนที่รายการราคาเดิม และเพิ่ม FAQ หน้าแรก 8 ข้อหากยังไม่มี หากมีฉบับร่าง จะอัปเดตฉบับร่างให้ตรวจและ Publish</p><button onClick={fillConfirmedPrices} disabled={busy} style={buttonStyle}>นำเข้าค่าบริการจริงและ FAQ หน้าแรก</button>
    <h2>บทความตัวอย่าง</h2>
    <p>เตรียมบทความใหม่ 6 เรื่องพร้อมภาพประกอบและแหล่งอ้างอิง ปุ่มนำเข้าจะเผยแพร่เฉพาะเรื่องที่ยังไม่มี โดยไม่ทับชื่อ รูป หรือเนื้อหาที่คุณเคยแก้</p>
    <p>ข้ามเรื่องเตรียมตัวก่อนอาบน้ำตัดขนและกิจวัตรดูแลขนที่มีอยู่แล้ว หัวข้อแนะนำหน้ารวมกับบทความล่าสุดใช้บนหน้ารวมต่อไป</p>
    <p>หลังนำเข้า แก้ไขชื่อ คำโปรย รูปภาพ เนื้อหา และวันที่ได้จาก “บทความทั้งหมด” กด Publish เพื่อแสดงการแก้ไขบนเว็บ ทุก 6 บทความจะเพิ่มอีกหนึ่งหน้าโดยอัตโนมัติ</p>
    <p>{existing?`ตรวจพบ ${existing.filter(record=>!record._id.startsWith('drafts.')).length} บทความเผยแพร่ใน CMS`:loadError?'ตรวจรายการไม่สำเร็จ ลองโหลดหน้านี้ใหม่':'กำลังตรวจรายการบทความ…'}</p>
    {researchedArticles.map(seed=><details key={seed.slug} style={{border:'1px solid #d8d9ce',borderRadius:12,padding:20,margin:'16px 0'}}><summary style={{cursor:'pointer',fontWeight:600}}>{seed.title}{existing&&alreadyExists(seed,existing)?' — มีอยู่แล้ว':''}</summary><img src={seed.image} alt={seed.alt} style={{width:'100%',height:240,objectFit:'cover',borderRadius:10,marginTop:16}}/><p style={{fontSize:12}}>ภาพประกอบ สามารถเปลี่ยนเป็นภาพของร้านในเมนูบทความทั้งหมด</p><p>{seed.intro}</p>{seed.sections.map(section=><section key={section.heading}><h2 style={{fontSize:20,marginTop:24}}>{section.heading}</h2><p>{section.text}</p></section>)}<p>แหล่งข้อมูล:</p>{seed.references.map(ref=><div key={ref.href}><a href={ref.href} target="_blank" rel="noopener noreferrer">{ref.title} ↗</a></div>)}</details>)}
    <button onClick={importResearched} disabled={busy||!existing} style={buttonStyle}>{busy?'กำลังดำเนินการ…':'นำเข้าและเผยแพร่บทความใหม่'}</button><p role="status">{status}</p>
    <details style={{marginTop:32}}><summary>นำเข้าบทความเดิม 3 เรื่อง (กรณียังไม่ได้ย้ายเข้า CMS)</summary><p>ข้ามรายการที่มีอยู่แล้ว รวมทั้งฉบับร่าง</p><button onClick={importLegacy} disabled={busy||!existing} style={buttonStyle}>นำเข้าบทความเดิม</button></details>
    <p><a href="/journal" target="_blank" rel="noopener noreferrer">ดูหน้าสาระน่ารู้ ↗</a></p>
  </div>;
}
