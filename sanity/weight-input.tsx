'use client';
import {useFormValue,type StringInputProps} from 'sanity';
const dogWeights=['SS · 0–2.99 กก.','S · 3–4.99 กก.','M · 5–7.99 กก.','L · 8–11.99 กก.','XL · 12–14.99 กก.','มากกว่า 15 กก.'];
const catWeights=['S · 0–2.99 กก.','M · 3–4.99 กก.','L · 5–9.99 กก.','XL · 10 กก.'];
export function WeightInput(props:StringInputProps){
 const pet=useFormValue([...props.path.slice(0,-1),'pet']);
 const values=pet==='แมว'?catWeights:pet==='สุนัข'?dogWeights:Array.from(new Set([...dogWeights,...catWeights]));
 return props.renderDefault({...props,schemaType:{...props.schemaType,options:{...props.schemaType.options,list:values.map(value=>({title:value,value})),layout:'dropdown'}}});
}
