import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Articles, BranchCards, CallToAction, Gallery, PageTitle, Reviews, ServiceCards } from '@/components/sections';
import { Prices } from '@/components/prices';
import { pageInfo } from '@/lib/content';
import {getJournalSettings} from '@/lib/articles';

type PageKey = keyof typeof pageInfo;
type Props = {params:Promise<{page:string}>};
export const dynamicParams = false;
export const revalidate=60;
export function generateStaticParams() {return Object.keys(pageInfo).map(page => ({page}));}
function findPage(key:string) {return Object.prototype.hasOwnProperty.call(pageInfo,key) ? pageInfo[key as PageKey] : undefined;}
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {page} = await params;
  const info = page==='journal' ? {...pageInfo.journal,...await getJournalSettings()} : findPage(page);
  if(!info) return {};
  return {title:info.title,description:info.description,alternates:{canonical:`/${page}`},openGraph:{title:`${info.title} | PAMA GROOMING`,description:info.description,url:`/${page}`}};
}
export default async function ContentPage({params}:Props) {
  const {page} = await params;
  const info = page==='journal' ? {...pageInfo.journal,...await getJournalSettings()} : findPage(page);
  if(!info) notFound();
  return <><PageTitle {...info}/><section className="wrap section page-section">
    {page === 'services' && <><ServiceCards/><div className="section-head prices-heading"><h2>ค่าบริการสำหรับน้องหมาและแมว</h2></div><Prices/><div className="faq"><h3>ก่อนจองบริการ</h3><details open><summary>ราคาและเงื่อนไขบริการ</summary><p>สอบถามราคา รายการบริการที่รวมอยู่ และค่าใช้จ่ายเพิ่มเติมกับสาขาโดยตรง แจ้งลักษณะขน ขนพันกัน และข้อจำกัดในการดูแลก่อนจอง เพื่อให้ร้านประเมินรายละเอียดได้</p></details><details><summary>จองคิวอย่างไร?</summary><p>เลือกสาขา ทัก LINE OA แจ้งบริการและวันที่ต้องการ จากนั้นรอร้านยืนยันคิวและราคา การเปิดแชตยังไม่ถือเป็นการยืนยันการจอง</p></details><details><summary>ต้องเตรียมอะไรสำหรับฝากเลี้ยง?</summary><p>แจ้งวันเข้าพัก วันรับกลับ และกิจวัตรของน้อง สอบถามเงื่อนไข เอกสาร อาหารและของใช้ที่ต้องนำมาจากสาขาก่อนเข้าพัก</p></details></div></>}
    {(page === 'branches' || page === 'contact') && <BranchCards maps/>}
    {page === 'gallery' && <Gallery/>}
    {page === 'reviews' && <><Reviews/><p className="note">เราจะเพิ่มรีวิวจริง คะแนน Google และลิงก์รีวิวรายสาขาหลังยืนยันแหล่งข้อมูล ไม่แสดงคะแนนหรือข้อความรีวิวที่สมมติขึ้น</p></>}
    {page === 'journal' && <Articles/>}
  </section><CallToAction/></>;
}
