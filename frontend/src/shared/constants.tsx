import type { SideBarOption } from "@/types/common.type";
import { NoteType } from "@/types/enums";
import type { Note } from "@/types/notes.type";
import { FileText, PanelTopOpen, Trash } from "lucide-react";

export const PAGE_ROUTES: Record<string, string> = {
  login: "/login",
  register: "/register",
  notes: "/",
  archive: "/archive",
  trash: "/trash",
};

export const EMAIL_PATTERN: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MOCK_NOTES: Note[] = [
  {
    id: "n8k3m2",
    type: NoteType.TEXT,
    title: "Weekend Plans",
    content:
      "Visit the park in the morning.\n\nPick up groceries on the way back.\n\nWatch a movie in the evening.",
    image: null,
    color: "blue",
    createdAt: "2026-07-20T10:00:00Z",
    archivedAt: null,
    isArchived: false,
    isPinned: true,
  },
  {
    id: "p4x7q1",
    type: NoteType.LIST,
    title: "Grocery List",
    content: "- [ ] Milk\n- [ ] Eggs\n- [ ] Bread\n- [ ] Chicken\n- [x] Tea",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    color: "yellow",
    createdAt: "2026-07-20T10:00:00Z",
    archivedAt: null,
    isArchived: false,
    isPinned: false,
  },
  {
    id: "r6v9t3",
    type: NoteType.RICH_TEXT,
    title: "React Interview Prep",
    content:
      "# React Interview Prep\n\n## Core Topics\n\n- Components and props\n- State and lifecycle\n- Hooks\n- Context API\n- Performance optimization\n\n### Important\n\nRemember to explain **why** a particular approach is used, not just how it works.",
    image: null,
    color: "purple",
    createdAt: "2026-07-20T10:00:00Z",
    archivedAt: null,
    isArchived: false,
    isPinned: true,
  },
  {
    id: "m2c8w5",
    type: NoteType.TEXT,
    title: "Things to Buy",
    content: "Keyboard\n\nUSB-C cable\n\nNotebook\n\nDesk lamp",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    color: "green",
    createdAt: "2026-07-20T10:00:00Z",
    archivedAt: null,
    isArchived: false,
    isPinned: false,
  },
  {
    id: "z5h1k7",
    type: NoteType.RICH_TEXT,
    title: "Project Ideas",
    content:
      "## Ideas\n\n### 1. Budget Tracker\n\nA simple personal finance dashboard with income, expenses, categories, and monthly charts.\n\n### 2. Habit Tracker\n\nTrack daily habits and visualize progress over time.\n\n### 3. Bookmark Manager\n\nSave, organize, search, and tag useful links.",
    image: null,
    color: "white",
    createdAt: "2026-07-20T10:00:00Z",
    archivedAt: "2026-07-25T10:00:00Z",
    isArchived: true,
    isPinned: false,
  },
  {
    id: "q7d4s9",
    type: NoteType.LIST,
    title: "Project Launch",
    content:
      "- [x] Finish UI\n- [x] Connect API\n- [ ] Add validation\n- [ ] Test mobile layout\n- [ ] Deploy production build",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    color: "blue",
    createdAt: "2026-07-20T10:00:00Z",
    archivedAt: null,
    isArchived: false,
    isPinned: false,
  },
  {
    id: "b3n6j8",
    type: NoteType.TEXT,
    title: "Quick Reminder",
    content:
      "Review the pull request before the end of the day.\n\nDon't forget to update the documentation.",
    image: null,
    color: "yellow",
    createdAt: "2026-07-20T10:00:00Z",
    archivedAt: null,
    isArchived: false,
    isPinned: true,
  },
  {
    id: "u9f2e6",
    type: NoteType.RICH_TEXT,
    title: "Trip Planning",
    content:
      "## Things to Prepare\n\n- Book accommodation\n- Check the weather\n- Prepare documents\n- Charge power bank\n\n### Don't Forget\n\nBring a camera and comfortable shoes.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    color: "purple",
    createdAt: "2026-07-20T10:00:00Z",
    archivedAt: "2026-07-25T10:00:00Z",
    isArchived: true,
    isPinned: false,
  },
];

export const NOTES_COLOR_CLASS_MAP: Record<string, string> = {
  blue: "bg-[#DDEBFF]",
  yellow: "bg-[#FFF4CC]",
  green: "bg-[#DFF7E5]",
  white: "bg-[#FFFFFF]",
  purple: "bg-[#EEDCFF]",
};

export const NOTES_TRASH_COLOR_CLASS_MAP = {
  blue: "bg-[#DDEBFF]/60",
  green: "bg-[#DFF7E5]/60",
  yellow: "bg-[#FFF4CC]/60",
  white: "bg-[#FFFFFF]/60",
  purple: "bg-[#EEDCFF]/60",
};

export const NOTES_ACTION_COLOR_CLASS_MAP: Record<string, string> = {
  blue: "bg-[#B8D3F7]",
  yellow: "bg-[#F5E29A]",
  green: "bg-[#B9E8C5]",
  white: "bg-[#E8E8E8]",
  purple: "bg-[#D2B5ED]",
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
