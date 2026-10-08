export const navigation = [
  ['/', 'หน้าแรก'], ['/services', 'บริการและราคา'],
  ['/gallery', 'ผลงานของเรา'], ['/reviews', 'รีวิวลูกค้า'], ['/journal', 'สาระน่ารู้'], ['/branches', 'สาขาของเรา'], ['/contact', 'ติดต่อเรา'],
] as const;

export const branches = [
  {name:'รามคำแหง 114', line:'@pamagrooming', url:'https://lin.ee/pBC80S0', phone:'0612593998', display:'061-259-3998', fb:'https://www.facebook.com/share/1BvY3Fd1as/?mibextid=wwXIfr'},
  {name:'พหลโยธิน 64', line:'@pama2', url:'https://lin.ee/Pa2GWJz', phone:'0842492255', display:'084-249-2255', fb:'https://www.facebook.com/share/1DqXrVfv5S/?mibextid=wwXIfr'},
] as const;

export const images = {
  hero:'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=85',
  dog:'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=700&q=85',
  cat:'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=85',
  stay:'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=85',
  groomService:'/images/home/groom-service.webp',
  boardingService:'/images/home/boarding-service.webp',
  galleryDog:'/images/home/gallery-dog.webp',
  galleryCat:'/images/home/gallery-cat.webp',
  galleryPuppy:'/images/home/gallery-puppy.webp',
};

export const services = [
  {number:'01', title:'อาบน้ำ & ดูแลขน', description:'สะอาด สดชื่น พร้อมกลับไปกอดกันอีกครั้ง สอบถามรายละเอียดบริการที่เหมาะกับน้องได้ทาง LINE', image:images.dog, label:'BATH & CARE'},
  {number:'02', title:'ตัดขน & จัดทรง', description:'เลือกทรงที่ชอบ และพูดคุยเรื่องลักษณะขนกับทีมงานก่อนนัดหมาย', image:images.groomService, label:'GROOM & STYLE'},
  {number:'03', title:'ฝากเลี้ยงสัตว์เลี้ยง', description:'วางแผนวันรับ–ส่ง และสอบถามเงื่อนไขการเข้าพักกับสาขาพหลโยธิน 64', image:images.boardingService, label:'PET BOARDING'},
];

export const posts = [
  {slug:'prepare-grooming', title:'เตรียมตัวอย่างไร ก่อนพาน้องมาอาบน้ำตัดขน', category:'GROOMING GUIDE', intro:'รายการเล็ก ๆ ที่ช่วยให้การนัดหมายเป็นเรื่องง่าย ทั้งสำหรับเจ้าของและเพื่อนตัวโปรด', paragraphs:[
    'เริ่มจากเลือกสาขาที่สะดวก ส่งรูปน้องและแจ้งสายพันธุ์ น้ำหนักโดยประมาณ รวมถึงทรงขนที่อยากได้ผ่าน LINE จากนั้นสอบถามราคาและเวลาที่ใช้ก่อนยืนยันคิว',
    'หากน้องมีข้อจำกัดในการดูแลหรือไม่คุ้นกับการอาบน้ำ ให้แจ้งทีมงานล่วงหน้า เตรียมสายจูงหรือกระเป๋าสำหรับเดินทาง และยืนยันเวลารับ–ส่งกับสาขาอีกครั้ง',
  ]},
  {slug:'coat-routine', title:'เปลี่ยนการดูแลขน ให้เป็นช่วงเวลาดี ๆ ที่บ้าน', category:'EVERYDAY CARE', intro:'เริ่มจากกิจวัตรสั้น ๆ และเลือกอุปกรณ์ให้เหมาะกับลักษณะขนของน้อง', paragraphs:[
    'เลือกหวีที่เหมาะกับลักษณะขน โดยสอบถามวิธีใช้จากช่างตัดขน เริ่มดูแลในช่วงที่น้องผ่อนคลาย ใช้เวลาสั้น ๆ และค่อย ๆ สร้างความคุ้นเคย',
    'หลีกเลี่ยงการดึงขนหรือฝืนเมื่อน้องไม่สบายตัว หากพบขนพันกันมาก ให้ช่างช่วยประเมินวิธีจัดการ และขอคำแนะนำสำหรับดูแลต่อที่บ้าน',
  ]},
  {slug:'boarding-checklist', title:'เช็กลิสต์ก่อนฝากเลี้ยง ให้วันเดินทางสบายใจ', category:'BOARDING CHECKLIST', intro:'เตรียมรายละเอียดกิจวัตรและของใช้ พร้อมพูดคุยเงื่อนไขกับสาขาก่อนเข้าพัก', paragraphs:[
    'แจ้งวันฝากและวันรับ พร้อมสอบถามพื้นที่ว่างและค่าบริการกับสาขา เตรียมรายละเอียดอาหาร ปริมาณ และช่วงเวลาที่น้องคุ้นเคย รวมถึงข้อมูลติดต่อเจ้าของและผู้ติดต่อสำรอง',
    'สอบถามร้านว่าควรนำของใช้ใดมาบ้าง และยืนยันเงื่อนไขการรับฝาก เอกสารที่ต้องใช้ รวมถึงข้อจำกัดของบริการก่อนนัดหมาย',
  ]},
];

export const pageInfo = {
  services: {eyebrow:'BATH · GROOM · STAY', title:'บริการและราคา', description:'เลือกการดูแลที่เหมาะกับน้อง และสอบถามราคาจากสาขาก่อนจองคิว'},
  branches: {eyebrow:'OUR BRANCHES', title:'สาขาของเรา', description:'ติดต่อ จองคิว และสอบถามรายละเอียดได้โดยตรงกับสาขาที่คุณสะดวก'},
  gallery: {eyebrow:'OUR LITTLE FRIENDS', title:'ผลงานของเรา', description:'พื้นที่สำหรับรวมภาพ Before & After และช่วงเวลาน่ารักของน้องหมาน้องแมว'},
  reviews: {eyebrow:'CUSTOMER STORIES', title:'รีวิวจากลูกค้า', description:'ติดตามความคิดเห็นจากลูกค้าผ่านช่องทางของแต่ละสาขา'},
  journal: {eyebrow:'THE PAMA JOURNAL', title:'สาระน่ารู้', description:'แนวทางเตรียมตัวและกิจวัตรง่าย ๆ สำหรับเจ้าของสัตว์เลี้ยง'},
  contact: {eyebrow:'LET’S TALK', title:'คุยกับ PAMA ได้ที่นี่', description:'ติดต่อ จองคิว และสอบถามรายละเอียดได้โดยตรงกับสาขาที่คุณสะดวก'},
};

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);
  return (configured || 'http://localhost:3000').replace(/\/$/, '');
}
