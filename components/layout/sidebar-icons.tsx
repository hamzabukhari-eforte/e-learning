import type { IconType } from "react-icons";
import {
  LuBell,
  LuBookOpen,
  LuCircleUser,
  LuClipboardList,
  LuFileText,
  LuGauge,
  LuLayers3,
  LuPencilRuler,
  LuUserPlus,
  LuUsers,
} from "react-icons/lu";
import type { NavIconKey } from "@/data/navigation";

export const NAV_ICONS: Record<NavIconKey, IconType> = {
  dashboard: LuGauge,
  setup: LuLayers3,
  survey: LuClipboardList,
  registration: LuUsers,
  assign: LuUserPlus,
  management: LuPencilRuler,
  reports: LuFileText,
  notifications: LuBell,
  training: LuBookOpen,
  profile: LuCircleUser,
};
