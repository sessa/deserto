"use client";

import { eyebrowClass } from "@/components/candy/styles";
import { WHEEL_DESIGNS, type WheelDesignId } from "@/data/wheelThemes";

type WheelDesignSelectProps = {
  value: WheelDesignId;
  onChange: (id: WheelDesignId) => void;
  disabled?: boolean;
};

export function WheelDesignSelect({ value, onChange, disabled }: WheelDesignSelectProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor="wheel-design" className={eyebrowClass}>
        Wheel style
      </label>
      <select
        id="wheel-design"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as WheelDesignId)}
        className="h-11 w-full cursor-pointer rounded-2xl border border-purple-950/10 bg-white/90 px-4 text-sm font-bold text-purple-950 shadow-sm ring-1 ring-purple-950/5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {WHEEL_DESIGNS.map((design) => (
          <option key={design.id} value={design.id}>
            {design.name}
          </option>
        ))}
      </select>
    </div>
  );
}
