import type {Price} from './cms-defaults';
export function examplePrice(row:Price):Price {
 if(row.price && row.price.trim()!=='สอบถามสาขาผ่าน LINE')return row;
 const cat=row.pet==='แมว';
 const amount=/ฝากเลี้ยง/.test(row.service)?(cat?250:300):/ตัดขน/.test(row.service)?(cat?650:550):(cat?400:350);
 return {...row,price:`เริ่มต้น ${amount} บาท${/ฝากเลี้ยง/.test(row.service)?' / วัน':''}`,example:true};
}
