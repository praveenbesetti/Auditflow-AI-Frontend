import React from 'react';
import { motion } from 'framer-motion';

export function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  label,
  id
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        id={id}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27] ${
          checked ? 'bg-blue-600' : 'bg-slate-700'
        } ${disabled ? 'pointer-events-none' : ''}`}
      >
        <span className="sr-only">{label || 'Toggle setting'}</span>
        <motion.span
          layout
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }}
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>

      {label && (
        <span
          className="text-sm font-medium text-slate-300"
          onClick={() => !disabled && onChange(!checked)}
        >
          {label}
        </span>
      )}
    </div>
  );
}
