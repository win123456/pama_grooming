import {PortableText,type PortableTextComponents} from '@portabletext/react';
import {createImageUrlBuilder} from '@sanity/image-url';
import {dataset,projectId} from '@/sanity/env';
import type {PortableTextBlock} from '@portabletext/types';

const builder=createImageUrlBuilder({projectId,dataset});
const components:PortableTextComponents={
  types:{image:({value})=><figure><img src={builder.image(value).width(1200).auto('format').url()} alt={value.alt||''} loading="lazy"/><figcaption>{value.caption}</figcaption></figure>},
  marks:{link:({children,value})=>{
    const href=typeof value?.href==='string'&&/^(https?:\/\/|mailto:|tel:)/i.test(value.href)?value.href:undefined;
    return href?<a href={href} target="_blank" rel="noopener noreferrer">{children}</a>:<span>{children}</span>;
  }},
};
export function ArticleBody({body}:{body:PortableTextBlock[]}) {return <PortableText value={body} components={components}/>;}
