import type { NoteColor } from "@/types/notes.type";
import { BlockNoteStyleSelect } from "./BlockNoteSelect";
import { cn } from "@/lib/utils";
import { NOTES_COLOR_CLASS_MAP } from "@/shared/constants/constants";
import { COLOR_SELECT_OPTIONS } from "@/shared/constants/text-editor.constant";
import ColorPallete from "./ColorPallete";
import type { ColorSelectOption } from "@/types/text-editor.type";

interface ColorSelectProps {
    selectedColor: string;
    handleSelect: (color: NoteColor) => void;
    className?: string;
}

const ColorSelect = ({
    selectedColor,
    handleSelect,
    className,
}: ColorSelectProps) => {
    return (
        <div className={className}>
            <BlockNoteStyleSelect
                triggerElement={
                    <ColorPallete
                        className={cn(
                            NOTES_COLOR_CLASS_MAP[selectedColor],
                            "border border-slate-300",
                        )}
                    />
                }
                menuClasses="min-w-[unset] bg-gray-200 p-2 flex flex-col gap-2"
                options={COLOR_SELECT_OPTIONS}
                renderMenuItem={(item: ColorSelectOption) => (
                    <ColorPallete
                        className={item.color}
                        onClick={() => handleSelect(item.value as NoteColor)}
                        title={item.value}
                    />
                )}
                showChevron={false}
            />
        </div>
    );
};


export default ColorSelect;