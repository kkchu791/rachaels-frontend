import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BeliefCard = ({ belief, isActive }) => {
  const currentState = isActive ? belief.courageState : belief.fearState;
  const mediaUrl = currentState.media[0];
  const isVideo = mediaUrl.endsWith('.mp4') || mediaUrl.includes('video');
  const [flash, setFlash] = useState(false);

  // Track deep values so effect fires when media URLs actually change
  const fearVideoUrl = belief.fearState?.media?.[0];
  const courageVideoUrl = belief.courageState?.media?.[0];

  useEffect(() => {
    // Reset first so AnimatePresence re-mounts the flash element
    setFlash(false);
    const resetTimer = setTimeout(() => setFlash(true), 50);
    const clearTimer = setTimeout(() => setFlash(false), 2000);
    return () => {
      clearTimeout(resetTimer);
      clearTimeout(clearTimer);
    };
  }, [fearVideoUrl, courageVideoUrl]);

  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent z-10" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentState.tag}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          {isVideo ? (
            <video
              src={mediaUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={mediaUrl}
              alt={currentState.tag}
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute bottom-12 left-0 right-0 text-center z-30 px-6">
            <motion.h2
              className="text-5xl font-bold mb-3"
              style={{
                color: isActive ? 'var(--color-blade-runner-neon)' : 'var(--color-blade-runner-orange)',
                textShadow: `0 0 20px ${isActive ? 'var(--color-blade-runner-neon)' : 'var(--color-blade-runner-orange)'}`,
              }}
            />
            <motion.p
              className="text-xl uppercase tracking-widest"
              style={{
                color: isActive ? 'var(--color-blade-runner-neon)' : 'var(--color-blade-runner-orange)'
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Scanline overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,249,0.03) 2px, rgba(0,255,249,0.03) 4px)',
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Steady border glow */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none z-50"
        style={{
          boxShadow: isActive
            ? '0 0 30px var(--color-blade-runner-neon), inset 0 0 30px rgba(0,255,249,0.1)'
            : '0 0 30px var(--color-blade-runner-orange), inset 0 0 30px rgba(255,107,53,0.1)'
        }}
      />

      {/* New memory flash — bright white bloom that fades out */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key="flash"
            className="absolute inset-0 rounded-lg pointer-events-none z-[60]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            style={{
              boxShadow: '0 0 80px 30px rgba(255,255,255,0.9), inset 0 0 60px rgba(255,255,255,0.5)',
              background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BeliefCard;