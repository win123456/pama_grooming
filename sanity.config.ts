'use client';
import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {article,journalSettings} from './sanity/schema';
import {apiVersion,dataset,projectId} from './sanity/env';
import {ImportExistingArticles} from './sanity/import-existing';

export default defineConfig({
  name:'pama',title:'PAMA GROOMING — จัดการบทความ',basePath:'/admin',projectId,dataset,
  plugins:[structureTool({title:'จัดการเนื้อหา',structure:S=>S.list().title('PAMA GROOMING').items([
    S.documentTypeListItem('article').title('บทความทั้งหมด'),
    S.listItem().id('journal-settings').title('ตั้งค่าหน้าสาระน่ารู้').child(S.document().schemaType('journalSettings').documentId('pama-journal-settings')),
  ])})],
  tools:tools=>[...tools,{name:'import-existing',title:'นำเข้าบทความเดิม',component:ImportExistingArticles}],
  schema:{types:[article,journalSettings]},
  document:{newDocumentOptions:options=>options.filter(option=>option.templateId!=='journalSettings'),actions:(actions,context)=>context.schemaType==='journalSettings'?actions.filter(action=>!['delete','duplicate','unpublish'].includes(action.action||'')):actions},
});
