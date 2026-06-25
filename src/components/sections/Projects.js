'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { projects } from '@/data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════
   SECTION WRAPPER
══════════════════════════════════════════ */
const ProjectsSection = styled.section`
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  z-index: 5;
  overflow: clip;

  .custom-projects-cursor {
    pointer-events: none;
    position: fixed;
    top: 0; left: 0;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    mix-blend-mode: normal;
    z-index: 9999;
    opacity: 0;
    transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
    will-change: transform, width, height;
    @media (pointer: coarse) { display: none; }
  }
  .custom-projects-cursor.active { opacity: 1; }
  .custom-projects-cursor.hovered {
    width: 60px; height: 60px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0.3;
  }
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
  direction: ltr;
  background-color: ${({ theme }) => theme.colors.bg};
`;

/* Top-left label */
const Header = styled.header`
  position: absolute;
  top: 6rem;
  left: 2rem;
  z-index: 50;
  pointer-events: none;
  @media (min-width: 768px) { top: 7rem; left: 3rem; }
`;

const HeaderTitle = styled.h1`
  font-family: 'Anton', sans-serif;
  letter-spacing: 0.1em;
  font-size: 1.25rem;
  line-height: 1.2;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  @media (min-width: 768px) { font-size: 1.5rem; }
`;

/* Scroll hint top-right */
const ScrollHintWrapper = styled.div`
  position: absolute;
  top: 6rem;
  right: 2rem;
  z-index: 50;
  pointer-events: none;
  @media (min-width: 768px) { top: 7rem; right: 3rem; }
`;

const ScrollHintText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 300;
`;

/* Progress bar bottom */
const ProgressBarWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  z-index: 50;
  pointer-events: none;
  @media (min-width: 768px) { bottom: 3rem; left: 3rem; right: 3rem; }
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.accent};
  transform-origin: left;
  transform: scaleX(0);
  will-change: transform;
`;

/* Horizontal scroll container */
const ScrollContainer = styled.div`
  display: flex;
  height: 100%;
  width: max-content;
  will-change: transform;
  direction: ltr;
`;

/* ══════════════════════════════════════════
   SLIDE — SPLIT LAYOUT
══════════════════════════════════════════ */
const Slide = styled.section`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bg};
  padding: 0 4rem;
  gap: 4rem;

  @media (max-width: 768px) {
    width: 100vw;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    padding: 6rem 1.5rem 5rem;
    gap: 2rem;
  }
`;

/* Background giant number */
const SlideNumber = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Anton', sans-serif;
  font-size: 40vw;
  color: transparent;
  -webkit-text-stroke: 1px ${({ theme }) =>
    theme.name === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'};
  pointer-events: none;
  user-select: none;
  z-index: 0;
  line-height: 1;
`;

/* ── LEFT: Text content ── */
const ProjectContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-top: 4rem;

  @media (max-width: 768px) {
    padding-top: 0;
    gap: 0.75rem;
  }
`;

const ProjectIndex = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
`;

const ProjectTitle = styled.h2`
  font-family: 'Anton', sans-serif;
  font-size: clamp(2.5rem, 5vw, 5rem);
  text-transform: uppercase;
  line-height: 0.9;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
`;

const ProjectSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 500;
`;

const ProjectDesc = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 480px;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    display: none;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

const TechTag = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.bgSecondary};
`;

const ViewBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  cursor: pointer;
  width: fit-content;
  padding-bottom: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent};
  transition: all 0.3s ease;

  span {
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    span { transform: translateX(6px); }
  }
`;

/* ── RIGHT: Image card ── */
const ImageCard = styled.a`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 65vh;
  background-color: #18181b;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 30px 60px -15px rgba(0,0,0,0.5);
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  cursor: none;
  text-decoration: none;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 40px 80px -15px rgba(0,0,0,0.6),
                0 0 0 1px ${({ theme }) => theme.colors.accent}44;
  }

  @media (max-width: 768px) {
    height: 45vh;
    cursor: auto;
  }
`;

const BrowserBar = styled.div`
  height: 2.25rem;
  background-color: #2d2d31;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  flex-shrink: 0;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.$color};
`;

const BrowserUrl = styled.div`
  flex: 1;
  height: 1.25rem;
  background-color: #1e1e20;
  border-radius: 4px;
  margin-left: 0.75rem;
  max-width: 55%;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 4px;
`;

const UrlText = styled.span`
  font-size: 10px;
  color: rgba(255,255,255,0.35);
  font-family: ${({ theme }) => theme.fonts.mono};
  overflow: hidden;
  white-space: nowrap;
`;

const ImageInner = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const ProjectImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  will-change: transform;
  transition: transform 0.7s;
  transform: scale(1);
  img { object-position: top; }

  ${ImageCard}:hover & { transform: scale(1.04); }
`;

const AccentLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.accentLight},
    transparent
  );
  z-index: 10;
  opacity: 0;
  transition: opacity 0.4s ease;

  ${ImageCard}:hover & { opacity: 1; }
`;

