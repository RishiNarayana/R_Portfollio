import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const FloatingFigure = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const robotRef = useRef<HTMLDivElement>(null);

  // Position logic with smooth springs
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Velocity for tilt effect
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  // Spring configurations for the robot body
  const springConfig = { damping: 30, stiffness: 200, mass: 1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Hands/Thrusters (lagging more)
  const handX = useSpring(mouseX, { damping: 40, stiffness: 120, mass: 1.2 });
  const handY = useSpring(mouseY, { damping: 40, stiffness: 120, mass: 1.2 });

  // Eye tracking logic
  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);

  useEffect(() => {
    const minMatchMedia = window.matchMedia("(min-width: 768px)");
    if (!minMatchMedia.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset position so robot floats near cursor but not on top
      const targetX = e.clientX + 45;
      const targetY = e.clientY - 45;
      
      mouseX.set(targetX);
      mouseY.set(targetY);
      
      // Calculate velocity for tilt
      const vx = targetX - lastPos.current.x;
      const vy = targetY - lastPos.current.y;
      setVelocity({ x: vx, y: vy });
      lastPos.current = { x: targetX, y: targetY };

      if (!isVisible) setIsVisible(true);

      // Eye tracking: calculate angle to cursor from robot center
      if (robotRef.current) {
        const rect = robotRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxEyeMove = 6;
        
        eyeX.set((dx / Math.max(dist, 1)) * maxEyeMove);
        eyeY.set((dy / Math.max(dist, 1)) * maxEyeMove);
      }

      // Check for interactive hover
      const target = e.target as HTMLElement;
      const hovered = 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null;
      setIsHovering(hovered);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible, mouseX, mouseY, eyeX, eyeY]);

  // Derived animations
  const rotateZ = useSpring(0, { damping: 20, stiffness: 100 });
  useEffect(() => {
    rotateZ.set(Math.min(Math.max(velocity.x * 2, -25), 25));
  }, [velocity.x, rotateZ]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[11000] overflow-hidden">
      {/* Robot Body */}
      <motion.div
        ref={robotRef}
        style={{ x: springX, y: springY, rotate: rotateZ }}
        className="absolute top-0 left-0"
      >
        <motion.div
           animate={{ y: [0, -10, 0] }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
           className="relative"
        >
          {/* Main Capsule Head/Body */}
          <div className="relative w-14 h-18 bg-white rounded-[2rem] border border-slate-200 shadow-xl flex flex-col items-center pt-4 overflow-hidden">
             {/* The "Visor" */}
             <div className="w-10 h-6 bg-slate-900 rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Visual scan line */}
                <div className="absolute inset-0 bg-primary/10 animate-pulse pointer-events-none" />
                
                {/* The Eyes */}
                <div className="flex gap-2">
                   <motion.div 
                     style={{ x: eyeX, y: eyeY }}
                     className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,1)]" 
                   />
                   <motion.div 
                     style={{ x: eyeX, y: eyeY }}
                     className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,1)]" 
                   />
                </div>
             </div>
             
             {/* Simple Chest Detail */}
             <div className="mt-4 w-6 h-0.5 bg-slate-100 rounded-full" />
             <motion.div 
                animate={{ opacity: isHovering ? 1 : 0.3 }}
                className="mt-1 w-2 h-2 rounded-full bg-primary" 
             />
             
             {/* Bottom Reflection */}
             <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-slate-50 to-transparent" />
          </div>

          {/* Core Glow underneath */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary/20 blur-xl animate-pulse" />
        </motion.div>
      </motion.div>

    </div>
  );
};

export default FloatingFigure;
