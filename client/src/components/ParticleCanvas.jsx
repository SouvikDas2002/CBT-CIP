import React, { useEffect, useRef } from 'react';

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const colors = ['red', '#f57900', 'yellow', '#ce5c00', '#5c3566'];
  const rate = 100;
  const arc = 100;
  const size = 5;
  const speed = 1;
  let time = 0;
  let count = 0;
  let parts = [];
  const mouse = { x: 0, y: 0 };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w;
    canvas.height =h;

    function createParticles() {
      time = 0;
      count = 0;

      for (let i = 0; i < arc; i++) {
        parts[i] = {
          x: Math.ceil(Math.random() * w),
          y: Math.ceil(Math.random() * h),
          toX: Math.random() * 3 - 1,
          toY: Math.random() * 2 - 1,
          c: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * size,
        };
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < arc; i++) {
        const li = parts[i];
        let distanceFactor = distanceBetween(mouse, parts[i]);
        distanceFactor = Math.max(Math.min(15 - distanceFactor / 10, 10), 1);
        ctx.beginPath();
        ctx.arc(li.x, li.y, li.size * distanceFactor, 0, Math.PI * 2, false);
        ctx.fillStyle = li.c;
        ctx.strokeStyle = li.c;
        if (i % 2 === 0) {
          ctx.stroke();
        } else {
          ctx.fill();
        }

        li.x = li.x + li.toX * (time * 0.05);
        li.y = li.y + li.toY * (time * 0.05);

        if (li.x > w) {
          li.x = 0;
        }
        if (li.y > h) {
          li.y = 0;
        }
        if (li.x < 0) {
          li.x = w;
        }
        if (li.y < 0) {
          li.y = h;
        }
      }
      if (time < speed) {
        time++;
      }
      setTimeout(drawParticles, 1000 / rate);
    }

    function handleMouseMove(e) {
      mouse.x = e.layerX;
      mouse.y = e.layerY;
    }

    function distanceBetween(p1, p2) {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    createParticles();
    drawParticles();
    canvas.addEventListener('mousemove', handleMouseMove);

    // Cleanup on unmount
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 0,
      }}
    />
  );
}

export default ParticleCanvas;
