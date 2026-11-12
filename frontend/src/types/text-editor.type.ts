import type { LucideIcon } from "lucide-react";

type MenuOption = { value: string; label: string; icon: LucideIcon };

type ColorSelectOption = {
  value: string;
  color: string;
};

type BlockSelectOption = MenuOption | ColorSelectOption;

export type { MenuOption, ColorSelectOption, BlockSelectOption };
