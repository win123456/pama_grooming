'use client';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '@/components/ui/accordion';
export function ServiceFaq({items}:{items:{_key:string;question:string;answer:string}[]}) {
 return <div className="faq"><h3>ก่อนจองบริการ</h3><Accordion type="single" collapsible defaultValue={items[0]?._key}>{items.map(item=><AccordionItem key={item._key} value={item._key}><AccordionTrigger>{item.question}</AccordionTrigger><AccordionContent>{item.answer}</AccordionContent></AccordionItem>)}</Accordion></div>;
}
