# PAMA GROOMING

เว็บไซต์ Next.js App Router + TypeScript สำหรับอาบน้ำ ตัดขน และฝากเลี้ยงสัตว์เลี้ยง สาขารามคำแหง 114 และพหลโยธิน 64

## ใช้งานในเครื่อง

ต้องใช้ Node.js 20.9 ขึ้นไป

```sh
npm ci
npm run dev
```

เปิด http://localhost:3000

```sh
npm run typecheck
npm run build
npm start
```

## โครงสร้าง

- `app/page.tsx`: หน้าแรก
- `app/[page]/page.tsx`: บริการ สาขา ผลงาน รีวิว สาระน่ารู้ และติดต่อ
- `app/journal/[slug]/page.tsx`: บทความแบบ prerender
- `app/layout.tsx`: layout, metadata และ structured data
- `app/sitemap.ts`, `app/robots.ts`: sitemap และ robots
- `components/`: เมนู ปุ่มจอง ตารางราคา และส่วนเนื้อหา
- `lib/content.ts`: ข้อมูลติดต่อ บริการ และบทความ
- `app/globals.css`: สี ฟอนต์ และ responsive layout เดิม

ทุกหน้าหลักสร้าง HTML ตอน build เมนู ปุ่มจอง และแท็บราคาใช้ client components มี redirect ถาวรจาก URL `.html` เดิม

## Vercel

Import repository `win123456/pama_grooming` ใน Vercel เลือก Framework Preset เป็น Next.js และ Root Directory เป็น `.` ตั้ง Install Command เป็น `npm ci` และ Build Command เป็น `npm run build` ตาม `vercel.json`

ตั้ง environment variable `NEXT_PUBLIC_SITE_URL` เป็น production URL จริง เช่น `https://your-project.vercel.app` หรือ custom domain แล้ว redeploy เมื่อเปลี่ยน domain ถ้าไม่ตั้งค่า ระบบใช้ `VERCEL_PROJECT_PRODUCTION_URL` ที่ Vercel ให้มา และ fallback เป็น localhost สำหรับการพัฒนา

อย่าตั้ง Output Directory เป็น `dist` เพราะโปรเจกต์นี้ใช้ Next.js

## ข้อมูลที่ยังรอจากร้าน

ราคาจริง เวลาเปิด–ปิด หมุด Google Maps ที่ยืนยันแล้ว ภาพผลงานและ Before & After จริง คะแนนและรีวิว Google แต่ละสาขา

ภาพ Unsplash เป็นภาพประกอบ ไม่ใช่ผลงานของร้าน แผนที่เป็นผลการค้นหา ต้องยืนยันหมุดกับสาขาก่อนเดินทาง เว็บไซต์ไม่มีรีวิวหรือคะแนนสมมติ

ปุ่มจองเปิด LINE ของสาขาที่เลือก คิวสมบูรณ์เมื่อร้านยืนยันในแชต ไม่มีการยืนยันคิวอัตโนมัติ

## จัดการบทความด้วย Sanity

เปิด `/admin` และเข้าสู่ระบบด้วยบัญชี Google หรือ GitHub ที่เชื่อมกับ Sanity และมีสิทธิ์ในโปรเจกต์ PAMA

เมนูแอดมิน:

- **บทความทั้งหมด**: สร้าง/แก้ไขชื่อ URL หมวดหมู่ คำโปรย รูปปก เนื้อหาและรูปในบทความ พร้อม SEO
- **ตั้งค่าหน้าสาระน่ารู้**: แก้ไขชื่อและคำอธิบายหน้ารวมบทความ
- **นำเข้าบทความเดิม**: ย้ายบทความเดิม 3 เรื่องเข้า CMS แบบ transaction และไม่ทับรายการที่มีอยู่

กด Publish เพื่อเผยแพร่ หรือ Unpublish เพื่อนำออกจากเว็บ การเปลี่ยนแปลงจะแสดงบนหน้าเว็บภายในประมาณ 60 วินาทีและคำขอถัดไป โดยไม่ต้อง deploy ใหม่ ลิงก์บทความอยู่ที่ `/journal/<slug>` และ sitemap เพิ่มบทความที่เผยแพร่แล้วโดยอัตโนมัติ

บทความเดิมยังแสดงจากข้อมูลเว็บไซต์ก่อนย้ายจนกว่าการนำเข้าสำเร็จ หลังนำเข้าสำเร็จเว็บไซต์ใช้ Sanity เป็นแหล่งบทความทั้งหมด การลบหรือ Unpublish จะไม่ทำให้บทความเดิมกลับมาอีก

บัญชีที่สร้างผ่าน Vercel ต้องเพิ่มวิธีลงชื่อเข้าใช้ Google หรือ GitHub ที่ https://www.sanity.io/manage/personal/account-settings ก่อนใช้ Studio

Sanity resource: `pama-grooming-content`; project ID `qy3j9yrr`; dataset `production` (public identifiers)

Production และ Preview เชื่อม environment variables จาก Vercel Marketplace แล้ว ตัวแปรที่ Studio ใช้คือ `NEXT_PUBLIC_SANITY_PROJECT_ID` และ `NEXT_PUBLIC_SANITY_DATASET` ตัวแปร public เป็นเพียง ID ไม่มี API token อยู่ใน client code

Public website ใช้ Sanity published perspective ไม่ใช้ write token สิทธิ์การแก้ไขบังคับโดย Sanity login / project membership ฝั่ง backend ทั้ง `/admin` และหน้าข้างในตั้ง noindex และ robots.txt ไม่รวม admin ใน sitemap

CORS ของ Studio ต้องอนุญาต origin ของเว็บพร้อม Allow credentials (ตั้งเฉพาะ `https://pama-grooming.vercel.app` แล้ว) หากต้องทดสอบ Studio บน localhost ให้เพิ่ม origin ของ dev server ใน Sanity API → CORS origins อย่างเจาะจง

Source content/config: `sanity/schema.ts`, `sanity.config.ts`, `lib/articles.ts`, `app/(site)/journal/[slug]/page.tsx`
