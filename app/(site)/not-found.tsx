import Link from 'next/link';
import { PageTitle } from '@/components/sections';
import {Button} from '@/components/ui/button';
export default function NotFound(){return <><PageTitle eyebrow="PAMA GROOMING" title="ไม่พบหน้านี้" description="กลับหน้าแรกเพื่อเลือกบริการหรือสาขาที่ต้องการ"/><div className="wrap section"><Button asChild><Link href="/">กลับหน้าแรก</Link></Button></div></>}
