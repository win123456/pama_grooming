import Link from 'next/link';
import {ArrowUpRight, ChevronLeft, ChevronRight, PawPrint} from 'lucide-react';
import {getArticles, type Article} from '@/lib/articles';
import {getSiteUrl, images} from '@/lib/content';
import {paginate} from '@/lib/pagination';
import './journal.css';

export const journalTitle = 'สาระน่ารู้เกี่ยวกับสุนัขและแมว';
function postImage(post:Article) {
  if(post.coverUrl) return post.coverUrl;
  if(post.topic==='cat'||/แมว|cat/i.test(post.title)) return images.cat;
  if(post.slug==='boarding-checklist') return images.stay;
  return images.dog;
}
function ArticleCard({post,lead=false}:{post:Article;lead?:boolean}) {
  const date=post.publishedAt?new Date(post.publishedAt):null;
  const validDate=date&&!Number.isNaN(date.getTime());
  return <article className={`journal-card${lead?' journal-card-lead':''}`}>
    <Link href={`/journal/${post.slug}`} className="journal-card-cover" tabIndex={-1} aria-hidden="true"><img src={postImage(post)} alt={post.coverUrl?(post.coverAlt?.replaceAll('ภาพประกอบ','')||''):''} width={900} height={600} loading={lead?'eager':'lazy'}/></Link>
    <div className="journal-card-body"><div className="journal-card-meta"><span>{post.category}</span>{validDate&&<time dateTime={post.publishedAt}>{date.toLocaleDateString('th-TH',{day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Bangkok'})}</time>}</div><h3><Link href={`/journal/${post.slug}`}>{post.title}</Link></h3><p>{post.intro}</p><Link className="journal-read" href={`/journal/${post.slug}`}>อ่านบทความ<ArrowUpRight size={18} aria-hidden="true"/></Link></div>
  </article>;
}
export async function JournalPage({title=journalTitle,description,requestedPage}:{title?:string;description:string;requestedPage?:string}) {
  const posts=await getArticles();
  const latest=[...posts].sort((a,b)=>(Date.parse(b.publishedAt)||0)-(Date.parse(a.publishedAt)||0));
  const pagination=paginate(latest,requestedPage);
  const pageHref=(page:number)=>`${page===1?'/journal':`/journal?pg=${page}`}#latest`;
  const siteUrl=getSiteUrl();
  const collectionUrl=`${siteUrl}/journal${pagination.page>1?`?pg=${pagination.page}`:''}`;
  const structuredData={'@context':'https://schema.org','@graph':[
    {'@type':'CollectionPage','@id':`${collectionUrl}#page`,url:collectionUrl,name:`${title} | PAMA GROOMING`,description,inLanguage:'th',mainEntity:{'@type':'ItemList',itemListElement:pagination.items.map((post,index)=>({'@type':'ListItem',position:pagination.start+index+1,name:post.title,url:`${siteUrl}/journal/${post.slug}`}))}},
  ]};
  return <div className="journal-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,'\\u003c')}}/>
    <div className="wrap journal-hero"><div className="journal-breadcrumb"><Link href="/">หน้าแรก</Link><span aria-hidden="true">/</span><span>สาระน่ารู้</span></div><span className="eyebrow">THE PAMA JOURNAL</span><h1>{title}<span> | PAMA GROOMING</span></h1><div className="journal-hero-bottom"><p>{description}</p><span className="journal-hero-note"><PawPrint size={22} aria-hidden="true"/>เรื่องเล็ก ๆ เพื่อวันดี ๆ ของเพื่อนตัวโปรด</span></div></div>
    <section className="wrap journal-section" id="latest"><div className="journal-heading"><h2 className="journal-grid-title">บทความล่าสุดจาก PAMA GROOMING</h2><span className="journal-count">{posts.length} บทความ</span></div>{pagination.items.length?<div className="journal-latest">{pagination.items.map(post=><ArticleCard key={post._id} post={post}/>)}</div>:<p className="muted">บทความใหม่จะปรากฏที่นี่เมื่อเผยแพร่</p>}<div className="journal-pagination-area"><p>{posts.length?`${pagination.start+1}–${pagination.start+pagination.items.length} จาก ${posts.length} บทความ`:'ยังไม่มีบทความ'}</p><nav className="journal-pagination" aria-label="หน้าบทความ">{pagination.page>1?<Link className="journal-page-arrow" href={pageHref(pagination.page-1)} aria-label="หน้าก่อนหน้า"><ChevronLeft size={18} aria-hidden="true"/></Link>:<span className="journal-page-arrow" aria-disabled="true" aria-label="หน้าก่อนหน้า"><ChevronLeft size={18} aria-hidden="true"/></span>}{Array.from({length:pagination.totalPages},(_,index)=>index+1).map(page=><Link key={page} href={pageHref(page)} aria-label={`หน้าที่ ${page}`} aria-current={page===pagination.page?'page':undefined}>{page}</Link>)}{pagination.page<pagination.totalPages?<Link className="journal-page-arrow" href={pageHref(pagination.page+1)} aria-label="หน้าถัดไป"><ChevronRight size={18} aria-hidden="true"/></Link>:<span className="journal-page-arrow" aria-disabled="true" aria-label="หน้าถัดไป"><ChevronRight size={18} aria-hidden="true"/></span>}</nav></div></section>
  </div>;
}
