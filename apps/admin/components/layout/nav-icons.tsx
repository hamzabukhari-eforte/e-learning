import type { IconType } from "react-icons";
import { LuLayoutDashboard, LuGlobe, LuUsers } from "react-icons/lu";
import type { NavIconKey } from "@/data/navigation";

export const NAV_ICONS: Record<NavIconKey, IconType> = {
  dashboard: LuLayoutDashboard,
  domain: LuGlobe,
  users: LuUsers,
};
