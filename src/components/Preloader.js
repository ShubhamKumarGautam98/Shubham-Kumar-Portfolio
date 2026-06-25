'use client';
import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

/* ══════════════════════════════════════════
   ANIMATIONS
══════════════════════════════════════════ */
const fadeOut = keyframes`
  to { opacity: 0; visibility: hidden; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); filter: blur(8px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
`;

const expandLine = keyframes`
  from { width: 0; }
  to   { width: 100%; }
`;

const glowPulse = keyframes`
  0%, 100% { text-shadow: 0 0 40px rgba(16,185,129,0.3); }
  50%       { text-shadow: 0 0 80px rgba(16,185,129,0.6); }
`;

/* ══════════════════════════════════════════
   STYLED COMPONENTS
══════════════════════════════════════════ */
const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  animation: ${({ $fadeOut }) => ($fadeOut ? fadeOut : 'none')} 0.7s ease forwards;
  pointer-events: ${({ $gone }) => ($gone ? 'none' : 'all')};
`;

/* Big percentage number in the background */
const BgCounter = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(180px, 30vw, 400px);
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 1px ${({ theme }) => theme.colors.accent}22;
  letter-spacing: -0.05em;
  line-height: 1;
  user-select: none;
  pointer-events: none;
  transition: color 0.1s;
`;

/* Foreground content */
const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  padding: 0 5vw;
  width: 100%;
  max-width: 900px;
`;

const Greeting = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(12px, 1.2vw, 16px);
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 12px;
  opacity: 0;
  animation: ${slideUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(40px, 7vw, 96px);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.0;
  letter-spacing: -0.03em;
  margin: 0 0 8px 0;
  opacity: 0;
  animation: ${slideUp} 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
`;

const Headline = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(14px, 2.2vw, 28px);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0;
  opacity: 0;
  animation: ${slideUp} 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards,
             ${glowPulse} 3s ease-in-out 1.6s infinite;
`;

const Divider = styled.div`
  height: 2px;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.accent}, transparent);
  margin: 20px 0;
  opacity: 0;
  animation: ${slideUp} 0.6s ease 0.9s forwards;
  width: 0;
  animation: ${expandLine} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards;
  max-width: 400px;
`;

/* Bottom progress bar */
const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.colors.border};
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.accentLight});
  width: ${({ $pct }) => $pct}%;
  transition: width 0.05s linear;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.accentGlow};
`;

/* Bottom-right counter label */
const CounterLabel = styled.div`
  position: absolute;
  bottom: 28px;
  right: 40px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(11px, 1vw, 14px);
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 2px;
  opacity: 0;
  animation: ${slideUp} 0.5s ease 0.8s forwards;
`;

/* Top-left location tag */
const LocationTag = styled.div`
  position: absolute;
  top: 32px;
  left: 40px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 3px;
  text-transform: uppercase;
  opacity: 0;
  animation: ${slideUp} 0.5s ease 1s forwards;
`;

/* Top-right status */
const StatusTag = styled.div`
  position: absolute;
  top: 32px;
  right: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0;
  animation: ${slideUp} 0.5s ease 1s forwards;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    animation: ${glowPulse} 1.5s ease-in-out infinite;
  }
`;

/* ══════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════ */
export default function Preloader() {
  const [percent, setPercent] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const [gone, setGone] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    // Skip for bots / Lighthouse
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse/i.test(navigator.userAgent);
    if (isBot) {
      setGone(true);
      window.dispatchEvent(new Event('preloader-finished'));
      return;
    }

    // Animate counter from 0 → 100 over ~2.4s
    const duration = 2400;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const raw = Math.min(elapsed / duration, 1);
      // Ease out — fast start, slows at the end
      const eased = 1 - Math.pow(1 - raw, 3);
      const value = Math.round(eased * 100);
      setPercent(value);

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Hold briefly then fade out
        setTimeout(() => {
          setFadingOut(true);
          setTimeout(() => {
            setGone(true);
            window.dispatchEvent(new Event('preloader-finished'));
          }, 700);
        }, 300);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (gone) return null;

  return (
    <Wrapper $fadeOut={fadingOut} $gone={gone}>
      {/* Background giant counter */}
      <BgCounter aria-hidden="true">{percent}%</BgCounter>

      {/* Corner tags */}
      <LocationTag>New Delhi, India</LocationTag>
      <StatusTag>Available for Remote</StatusTag>

      {/* Main content */}
      <Content>
        <Greeting>👋 Hello World — I am</Greeting>
        <Name>Shubham<br />Kumar</Name>
        <Divider />
        <Headline>Full Stack AI Automation Engineer</Headline>
      </Content>

      {/* Progress bar at bottom */}
      <ProgressBar>
        <ProgressFill $pct={percent} />
      </ProgressBar>

      {/* Counter label */}
      <CounterLabel>Loading {percent}%</CounterLabel>
    </Wrapper>
  );
}