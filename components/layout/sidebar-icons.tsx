import type { IconType } from "react-icons";
import {
  LuBell,
  LuBookOpen,
  LuCircleUser,
  LuClipboardList,
  LuFileQuestion,
  LuFileText,
  LuGauge,
  LuLayers3,
  LuMessageSquareQuote,
  LuMessagesSquare,
  LuPencilRuler,
  LuTrendingUp,
  LuUserPlus,
  LuUsers,
  LuClipboardCheck,
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
  exams: LuFileQuestion,
  results: LuClipboardCheck,
  feedback: LuMessageSquareQuote,
  improvement: LuTrendingUp,
  chat: LuMessagesSquare,
};
