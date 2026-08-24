import {
  BasicTextStyleButton,
  CreateLinkButton,
  FormattingToolbar,
} from "@blocknote/react";
import { Check, Loader2 } from "lucide-react";
import {
  useEffect,
  useState,
} from "react";
import { NoteType } from "@/types/enums";
import { cn } from "@/lib/utils";
import { useFormContext, useWatch } from "react-hook-form";
import type { NoteColor } from "@/types/notes.type";
import CustomBlockTypeSelect from "../CustomBlockTypeSelect";
import ColorSelect from "./ColorSelect";

const CustomToolbar = ({
  isSaving,
  showSaving,
}: {
  isSaving: boolean;
  showSaving: boolean;
}) => {
  const { setValue } = useFormContext();
  const [keyboardOffset, setKeyboardOffset] = useState(0);

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

  useEffect(() => {
    const viewport = window.visualViewport;

    if (!viewport) return;

    const updateKeyboardOffset = () => {
      const offset = Math.max(
        0,
        window.innerHeight - viewport.height - viewport.offsetTop,
      );

      setKeyboardOffset(offset);
    };

    updateKeyboardOffset();

    viewport.addEventListener("resize", updateKeyboardOffset);
    viewport.addEventListener("scroll", updateKeyboardOffset);

    return () => {
      viewport.removeEventListener("resize", updateKeyboardOffset);
      viewport.removeEventListener("scroll", updateKeyboardOffset);
    };
  }, []);

  return (
    <div className="fixed sm:absolute  bg-white sm:bg-[unset]  max-w-screen sm:max-w-[unset] bottom-0 sm:bottom-3 sm:left-1/2 sm:-translate-x-1/2 w-full sm:w-[95%] h-9" style={window.innerWidth > 640 ? {} : {
      bottom: keyboardOffset,
    }}>
      <FormattingToolbar>
        <div className="flex w-full pr-3 items-center justify-between">
          <div className="flex gap-x-1 items-center">
            {/* <NoteTypeSelect value={noteType} onChange={handleTypeChange} /> */}
            {/* <div className="border-l-2 border-l-slate-300  h-4 mx-2" /> */}
            {noteType === NoteType.RICHTEXT && <CustomBlockTypeSelect />}
            <BasicTextStyleButton basicTextStyle="bold" />
            <BasicTextStyleButton basicTextStyle="italic" />
            <BasicTextStyleButton basicTextStyle="strike" />
            <CreateLinkButton />
            {/* <ImageInput /> */}
            <div className="border-l-2 border-l-slate-300  h-4 ml-1" />
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

// const ImageInput = () => {
//   const { setValue } = useFormContext();

//   const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     const url = URL.createObjectURL(file);

//     setValue("image", url, {
//       shouldDirty: true,
//     });
//   };

//   return (
//     <div className="w-7.5 h-7.5 flex items-center justify-center">
//       <input
//         type="file"
//         className="hidden"
//         id="image"
//         accept="image/*"
//         onChange={handleImageSelect}
//       />
//       <label htmlFor="image" className="cursor-pointer">
//         <Image className="text-(--bn-colors-menu-text)" size={17} />
//       </label>
//     </div>
//   );
// };

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




