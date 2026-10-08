import {images} from './content';

export const articleCovers:Record<string,string>={
  'dog-bathing-and-grooming':'/images/journal/dog-bathing-and-grooming.webp',
  'cat-bathing-and-coat-care':'/images/journal/cat-bathing-and-coat-care.webp',
  'pet-skin-and-coat-health':'/images/journal/pet-skin-and-coat-health.webp',
  'seasonal-pet-care':'/images/journal/seasonal-pet-care.webp',
  'dog-and-cat-care-faq':'/images/journal/dog-and-cat-care-faq.webp',
  'choosing-pet-grooming-service':'/images/journal/choosing-pet-grooming-service.webp',
  'coat-routine':'/images/journal/coat-routine.webp',
  'boarding-checklist':'/images/journal/boarding-checklist.webp',
};
const stockDefaults=new Set<string>(Object.values(images));
export function articleCover(slug:string,current?:string) {
  // Keep images uploaded or chosen in the CMS; replace only our shared stock defaults.
  return articleCovers[slug]&&(!current||stockDefaults.has(current))?articleCovers[slug]:current;
}
