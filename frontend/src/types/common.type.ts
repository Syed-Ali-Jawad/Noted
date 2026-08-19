import type { LucideIcon } from "lucide-react";

export type SideBarOption = {
  title: string;
  icon: LucideIcon;
  routeTo: string;
  selectedClasses?: string;
};
