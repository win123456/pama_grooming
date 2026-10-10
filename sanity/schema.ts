import {SeoInput} from './seo-input';
import {seoFields} from './seo-fields';
import {defineArrayMember, defineField, defineType} from 'sanity';

export const article = defineType({
  name: 'article', title: 'บทความ', type: 'document',
  groups: [{name:'content',title:'เนื้อหา',default:true},{name:'seo',title:'SEO'}],
  fields: [
    defineField({name:'title',title:'ชื่อบทความ',type:'string',group:'content',validation:rule=>rule.required().max(160)}),
    defineField({name:'slug',title:'ลิงก์บทความ (URL)',type:'slug',group:'content',description:'ใช้ตัวอักษรภาษาอังกฤษตัวเล็ก ตัวเลข และขีดกลาง เช่น caring-for-cats',options:{source:'title',maxLength:96},validation:rule=>rule.required().custom(value => !value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) ? true : 'ใช้ภาษาอังกฤษตัวเล็ก ตัวเลข และขีดกลางเท่านั้น')}),
    defineField({name:'category',title:'หมวดหมู่',type:'string',group:'content',initialValue:'PET CARE',validation:rule=>rule.required().max(80)}),
    defineField({name:'topic',title:'หัวข้อบนหน้าสาระน่ารู้',type:'string',group:'content',description:'เลือกหัวข้อเพื่อจัดบทความลงหมวดบนหน้ารวม',options:{list:[{title:'การอาบน้ำและตัดขนสุนัข',value:'dog'},{title:'การอาบน้ำและดูแลขนแมว',value:'cat'},{title:'สุขภาพผิวหนังและขน',value:'coat'},{title:'การดูแลตามฤดูกาล',value:'seasonal'},{title:'เตรียมตัวก่อนใช้บริการ',value:'preparation'}]}}),
    defineField({name:'featured',title:'บทความแนะนำ',type:'boolean',group:'content',initialValue:false}),
    defineField({name:'intro',title:'คำโปรย',type:'text',rows:3,group:'content',validation:rule=>rule.required().max(300)}),
    defineField({name:'cover',title:'ภาพปก',type:'image',group:'content',options:{hotspot:true},fields:[defineField({name:'alt',title:'คำอธิบายภาพ',type:'string',validation:rule=>rule.required()})]}),
    defineField({name:'coverUrl',title:'ลิงก์ภาพปกสำรอง',type:'url',group:'content',description:'ใช้เมื่อยังไม่ได้อัปโหลดภาพปก ภาพที่อัปโหลดด้านบนจะแสดงแทนลิงก์นี้',validation:rule=>rule.uri({scheme:['https'],allowRelative:true})}),
    defineField({name:'coverAlt',title:'คำอธิบายภาพปกสำรอง',type:'string',group:'content',hidden:({document})=>!document?.coverUrl}),
    defineField({name:'body',title:'เนื้อหาบทความ',type:'array',group:'content',of:[
      defineArrayMember({type:'block',styles:[{title:'เนื้อหา',value:'normal'},{title:'หัวข้อ',value:'h2'},{title:'หัวข้อย่อย',value:'h3'},{title:'ข้อความอ้างอิง',value:'blockquote'}],marks:{decorators:[{title:'ตัวหนา',value:'strong'},{title:'ตัวเอียง',value:'em'}],annotations:[{name:'link',title:'ลิงก์',type:'object',fields:[{name:'href',type:'url',title:'URL',validation:rule=>rule.uri({scheme:['http','https','mailto','tel'],allowRelative:true})}]}]}}),
      defineArrayMember({type:'image',options:{hotspot:true},fields:[{name:'alt',title:'คำอธิบายภาพ',type:'string',validation:rule=>rule.required()},{name:'caption',title:'คำบรรยายใต้ภาพ',type:'string'}]}),
    ],validation:rule=>rule.required().min(1)}),
    defineField({name:'publishedAt',title:'วันที่แสดงในบทความ',type:'datetime',group:'content',description:'ใช้เรียงลำดับบทความ ปุ่ม Publish จะเผยแพร่ทันที ไม่ใช่การตั้งเวลา',initialValue:()=>new Date().toISOString(),validation:rule=>rule.required()}),
    defineField({name:'seoTitle',title:'ชื่อแท็บ / ชื่อสำหรับ Google',type:'string',components:{input:SeoInput},group:'seo',description:'หากเว้นว่างจะใช้ชื่อบทความ',validation:rule=>rule.max(160)}),
    defineField({name:'seoDescription',title:'คำอธิบายสำหรับ Google',type:'text',components:{input:SeoInput},rows:3,group:'seo',description:'หากเว้นว่างจะใช้คำโปรย',validation:rule=>rule.max(300)}),
  ],
  preview:{select:{title:'title',subtitle:'category',media:'cover'}},
});

export const journalSettings = defineType({
  name:'journalSettings',title:'ตั้งค่าหน้าบทความ',type:'document',
  fields:[
    defineField({name:'legacyImported',title:'นำเข้าบทความเดิมแล้ว',type:'boolean',hidden:true,readOnly:true}),
    defineField({name:'researchedImported',title:'นำเข้าบทความตัวอย่างแล้ว',type:'boolean',hidden:true,readOnly:true}),
    defineField({name:'title',title:'หัวข้อหน้าสาระน่ารู้',type:'string',initialValue:'สาระน่ารู้เกี่ยวกับสุนัขและแมว',validation:rule=>rule.required().max(100)}),
    defineField({name:'description',title:'คำอธิบายหน้าสาระน่ารู้',type:'text',rows:3,initialValue:'แนวทางเตรียมตัวและกิจวัตรง่าย ๆ สำหรับเจ้าของสัตว์เลี้ยง',validation:rule=>rule.required().max(300)}),
  ],
});
