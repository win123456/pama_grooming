import {seoFields} from './seo-fields';
import {defineField,defineType} from 'sanity';
import {homeSeed,homeFieldTitles} from '@/lib/home-content';
export const homeSettings=defineType({name:'homeSettings',title:'หน้าแรก',type:'document',initialValue:homeSeed,groups:[{name:'seo',title:'ชื่อแท็บและ SEO'},{name:'hero',title:'แบนเนอร์',default:true},{name:'story',title:'แนะนำร้าน'},{name:'sections',title:'หัวข้อและแถบบริการ'},{name:'cta',title:'FAQ และจองคิว'}],fields:[...seoFields.map(field=>({...field,group:'seo'})),
 ...Object.entries(homeFieldTitles).map(([name,title])=>{const group=name.startsWith('story')||name.startsWith('point')?'story':name.startsWith('section')||name.startsWith('strip')||name==='branchesDescription'?'sections':name.startsWith('cta')||name.startsWith('faq')?'cta':'hero';
 if(name.endsWith('ImageUrl'))return defineField({name,title,group,type:'url',description:'ใช้เมื่อยังไม่ได้อัปโหลดรูปด้านล่าง',validation:r=>r.uri({scheme:['https'],allowRelative:true})});
 if(name.includes('Description')||['heroTitle','storyTitle','stamp'].includes(name))return defineField({name,title,group,type:'text',rows:3,validation:r=>r.required()});
 return defineField({name,title,group,type:'string',validation:r=>r.required()});}),
 ...['hero','story'].map(key=>defineField({name:key+'Image',group:key,title:key==='hero'?'อัปโหลดรูปแบนเนอร์':'อัปโหลดรูปแนะนำร้าน',description:'รูปที่อัปโหลดจะใช้แทนลิงก์รูปสำรอง ขนาดกรอบบนเว็บคงเดิม',type:'image',options:{hotspot:true}}))
],preview:{prepare:()=>({title:'ตั้งค่าหน้าแรก'})}});
