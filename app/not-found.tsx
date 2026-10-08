import Link from 'next/link';
import { PageTitle } from '@/components/sections';
export default function NotFound(){return <><PageTitle eyebrow="PAMA GROOMING" title="ไม่พบหน้านี้" description="กลับหน้าแรกเพื่อเลือกบริการหรือสาขาที่ต้องการ"/><div className="wrap section"><Link className="btn" href="/">กลับหน้าแรก</Link></div></>}