export default function Projects() {
  const { t } = useLanguage();
  const translatedItems = t('projects.items') || [];

  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const cursorRef = useRef(null);
  const [sectionHeight, setSectionHeight] = useState('400vh');

  useEffect(() => {
    const updateHeight = () => {
      const totalHeight = (projects.length * window.innerWidth) + window.innerHeight;
      setSectionHeight(`${totalHeight}px`);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;
    let ctx;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const winWidth = window.innerWidth;
        const totalScrollDistance = (projects.length - 1) * winWidth;
        const targetX = -totalScrollDistance;

        gsap.set(containerRef.current, { x: 0 });
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left' });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          }
        });

        tl.to({}, { duration: 0.05 });
        tl.to(containerRef.current, { x: targetX, ease: 'none', duration: 0.95 }, 0.05);

        if (progressBarRef.current) {
          tl.to(progressBarRef.current, { scaleX: 1, ease: 'none', duration: 0.95 }, 0.05);
        }

        // Per-slide image parallax
        const slides = containerRef.current.querySelectorAll('.slide');
        const numSlides = slides.length;
        const segment = 0.95 / Math.max(1, numSlides - 1);

        slides.forEach((slide, i) => {
          const imgEl = slide.querySelector('.parallax-bg img') || slide.querySelector('.parallax-bg');
          if (imgEl) {
            let startT = 0.05 + (i - 1) * segment;
            let dur = 2 * segment;
            if (i === 0) { startT = 0; dur = 0.05 + segment; }
            else if (i === numSlides - 1) { startT = 0.05 + (i - 1) * segment; dur = segment; }
            tl.to(imgEl, { objectPosition: '50% 100%', ease: 'none', duration: dur }, Math.max(0, startT));
          }
        });

      }, sectionRef);
      ScrollTrigger.refresh();
    }, 500);

    return () => { clearTimeout(timer); if (ctx) ctx.revert(); };
  }, [projects.length]);

  // Custom cursor
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let targetX = cursorX, targetY = cursorY;
    let rafId;

    const onMove = (e) => { targetX = e.clientX; targetY = e.clientY; };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      cursorX += (targetX - cursorX) * 0.15;
      cursorY += (targetY - cursorY) * 0.15;
      if (cursorRef.current) {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (rect && rect.top <= window.innerHeight && rect.bottom >= 0) {
          cursorRef.current.classList.add('active');
        } else {
          cursorRef.current.classList.remove('active');
        }
        cursorRef.current.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId); };
  }, []);

  const onEnter = () => cursorRef.current?.classList.add('hovered');
  const onLeave = () => cursorRef.current?.classList.remove('hovered');

  return (
    <ProjectsSection id="projects" ref={sectionRef} style={{ height: sectionHeight }}>
      <div ref={cursorRef} className="custom-projects-cursor" />

      <StickyContainer>
        <Header>
          <HeaderTitle>
            {t('projects.label') || 'Portfolio'}<br />{t('projects.title') || 'Featured Projects'}
          </HeaderTitle>
        </Header>

        <ScrollHintWrapper>
          <ScrollHintText>{t('projects.scrollHint') || 'Scroll Down ↓'}</ScrollHintText>
        </ScrollHintWrapper>

        <ProgressBarWrapper>
          <ProgressBar ref={progressBarRef} />
        </ProgressBarWrapper>

        <ScrollContainer ref={containerRef}>
          {projects.map((projet, index) => {
            const translated = Array.isArray(translatedItems) ? translatedItems[index] : null;
            const title     = translated?.title       || projet.title;
            const desc      = translated?.description || projet.description;
            const subtitle  = projet.subtitle;
            const link      = translated?.link        || projet.link || '#';
            const image     = translated?.image       || projet.image;
            const tech      = projet.tech || [];

            return (
              <Slide key={projet.id} className="slide" data-index={index}>
                {/* Background ghost number */}
                <SlideNumber>0{index + 1}</SlideNumber>

                {/* LEFT — Text */}
                <ProjectContent>
                  <ProjectIndex>0{index + 1} — {projet.category || 'Project'}</ProjectIndex>
                  <ProjectTitle>{title}</ProjectTitle>
                  <ProjectSubtitle>{subtitle}</ProjectSubtitle>
                  <ProjectDesc>{desc}</ProjectDesc>
                  <TechStack>
                    {tech.map((t) => <TechTag key={t}>{t}</TechTag>)}
                  </TechStack>
                  <ViewBtn href={link} target="_blank" rel="noreferrer">
                    {t('projects.viewProject') || 'View Project'} <span>→</span>
                  </ViewBtn>
                </ProjectContent>

                {/* RIGHT — Image */}
                <ImageCard
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  <BrowserBar>
                    <Dot $color="#ff5f56" />
                    <Dot $color="#ffbd2e" />
                    <Dot $color="#27c93f" />
                    <BrowserUrl>
                      <UrlText>{link !== '#' ? link.replace('https://', '') : 'project.demo'}</UrlText>
                    </BrowserUrl>
                  </BrowserBar>
                  <ImageInner>
                    <ProjectImageWrapper className="parallax-bg">
                      <Image
                        src={image}
                        alt={`${title} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        priority={index === 0}
                        quality={80}
                      />
                    </ProjectImageWrapper>
                    <AccentLine />
                  </ImageInner>
                </ImageCard>
              </Slide>
            );
          })}
        </ScrollContainer>
      </StickyContainer>
    </ProjectsSection>
  );
}