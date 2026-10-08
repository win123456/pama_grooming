import {getGallery} from '@/lib/site-content';
import {WorkGalleryClient} from './work-gallery-client';
export async function WorkGallery(){const {works}=await getGallery();return <WorkGalleryClient works={works}/>;}
