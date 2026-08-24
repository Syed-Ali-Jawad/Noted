import type { LucideIcon } from "lucide-react";

export type MenuOption = { value: string, label: string, icon: LucideIcon }

export type ColorSelectOption = {
    value: string,
    color: string,
}

export type BlockSelectOption = MenuOption | ColorSelectOption;