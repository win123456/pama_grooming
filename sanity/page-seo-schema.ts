import {defineType} from 'sanity';
import {seoFields} from './seo-fields';
export const branchPageSettings=defineType({name:'branchPageSettings',title:'สาขาของเรา · SEO',type:'document',fields:seoFields,preview:{prepare:()=>({title:'ชื่อแท็บและคำอธิบายหน้าสาขาของเรา'})}});
export const reviewPageSettings=defineType({name:'reviewPageSettings',title:'รีวิวลูกค้า · SEO',type:'document',fields:seoFields,preview:{prepare:()=>({title:'ชื่อแท็บและคำอธิบายหน้ารีวิวลูกค้า'})}});
