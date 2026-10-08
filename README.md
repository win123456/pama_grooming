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
