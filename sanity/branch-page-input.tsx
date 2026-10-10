import {useEffect,useRef} from 'react';
import {setIfMissing,type StringInputProps,type TextInputProps} from 'sanity';
import {pageInfo} from '@/lib/content';
export function BranchPageInput(props:StringInputProps|TextInputProps){
 const initialized=useRef(false);
 const field=props.path[props.path.length-1] as keyof typeof pageInfo.branches;
 const fallback=pageInfo.branches[field];
 useEffect(()=>{
  if(props.readOnly||initialized.current)return;
  initialized.current=true;
  if(props.value===undefined&&fallback)props.onChange(setIfMissing(fallback));
 },[props.readOnly,props.value,props.onChange,fallback]);
 return props.renderDefault(props as StringInputProps & TextInputProps);
}
