import {SeoInput} from './seo-input';
import {defineField} from 'sanity';
export const seoFields=[defineField({name:'seoTitle',title:'ชื่อแท็บ / ชื่อสำหรับ Google',description:'ใส่ชื่อเต็มที่ต้องการแสดงบนแท็บ เว้นว่างเพื่อใช้ค่าเดิม',type:'string',components:{input:SeoInput},validation:r=>r.max(160)}),defineField({name:'seoDescription',title:'คำอธิบายสำหรับ Google',type:'text',components:{input:SeoInput},rows:3,validation:r=>r.max(300)})];
