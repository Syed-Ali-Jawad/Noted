import {
  useBlockNoteEditor,
  useSelectedBlocks,
} from "@blocknote/react";
import {
  AlignLeft
} from "lucide-react";
import { BlockNoteStyleSelect } from "./Toolbar/BlockNoteSelect";
import { CUSTOM_BLOCK_TYPE_OPTIONS } from "@/shared/constants/text-editor.constant";
import type { MenuOption } from "@/types/text-editor.type";

const CustomBlockTypeSelect = () => {
  const editor = useBlockNoteEditor();
  const selectedBlocks = useSelectedBlocks();

  const selectedBlock = selectedBlocks[0];

  const currentLevel =
    selectedBlock?.type === "heading"
      ? selectedBlock.props.level
      : undefined;



  const selectedOption =
    currentLevel
      ? CUSTOM_BLOCK_TYPE_OPTIONS.find(
        (option) => option.value === `heading-${currentLevel}`,
      )
      : CUSTOM_BLOCK_TYPE_OPTIONS.find((option) => {
        if (selectedBlock?.type === "bulletListItem") {
          return option.value === "bullet-list";
        }

        if (selectedBlock?.type === "numberedListItem") {
          return option.value === "numbered-list";
        }

        if (selectedBlock?.type === "quote") {
          return option.value === "quote";
        }

        return option.value === "paragraph";
      });

  const selectedLabel = selectedOption?.label ?? "Paragraph";
  const SelectedIcon = selectedOption?.icon ?? AlignLeft;

  const handleSelect = (value: string) => {
    const block = editor.getTextCursorPosition().block;

    switch (value) {
      case "paragraph":
        editor.updateBlock(block, {
          type: "paragraph",
        });
        break;

      case "heading-1":
      case "heading-2":
      case "heading-3":
        editor.updateBlock(block, {
          type: "heading",
          props: {
            level: Number(value.split("-")[1]) as 1 | 2 | 3,
          },
        });
        break;

      case "bullet-list":
        editor.updateBlock(block, {
          type: "bulletListItem",
        });
        break;

      case "numbered-list":
        editor.updateBlock(block, {
          type: "numberedListItem",
        });
        break;

      case "quote":
        editor.updateBlock(block, {
          type: "quote",
        });
        break;
    }
  };

  return (
    <BlockNoteStyleSelect
      triggerElement={
        <div className="flex items-center gap-x-2">
          <SelectedIcon size={16} />
          <span className="text-xs">{selectedLabel}</span>
        </div>
      }
      options={CUSTOM_BLOCK_TYPE_OPTIONS}
      renderMenuItem={(item) => <MenuItem item={item as MenuOption} onSelect={handleSelect} />}
      menuClasses="min-w-36 ml-3 sm:ml-0"
    />
  );
};

export default CustomBlockTypeSelect;

const MenuItem = ({ item, onSelect }: { item: MenuOption, onSelect: (value: string) => void }) => {
  const option = CUSTOM_BLOCK_TYPE_OPTIONS.find(
    (option) => option.value === item.value,
  );

  if (!option) return <></>;

  const Icon = option.icon;

  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center gap-x-2 rounded-sm px-2 py-1.5 text-left text-xs text-(--bn-colors-menu-text) hover:bg-(--bn-colors-hovered-background)"
      onClick={() => onSelect(item.value)}
    >
      <Icon size={16} />
      {option.label}
    </button>
  );
}