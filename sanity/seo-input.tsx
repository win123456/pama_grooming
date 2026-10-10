import {useEffect,useRef} from 'react';
import {setIfMissing,useFormValue,type StringInputProps,type TextInputProps} from 'sanity';
import {pageInfo} from '@/lib/content';
const homeTitle='PAMA GROOMING | อาบน้ำ ตัดขน ฝากเลี้ยงสัตว์เลี้ยง';
const homeDescription='PAMA GROOMING บริการอาบน้ำ ตัดขน และฝากเลี้ยงสุนัขและแมว สาขารามคำแหง 114 และพหลโยธิน 64 จองคิวผ่าน LINE';
export function SeoInput(props:StringInputProps|TextInputProps){
 const doc=useFormValue([]) as {_type?:string;title?:string;description?:string;intro?:string}|undefined;
 const initialized=useRef(false);
 const key=({serviceSettings:'services',gallerySettings:'gallery',contactSettings:'contact',journalSettings:'journal',branchPageSettings:'branches',reviewPageSettings:'reviews'} as const)[doc?._type as 'serviceSettings'];
 const base=key?pageInfo[key]:undefined;
 const title=doc?._type==='homeSettings'?homeTitle:(base?.title||doc?.title||(doc?._type==='journalSettings'?'สาระน่ารู้เกี่ยวกับสุนัขและแมว':''));
 const fallback=props.schemaType.name==='text'?(doc?._type==='homeSettings'?homeDescription:base?.description||doc?.description||doc?.intro||'แนวทางเตรียมตัวและกิจวัตรง่าย ๆ สำหรับเจ้าของสัตว์เลี้ยง'):(doc?._type==='homeSettings'?title:title?title+' | PAMA GROOMING':'');
 useEffect(()=>{
  if(props.readOnly||initialized.current||!doc?._type)return;
  initialized.current=true;
  if(props.value===undefined&&fallback)props.onChange(setIfMissing(fallback));
 },[doc?._type,props.readOnly,props.value,fallback,props.onChange]);
 return props.renderDefault(props as StringInputProps & TextInputProps);
}
