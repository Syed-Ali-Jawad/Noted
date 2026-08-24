import { cn } from "@/lib/utils";
import type { BlockSelectOption } from "@/types/text-editor.type";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { JSX } from "react/jsx-runtime";

interface BlockNoteStyleSelectProps {
    triggerElement: JSX.Element;
    showChevron?: boolean;
    renderMenuItem: (val: BlockSelectOption) => JSX.Element;
    options: BlockSelectOption[];
    menuClasses?: string;
}

export const BlockNoteStyleSelect = ({
    triggerElement,
    showChevron = true,
    renderMenuItem,
    options,
    menuClasses,
}: BlockNoteStyleSelectProps) => {
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
    const selectMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                selectMenuRef.current &&
                !selectMenuRef.current.contains(e.target as Node)
            ) {
                setIsSelectOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={selectMenuRef}>
            <button
                type="button"
                onClick={() => setIsSelectOpen((prev) => !prev)}
                className="
          flex justify-between h-7.5 items-center gap-1
          rounded-sm
          border-0
          bg-transparent
          px-2
          text-sm
          text-(--bn-colors-menu-text)
          outline-none
          transition-colors               
          hover:bg-(--bn-colors-hovered-background)
          cursor-pointer
        "
            >
                {triggerElement}
                {showChevron && <ChevronDown size={10} className="ml-3 stroke-3" />}
            </button>

            {isSelectOpen && (
                <div
                    className={cn(
                        "absolute bottom-full left-1/2 z-50 mb-2 min-w-32 -translate-x-1/2 overflow-hidden rounded-md border border-[#eee5e1] bg-white p-1 px-0.5 shadow-[0_10px_10px_rgba(0,0,0,0.10)]",
                        menuClasses,
                    )}
                >
                    {options.map((item) => (
                        <div onClick={() => setIsSelectOpen(false)} id={item.value}>
                            {renderMenuItem(item)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};