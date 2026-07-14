interface TextureSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  displayValue: string;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function TextureSlider({
  label,
  value,
  min,
  max,
  step = 0.01,
  displayValue,
  onChange,
  disabled,
}: TextureSliderProps) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-atelier-ivoryMuted">{label}</span>
        <span className="font-mono text-[11px] text-atelier-brassLight">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="atelier-slider w-full disabled:opacity-30"
      />
    </label>
  );
}
