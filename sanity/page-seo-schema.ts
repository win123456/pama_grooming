import {BranchPageInput} from './branch-page-input';
import {SharedBranchLink} from './shared-branch-link';
import {pageInfo} from '@/lib/content';
import {defineField,defineType} from 'sanity';
import {seoFields} from './seo-fields';
export const branchPageSettings=defineType({name:'branchPageSettings',title:'สาขาของเรา',type:'document',initialValue:pageInfo.branches,fields:[...seoFields,defineField({name:'title',title:'หัวข้อหน้า',type:'string',components:{input:BranchPageInput},initialValue:pageInfo.branches.title,validation:r=>r.required()}),defineField({name:'description',title:'คำอธิบายหน้า',type:'text',rows:3,components:{input:BranchPageInput},initialValue:pageInfo.branches.description,validation:r=>r.required()}),defineField({name:'eyebrow',title:'ข้อความเล็กเหนือหัวข้อ',type:'string',components:{input:BranchPageInput},initialValue:pageInfo.branches.eyebrow}),defineField({name:'sharedBranchInfo',title:'ข้อมูลสาขา',type:'string',readOnly:true,components:{input:SharedBranchLink}})],preview:{prepare:()=>({title:'ตั้งค่าหน้าสาขาของเรา'})}});
export const reviewPageSettings=defineType({name:'reviewPageSettings',title:'รีวิวลูกค้า · SEO',type:'document',fields:seoFields,preview:{prepare:()=>({title:'ชื่อแท็บและคำอธิบายหน้ารีวิวลูกค้า'})}});
