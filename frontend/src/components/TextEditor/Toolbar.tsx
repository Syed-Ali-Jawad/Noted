import {
  BasicTextStyleButton,
  BlockTypeSelect,
  CreateLinkButton,
  FormattingToolbar,
} from "@blocknote/react";
import { Check, ChevronDown, Image, Loader2 } from "lucide-react";
import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type JSX,
} from "react";
import Icons from "@/shared/icons";
import {
  COLOR_SELECT_OPTIONS,
  NOTE_TYPE_OPTIONS,
} from "@/shared/text-editor.constant";
import { NoteType } from "@/types/enums";
import { cn } from "@/lib/utils";
import { NOTES_COLOR_CLASS_MAP } from "@/shared/constants";
import { useFormContext, useWatch } from "react-hook-form";
import type { NoteColor } from "@/types/notes.type";

const CustomToolbar = ({
  isSaving,
  showSaving,
}: {
  isSaving: boolean;
  showSaving: boolean;
}) => {
  const { setValue } = useFormContext();

  const color = useWatch({
    name: "color",
  });

  const handleColorPick = (color: NoteColor) =>
    setValue("color", color, { shouldDirty: true });

  const noteType = useWatch({
    name: "type",
  });

  // const handleTypeChange = (type: NoteType) => {
  //   setValue("type", type, {
  //     shouldDirty: true,
  //     shouldTouch: true,
  //   });
  // };

  return (
    <div className="sticky sm:absolute  bg-white sm:bg-[unset]  max-w-screen sm:max-w-[unset] bottom-0 sm:bottom-3 sm:left-1/2 sm:-translate-x-1/2 w-full sm:w-[95%] h-9">
      <FormattingToolbar>
        <div className="flex w-full pr-3 items-center justify-between">
          <div className="flex  items-center">
            {/* <NoteTypeSelect value={noteType} onChange={handleTypeChange} /> */}
            {/* <div className="border-l-2 border-l-slate-300  h-4 mx-2" /> */}
            {noteType === NoteType.RICHTEXT && <BlockTypeSelect />}
            <BasicTextStyleButton basicTextStyle="bold" />
            <BasicTextStyleButton basicTextStyle="italic" />
            <BasicTextStyleButton basicTextStyle="underline" />
            <BasicTextStyleButton basicTextStyle="strike" />
            <CreateLinkButton />
            <ImageInput />
            <div className="border-l-2 border-l-slate-300  h-4 mx-2" />
            <ColorSelect selectedColor={color} handleSelect={handleColorPick} />
          </div>
          <div
            className={cn(
              "text-(--bn-colors-menu-text) opacity-0 transition-opacity duration-300",
              showSaving && "opacity-100",
            )}
          >
            {isSaving ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Check size={20} />
            )}
          </div>
        </div>
      </FormattingToolbar>
    </div>
  );
};

export default CustomToolbar;

const ImageInput = () => {
  const { setValue } = useFormContext();

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setValue("image", url, {
      shouldDirty: true,
    });
  };

  return (
    <div className="w-7.5 h-7.5 flex items-center justify-center">
      <input
        type="file"
        className="hidden"
        id="image"
        accept="image/*"
        onChange={handleImageSelect}
      />
      <label htmlFor="image" className="cursor-pointer">
        <Image className="text-(--bn-colors-menu-text)" size={17} />
      </label>
    </div>
  );
};

// const NoteTypeSelect = ({
//   value,
//   onChange,
// }: {
//   value: NoteType;
//   onChange: (val: NoteType) => void;
// }) => {
//   const selectedOption = NOTE_TYPE_OPTIONS.find((opt) => opt.value === value);
//   console.log(selectedOption, value)
//   return (
//     <BlockNoteStyleSelect
//       triggerElement={
//         <div className="flex items-center gap-x-2 text-xs text-(--bn-colors-menu-text)">
//           {selectedOption &&
//             createElement(selectedOption.icon, {
//               className: "w-4 h-4",
//             })}
//           {selectedOption?.label}
//         </div>
//       }
//       options={NOTE_TYPE_OPTIONS}
//       renderMenuItem={(item) => (
//         <button
//           key={item.value}
//           type="button"
//           onClick={() => onChange(item.value as NoteType)}
//           className="
//                 flex w-full max-w-46.25 cursor-pointer
//                 items-center justify-between
//                 rounded-sm px-2 py-1.5
//                 text-left text-xs
//                 text-(--bn-colors-menu-text)
//                 hover:bg-(--bn-colors-hovered-background)
//               "
//         >
//           <div className="flex items-center gap-x-2">
//             {createElement(item.icon, {
//               className: "w-4 h-4",
//             })}
//             {item.label}
//           </div>

//           {value === item.value && <Icons.BlockNoteIcon />}
//         </button>
//       )}
//     />
//   );
// };

export const ColorSelect = ({
  selectedColor,
  handleSelect,
  className,
}: {
  selectedColor: string;
  handleSelect: (color: NoteColor) => void;
  className?: string;
}) => {
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
        renderMenuItem={(item) => (
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

const ColorPallete = ({
  className,
  onClick,
  ...props
}: {
  className: string;
  onClick?: () => void;
  title?: string;
}) => (
  <div
    className={cn(
      "w-5 h-5 cursor-pointer border-white border-2 rounded-full shadow-md",
      className,
    )}
    onClick={onClick}
    {...props}
  />
);

const BlockNoteStyleSelect = ({
  triggerElement,
  showChevron = true,
  renderMenuItem,
  options,
  menuClasses,
}: {
  triggerElement: JSX.Element;
  showChevron?: boolean;
  renderMenuItem: (val: Record<string, string>) => JSX.Element;
  options: Record<string, string>[];
  menuClasses?: string;
}) => {
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
