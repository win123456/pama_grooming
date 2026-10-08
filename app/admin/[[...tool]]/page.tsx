import {NextStudio,metadata as studioMetadata,viewport} from 'next-sanity/studio';
import config from '@/sanity.config';
export const dynamic='force-static';
export const metadata={...studioMetadata,title:{absolute:'จัดการบทความ — PAMA GROOMING'},robots:{index:false,follow:false}};
export {viewport};
export default function AdminPage(){return <NextStudio config={config}/>;}
