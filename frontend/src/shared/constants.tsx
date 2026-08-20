import type { SideBarOption } from "@/types/common.type";
import { FileText, PanelTopOpen, Trash } from "lucide-react";

export const PAGE_ROUTES: Record<string, string> = {
  login: "/login",
  register: "/register",
  notes: "/",
  archive: "/archive",
  trash: "/trash",
};

export const EMAIL_PATTERN: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_PATTERN: RegExp = /^.{8,}$/;


export const NOTES_COLOR_CLASS_MAP: Record<string, string> = {
  BLUE: "bg-[#DDEBFF]",
  YELLOW: "bg-[#FFF4CC]",
  GREEN: "bg-[#DFF7E5]",
  WHITE: "bg-[#FFFFFF]",
  PURPLE: "bg-[#EEDCFF]",
};

export const NOTES_TRASH_COLOR_CLASS_MAP = {
  BLUE: "bg-[#DDEBFF]/60",
  GREEN: "bg-[#DFF7E5]/60",
  YELLOW: "bg-[#FFF4CC]/60",
  WHITE: "bg-[#FFFFFF]/60",
  PURPLE: "bg-[#EEDCFF]/60",
};

export const NOTES_ACTION_COLOR_CLASS_MAP: Record<string, string> = {
  BLUE: "bg-[#B8D3F7]",
  YELLOW: "bg-[#F5E29A]",
  GREEN: "bg-[#B9E8C5]",
  WHITE: "bg-[#E8E8E8]",
  PURPLE: "bg-[#D2B5ED]",
};

export const SIDEBAR_OPTIONS: SideBarOption[] = [
  {
    title: "Notes",
    icon: FileText,
    routeTo: PAGE_ROUTES.notes,
    selectedClasses: "[&_path]:stroke-[#ffe5dc]",
  },
  {
    title: "Archive",
    icon: PanelTopOpen,
    routeTo: PAGE_ROUTES.archive,
    selectedClasses: "[&_path]:stroke-[#ffe5dc]",
  },
  { title: "Trash", icon: Trash, routeTo: PAGE_ROUTES.trash },
];

export const MASONARY_BREAKPOINT_COLUMNS = {
  default: 4,
  1280: 3,
  600: 2,
};
