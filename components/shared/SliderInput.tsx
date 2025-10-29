import React from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}

const SliderInput: React.FC<SliderInputProps> = ({ label, value, onChange, min = 0, max = 100 }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={label} className="text-lg font-medium text-slate-200 capitalize">{label.replace(/([A-Z])/g, ' $1')}</label>
        <span className="text-xl font-bold text-white bg-slate-900/50 px-3 py-1 rounded-md">{value}%</span>
      </div>
      <div className="relative h-2.5 w-full bg-slate-700 rounded-full group">
        <div 
            className="absolute top-0 left-0 h-2.5 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-full"
            style={{ width: `${percentage}%` }}
        ></div>
        <input
            id={label}
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            className="w-full h-full bg-transparent appearance-none cursor-pointer slider-thumb"
            style={{'--thumb-color': '#06b6d4'} as React.CSSProperties}
        />
        <style>{`
          .slider-thumb::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 24px;
            height: 24px;
            background: var(--thumb-color);
            border-radius: 50%;
            border: 4px solid #0f172a;
            cursor: pointer;
            margin-top: -8px;
            transition: all 0.2s;
          }
          .slider-thumb:hover::-webkit-slider-thumb {
              background: #22d3ee;
              box-shadow: 0 0 0 4px #0f172a, 0 0 0 7px #22d3ee;
          }
          .slider-thumb::-moz-range-thumb {
            width: 24px;
            height: 24px;
            background: var(--thumb-color);
            border-radius: 50%;
            border: 4px solid #0f172a;
            cursor: pointer;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SliderInput;