import { motion } from 'framer-motion';

const ToggleSwitch = ({ label, isActive, onToggle }) => {
  const color = isActive
    ? 'var(--color-blade-runner-orange)'
    : 'var(--color-blade-runner-neon)';

  return (
    <div className="flex items-center gap-4 p-4 bg-black/50 backdrop-blur-sm rounded-lg border border-blade-runner-neon/30">
      <span 
        className="text-lg uppercase tracking-wider font-bold"
        style={{ color }}
      >
        {label}
      </span>
      
      <button
        onClick={onToggle}
        className="relative w-20 h-10 rounded-full transition-colors duration-300"
        style={{ backgroundColor: color }}
      >
        <motion.div
          className="absolute top-1 w-8 h-8 bg-black rounded-full shadow-lg"
          animate={{ left: isActive ? '44px' : '4px' }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      
      <span className="text-sm text-gray-400">
        {isActive ? 'ON' : 'OFF'}
      </span>
    </div>
  );
};

export default ToggleSwitch;