import { useEffect, useState } from 'react';
import * as api from './client';
export default function HeroCarousel(){
  const [slides,setSlides]=useState<api.CarouselSlide[]>([]);
  const [visibleLimit,setVisibleLimit]=useState(6);
  const [index,setIndex]=useState(0);
  const [paused,setPaused]=useState(false);
  const visibleSlides=slides.slice(0,visibleLimit);
  const activeSlide=visibleSlides[index]??visibleSlides[0];

  useEffect(()=>{
    api.getCarousel().then(setSlides).catch(()=>setSlides([]));
  },[]);

  useEffect(()=>{
    const mediaQuery=window.matchMedia('(max-width: 700px)');
    const updateLimit=()=>setVisibleLimit(mediaQuery.matches?2:slides.length||6);
    updateLimit();
    if(mediaQuery.addEventListener){
      mediaQuery.addEventListener('change',updateLimit);
      return()=>mediaQuery.removeEventListener('change',updateLimit);
    }
    mediaQuery.addListener(updateLimit);
    return()=>mediaQuery.removeListener(updateLimit);
  },[slides.length]);

  useEffect(()=>{
    setIndex(current=>Math.min(current,Math.max(visibleSlides.length-1,0)));
  },[visibleSlides.length]);

  const move=(direction:number)=>setIndex(current=>{
    const length=visibleSlides.length;
    return length? (current+direction+length)%length:0;
  });

  useEffect(()=>{
    if(paused||visibleSlides.length<2)return;
    const timer=window.setInterval(()=>move(1),5000);
    return()=>window.clearInterval(timer);
  },[paused,visibleSlides.length]);

  if(!visibleSlides.length)return <div className="hero-art hero-fallback"><span>PuntoSano</span><small>Productos nobles, hechos con tiempo y cuidado.</small></div>;
  return <div className="hero-art" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Destacados" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocus={()=>setPaused(true)} onBlur={()=>setPaused(false)} onKeyDown={event=>{if(event.key==='ArrowLeft')move(-1);if(event.key==='ArrowRight')move(1)}}><img src={activeSlide.imageUrl} alt={`Destacado ${index+1} de ${visibleSlides.length}`}/>{visibleSlides.length>1&&<><button className="carousel-control previous" type="button" aria-label="Anterior" onClick={()=>move(-1)}>‹</button><button className="carousel-control next" type="button" aria-label="Siguiente" onClick={()=>move(1)}>›</button><div className="carousel-dots">{visibleSlides.map((slide,slideIndex)=><button key={slide.id} type="button" aria-label={`Ir al destacado ${slideIndex+1}`} aria-current={slideIndex===index} onClick={()=>setIndex(slideIndex)}/>)}</div></>}</div>;
}
