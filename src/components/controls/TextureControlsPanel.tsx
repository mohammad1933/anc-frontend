import { useConfigurator } from "@/hooks/ConfiguratorContext";
import { TextureSlider } from "@/components/controls/TextureSlider";
import { RepeatLockToggle } from "@/components/controls/RepeatLockToggle";
import {
  TEXTURE_OFFSET_MAX,
  TEXTURE_OFFSET_MIN,
  TEXTURE_ROTATION_MAX,
  TEXTURE_ROTATION_MIN,
  TEXTURE_SCALE_MAX,
  TEXTURE_SCALE_MIN,
} from "@/constants/config";
import { formatDegrees } from "@/utils/format";

export function TextureControlsPanel() {
  const { transform, updateTransform, activeFabric } = useConfigurator();
  const disabled = !activeFabric;

  return (
    <div className="space-y-4">
      <p className="font-mono text-[10px] uppercase tracking-widest2 text-atelier-brass">Texture Controls</p>

      <div className="grid grid-cols-2 gap-3">
        <TextureSlider
          label="Scale X"
          min={TEXTURE_SCALE_MIN}
          max={TEXTURE_SCALE_MAX}
          step={0.1}
          value={transform.scaleX}
          displayValue={transform.scaleX.toFixed(1)}
          onChange={(v) => updateTransform({ scaleX: v })}
          disabled={disabled}
        />
        <TextureSlider
          label="Scale Y"
          min={TEXTURE_SCALE_MIN}
          max={TEXTURE_SCALE_MAX}
          step={0.1}
          value={transform.scaleY}
          displayValue={transform.scaleY.toFixed(1)}
          onChange={(v) => updateTransform({ scaleY: v })}
          disabled={disabled || transform.repeatLocked}
        />
      </div>

      <RepeatLockToggle />

      <TextureSlider
        label="Rotation"
        min={TEXTURE_ROTATION_MIN}
        max={TEXTURE_ROTATION_MAX}
        step={1}
        value={transform.rotation}
        displayValue={formatDegrees(transform.rotation)}
        onChange={(v) => updateTransform({ rotation: v })}
        disabled={disabled}
      />

      <div className="grid grid-cols-2 gap-3">
        <TextureSlider
          label="Offset X"
          min={TEXTURE_OFFSET_MIN}
          max={TEXTURE_OFFSET_MAX}
          step={0.01}
          value={transform.offsetX}
          displayValue={transform.offsetX.toFixed(2)}
          onChange={(v) => updateTransform({ offsetX: v })}
          disabled={disabled}
        />
        <TextureSlider
          label="Offset Y"
          min={TEXTURE_OFFSET_MIN}
          max={TEXTURE_OFFSET_MAX}
          step={0.01}
          value={transform.offsetY}
          displayValue={transform.offsetY.toFixed(2)}
          onChange={(v) => updateTransform({ offsetY: v })}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
