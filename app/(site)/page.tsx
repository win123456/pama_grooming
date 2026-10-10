import {HomeFaq} from '@/components/home-faq';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BookingButton } from '@/components/booking';
import { Articles, BranchCards, CallToAction, Gallery, Reviews, SectionHeading, ServiceCards } from '@/components/sections';
import {getHome} from '@/lib/site-content';
import {Fragment} from 'react';
function lines(text:string){return text.split('\n').map((line,i)=><Fragment key={i}>{i>0&&<br/>}{line}</Fragment>);}
import {Button} from '@/components/ui/button';
import {ArrowRight,PawPrint} from 'lucide-react';
import {Badge} from '@/components/ui/badge';

export const metadata: Metadata = {alternates:{canonical:'/'}};
export const revalidate=60;

export default async function HomePage() {
  const home=await getHome();
  return <>
    <section className="wrap hero"><div><Badge variant="secondary" className="hero-badge"><PawPrint aria-hidden="true"/> {lines(home.heroBadge)}</Badge><h1>{lines(home.heroTitle)} <span className="hero-heart">♡</span></h1><p>{lines(home.heroDescription)}</p><div className="actions"><BookingButton/><Button variant="outline" asChild><Link href="/services">{lines(home.exploreLabel)}<ArrowRight className="action-arrow" aria-hidden="true"/></Link></Button></div><div className="hero-note"><span>♧</span>{lines(home.heroNote)}</div></div><div className="hero-visual"><div className="stamp">{lines(home.stamp)}</div><img className="hero-image" src={home.heroImageUrl} alt={home.heroImageAlt} width={1000} height={1000} fetchPriority="high"/><div className="float"><span>♡</span><div><strong>{lines(home.floatTitle)}</strong><small>{lines(home.floatDescription)}</small></div></div></div></section>
    <div className="strip"><div className="wrap"><b>{lines(home.strip0)}</b><i>✳</i><b>{lines(home.strip1)}</b><i>✳</i><b>{lines(home.strip2)}</b><i>✳</i><b>{lines(home.strip3)}</b></div></div>
    <section className="wrap section"><SectionHeading eyebrow={home.sectionEyebrow0} title={home.sectionTitle0}><Link href="/services" className="link">{lines(home.sectionLink0)}</Link></SectionHeading><ServiceCards/></section>
    <section className="soft section"><div className="wrap story"><img src={home.storyImageUrl} alt={home.storyImageAlt} loading="lazy" width={700} height={600}/><div><span className="eyebrow">{lines(home.storyEyebrow)}</span><h2>{lines(home.storyTitle)}</h2><p>{lines(home.storyDescription)}</p><div className="points"><div><strong>{lines(home.pointTitle0)}</strong><small>{lines(home.pointDescription0)}</small></div><div><strong>{lines(home.pointTitle1)}</strong><small>{lines(home.pointDescription1)}</small></div><div><strong>{lines(home.pointTitle2)}</strong><small>{lines(home.pointDescription2)}</small></div><div><strong>{lines(home.pointTitle3)}</strong><small>{lines(home.pointDescription3)}</small></div></div></div></div></section>
    <section className="wrap section"><SectionHeading eyebrow={home.sectionEyebrow1} title={home.sectionTitle1}><p>{lines(home.branchesDescription)}</p></SectionHeading><BranchCards/></section>
    <section className="wrap section section-no-top"><SectionHeading eyebrow={home.sectionEyebrow2} title={home.sectionTitle2}><Link className="link" href="/gallery">{lines(home.sectionLink1)}</Link></SectionHeading><Gallery/></section>
    <section className="soft section"><div className="wrap"><SectionHeading eyebrow={home.sectionEyebrow3} title={home.sectionTitle3}><Link className="link" href="/reviews">{lines(home.sectionLink2)}</Link></SectionHeading><Reviews/></div></section>
    <section className="wrap section"><SectionHeading eyebrow={home.sectionEyebrow4} title={home.sectionTitle4}><Link className="link" href="/journal">{lines(home.sectionLink3)}</Link></SectionHeading><Articles/></section><HomeFaq title={home.faqTitle} eyebrow={home.faqEyebrow} linkLabel={home.faqLink}/><CallToAction title={home.ctaTitle} description={home.ctaDescription}/>
  </>;
}
