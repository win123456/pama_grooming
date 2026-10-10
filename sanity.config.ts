'use client';
import {branchPageSettings,reviewPageSettings} from './sanity/page-seo-schema';
import {websiteSettings} from './sanity/website-schema';
import {homeSettings} from './sanity/home-schema';
import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {article,journalSettings} from './sanity/schema';
import {serviceSettings,gallerySettings,contactSettings} from './sanity/site-schema';
import {apiVersion,dataset,projectId} from './sanity/env';
import {ImportExistingArticles} from './sanity/import-existing';

export default defineConfig({
  name:'pama',title:'PAMA GROOMING — จัดการเว็บไซต์',basePath:'/admin',projectId,dataset,
  plugins:[structureTool({title:'จัดการเนื้อหา',structure:S=>S.list().title('PAMA GROOMING').items([
    S.listItem().id('website-settings').title('ตั้งค่าเว็บไซต์ · Favicon').child(S.document().schemaType('websiteSettings').documentId('pama-website-settings')),
    S.listItem().id('home-settings').title('หน้าแรก').child(S.document().schemaType('homeSettings').documentId('pama-home-settings')),
    S.documentTypeListItem('article').title('สาระน่ารู้ — บทความทั้งหมด'),
    ...[['serviceSettings','pama-service-settings','บริการและราคา'],['gallerySettings','pama-gallery-settings','ผลงานของเรา'],['contactSettings','pama-contact-settings','ติดต่อเราและข้อมูลสาขา'],['branchPageSettings','pama-branch-page-settings','สาขาของเรา · SEO'],['reviewPageSettings','pama-review-page-settings','รีวิวลูกค้า · SEO']].map(([type,id,title])=>S.listItem().id(id).title(title).child(S.document().schemaType(type).documentId(id))),
    S.listItem().id('journal-settings').title('ตั้งค่าหน้าสาระน่ารู้').child(S.document().schemaType('journalSettings').documentId('pama-journal-settings')),
  ])})],
  tools:tools=>[...tools,{name:'import-existing',title:'นำเข้าข้อมูลเว็บไซต์',component:ImportExistingArticles}],
  schema:{types:[branchPageSettings,reviewPageSettings,websiteSettings,homeSettings,article,journalSettings,serviceSettings,gallerySettings,contactSettings]},
  document:{newDocumentOptions:options=>options.filter(option=>!['branchPageSettings','reviewPageSettings','websiteSettings','homeSettings','journalSettings','serviceSettings','gallerySettings','contactSettings'].includes(option.templateId)),actions:(actions,context)=>['branchPageSettings','reviewPageSettings','websiteSettings','homeSettings','journalSettings','serviceSettings','gallerySettings','contactSettings'].includes(context.schemaType)?actions.filter(action=>!['delete','duplicate','unpublish'].includes(action.action||'')):actions},
});
