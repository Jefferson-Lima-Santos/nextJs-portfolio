'use client';

import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import './style.css';

declare global {
  interface Window {
    anime: any;
  }
}

const AnimatedCharacter: React.FC = () => {
  const characterRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const mouthRef = useRef<HTMLDivElement>(null);
  const armLeftRef = useRef<HTMLDivElement>(null);
  const armRightRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.anime) {
      const anime = window.anime;

      animationsRef.current.forEach(animation => {
        if (animation && animation.pause) {
          animation.pause();
        }
      });
      animationsRef.current = [];

      const entryAnimation = anime({
        targets: characterRef.current,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutElastic(1, .8)',
        delay: 500,
        complete: () => {
          startFloatingAnimation();
        }
      });
      animationsRef.current.push(entryAnimation);

      const startFloatingAnimation = () => {
        const floatingAnimation = anime({
          targets: characterRef.current,
          translateY: [-5, 5],
          duration: 2000,
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutSine'
        });
        animationsRef.current.push(floatingAnimation);
      };

      const blinkAnimation = () => {
        if (!eyesRef.current?.children) return;

        const blink = anime({
          targets: eyesRef.current.children,
          scaleY: [1, 0.1, 1],
          duration: 150,
          delay: anime.stagger(50),
          complete: () => {
            setTimeout(blinkAnimation, Math.random() * 3000 + 2000);
          }
        });
        animationsRef.current.push(blink);
      };

      setTimeout(blinkAnimation, 2000);

      const talkAnimation = () => {
        if (!mouthRef.current) return;

        const talk = anime({
          targets: mouthRef.current,
          scaleY: [1, 1.3, 0.8, 1.1, 1],
          scaleX: [1, 0.9, 1.2, 0.95, 1],
          duration: 800,
          easing: 'easeInOutSine',
          complete: () => {
            setTimeout(talkAnimation, Math.random() * 4000 + 3000);
          }
        });
        animationsRef.current.push(talk);
      };

      setTimeout(talkAnimation, 3000);

      const waveAnimation = () => {
        if (!armRightRef.current) return;

        const wave = anime({
          targets: armRightRef.current,
          rotate: [0, -30, 30, -20, 20, 0],
          duration: 1500,
          easing: 'easeInOutSine',
          complete: () => {
            setTimeout(waveAnimation, Math.random() * 8000 + 5000);
          }
        });
        animationsRef.current.push(wave);
      };

      setTimeout(waveAnimation, 4000);

      const handleMouseEnter = () => {
        anime({
          targets: characterRef.current,
          scale: 1.1,
          duration: 300,
          easing: 'easeOutQuad'
        });

        if (eyesRef.current?.children) {
          anime({
            targets: eyesRef.current.children,
            scale: 1.2,
            duration: 300,
            easing: 'easeOutQuad'
          });
        }
      };

      const handleMouseLeave = () => {
        anime({
          targets: characterRef.current,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        });

        if (eyesRef.current?.children) {
          anime({
            targets: eyesRef.current.children,
            scale: 1,
            duration: 300,
            easing: 'easeOutQuad'
          });
        }
      };

      const characterElement = characterRef.current;
      if (characterElement) {
        characterElement.addEventListener('mouseenter', handleMouseEnter);
        characterElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          characterElement.removeEventListener('mouseenter', handleMouseEnter);
          characterElement.removeEventListener('mouseleave', handleMouseLeave);

          animationsRef.current.forEach(animation => {
            if (animation && animation.pause) {
              animation.pause();
            }
          });
          animationsRef.current = [];
        };
      }
    }
  }, []);

  return (
    <Box
      className="animated-character-container"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        position: 'relative',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      <div className="sparkles">
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
      </div>

      <Box
        ref={characterRef}
        className="character"
        sx={{
          width: 200,
          height: 280,
          position: 'relative',
          transformOrigin: 'center bottom',
          filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))'
        }}
      >
        <Box
          sx={{
            width: 120,
            height: 140,
            backgroundColor: '#fdbcb4',
            borderRadius: '60px 60px 50px 50px',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            border: '3px solid #333',
            background: 'linear-gradient(145deg, #fdbcb4, #f5a394)',
            boxShadow: 'inset 0 2px 10px rgba(255, 255, 255, 0.3)'
          }}
        >
          <Box
            sx={{
              width: 130,
              height: 70,
              backgroundColor: '#2d1810',
              borderRadius: '65px 65px 30px 30px',
              position: 'absolute',
              top: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              border: '3px solid #333',
              background: 'linear-gradient(145deg, #2d1810, #1a0f08)'
            }}
          />

          <Box
            ref={eyesRef}
            sx={{
              position: 'absolute',
              top: 50,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '20px'
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: '#fff',
                borderRadius: '50%',
                border: '2px solid #333',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '3px',
                  left: '3px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#333',
                  borderRadius: '50%'
                }
              }}
            />
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: '#fff',
                borderRadius: '50%',
                border: '2px solid #333',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '3px',
                  left: '3px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#333',
                  borderRadius: '50%'
                }
              }}
            />
          </Box>

          <Box
            sx={{
              width: 6,
              height: 8,
              backgroundColor: '#e8a898',
              borderRadius: '50%',
              position: 'absolute',
              top: 75,
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />

          <Box
            ref={mouthRef}
            sx={{
              width: 30,
              height: 15,
              backgroundColor: '#d63384',
              borderRadius: '0 0 30px 30px',
              position: 'absolute',
              top: 95,
              left: '50%',
              transform: 'translateX(-50%)',
              border: '2px solid #333'
            }}
          />
        </Box>

        <Box
          sx={{
            width: 80,
            height: 100,
            backgroundColor: '#007bff',
            borderRadius: '20px',
            position: 'absolute',
            top: 130,
            left: '50%',
            transform: 'translateX(-50%)',
            border: '3px solid #333',
            background: 'linear-gradient(145deg, #007bff, #0056b3)',
            boxShadow: 'inset 0 2px 10px rgba(255, 255, 255, 0.2)'
          }}
        />

        <Box
          ref={armLeftRef}
          sx={{
            width: 25,
            height: 70,
            backgroundColor: '#fdbcb4',
            borderRadius: '15px',
            position: 'absolute',
            top: 140,
            left: 20,
            border: '2px solid #333',
            transformOrigin: 'top center',
            background: 'linear-gradient(145deg, #fdbcb4, #f5a394)'
          }}
        />

        <Box
          ref={armRightRef}
          sx={{
            width: 25,
            height: 70,
            backgroundColor: '#fdbcb4',
            borderRadius: '15px',
            position: 'absolute',
            top: 140,
            right: 20,
            border: '2px solid #333',
            transformOrigin: 'top center',
            background: 'linear-gradient(145deg, #fdbcb4, #f5a394)'
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 220,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px'
          }}
        >
          <Box
            sx={{
              width: 25,
              height: 60,
              backgroundColor: '#6c757d',
              borderRadius: '15px',
              border: '2px solid #333',
              background: 'linear-gradient(145deg, #6c757d, #495057)'
            }}
          />
          <Box
            sx={{
              width: 25,
              height: 60,
              backgroundColor: '#6c757d',
              borderRadius: '15px',
              border: '2px solid #333',
              background: 'linear-gradient(145deg, #6c757d, #495057)'
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AnimatedCharacter;
