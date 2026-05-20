import {
  DEFAULT_WHEEL_DESIGN_ID,
  isWheelDesignId,
  type WheelDesignId,
} from "@/data/wheelThemes";

export const WHEEL_DESIGN_STORAGE_KEY = "deserto_wheel_design_v1";

export function loadWheelDesignId(): WheelDesignId {
  if (typeof window === "undefined") return DEFAULT_WHEEL_DESIGN_ID;
  try {
    const raw = window.localStorage.getItem(WHEEL_DESIGN_STORAGE_KEY);
    if (!raw || !isWheelDesignId(raw)) return DEFAULT_WHEEL_DESIGN_ID;
    return raw;
  } catch {
    return DEFAULT_WHEEL_DESIGN_ID;
  }
}

export function saveWheelDesignId(id: WheelDesignId): void {
  window.localStorage.setItem(WHEEL_DESIGN_STORAGE_KEY, id);
}
