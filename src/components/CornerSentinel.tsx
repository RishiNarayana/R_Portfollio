import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const CornerSentinel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Smooth springs for rotation and eye movement
  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const eyeX = useSpring(0, springConfig);
  const eyeY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const angle = Math.atan2(deltaY, deltaX);
        const dist = Math.min(Math.hypot(deltaX, deltaY) / 500, 1);

        // Calculate rotation for the "head"
        rotateY.set((deltaX / window.innerWidth) * 30);
        rotateX.set(-(deltaY / window.innerHeight) * 30);

        // Calculate eye position (pupil)
        eyeX.set(Math.cos(angle) * 8 * dist);
        eyeY.set(Math.sin(angle) * 8 * dist);
      }
    };

    // Random blinking
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 3000);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, [rotateX, rotateY, eyeX, eyeY]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-8 right-8 z-[12000] perspective-[1000px] hidden lg:block"
    >
      <div className="relative group">
        {/* Glow behind the sentinel */}
        <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full scale-150 animate-pulse pointer-events-none" />

        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-24 h-24 glass rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden"
        >
          {/* Main Face / Screen */}
          <div className="absolute inset-2 bg-slate-900/90 rounded-2xl border border-white/10 overflow-hidden">
            {/* Scanned line effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(139,92,246,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_4s_linear_infinite]" />
            
            {/* The Eye */}
            <motion.div
              style={{ x: eyeX, y: eyeY }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                {/* Pupil / Iris */}
                <motion.div
                  animate={{
                    height: isBlinking ? 2 : 28,
                    scale: isBlinking ? 1.2 : 1,
                  }}
                  className="w-28 h-28 rounded-full border-[1.5px] border-primary/30 flex items-center justify-center"
                >
                  <div className="w-14 h-14 rounded-full border border-primary/40 flex items-center justify-center">
                     <div className="w-6 h-6 rounded-full bg-primary shadow-[0_0_15px_rgba(139,92,246,0.8)] relative overflow-hidden">
                        {/* Shimmer on the eye */}
                        <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/40 blur-[0.5px]" />
                     </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Exterior Detail - Antenna-like element */}
          <div className="absolute -top-1 right-4 w-1 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
        </motion.div>
        
        {/* Label (Optional, for flavor) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-[10px] text-primary font-mono uppercase tracking-widest whitespace-nowrap pointer-events-none"
        >
          Sentinel v1.0 [Online]
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CornerSentinel;
