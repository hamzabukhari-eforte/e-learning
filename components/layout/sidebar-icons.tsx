import type { IconType } from "react-icons";
import {
  FaBell,
  FaBookOpen,
  FaClipboardList,
  FaFileLines,
  FaGaugeHigh,
  FaLayerGroup,
  FaRulerCombined,
  FaUser,
  FaUserGroup,
  FaUsers,
} from "react-icons/fa6";
import type { NavIconKey } from "@/data/navigation";

export const NAV_ICONS: Record<NavIconKey, IconType> = {
  dashboard: FaGaugeHigh,
  setup: FaLayerGroup,
  survey: FaClipboardList,
  registration: FaUsers,
  assign: FaUserGroup,
  management: FaRulerCombined,
  reports: FaFileLines,
  notifications: FaBell,
  training: FaBookOpen,
  profile: FaUser,
};
