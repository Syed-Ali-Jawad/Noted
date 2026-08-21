import {
  useBlockNoteEditor,
  useSelectedBlocks,
} from "@blocknote/react";
import {
  AlignLeft,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
} from "lucide-react";
import { BlockNoteStyleSelect } from "./Toolbar";

const CustomBlockTypeSelect = () => {
  const editor = useBlockNoteEditor();
  const selectedBlocks = useSelectedBlocks();

  const selectedBlock = selectedBlocks[0];

  const currentLevel =
    selectedBlock?.type === "heading"
      ? selectedBlock.props.level
      : undefined;

  const options = [
    {
      value: "paragraph",
      label: "Paragraph",
      Icon: AlignLeft,
    },
    {
      value: "heading-1",
      label: "Heading 1",
      Icon: Heading1,
    },
    {
      value: "heading-2",
      label: "Heading 2",
      Icon: Heading2,
    },
    {
      value: "heading-3",
      label: "Heading 3",
      Icon: Heading3,
    },
    {
      value: "bullet-list",
      label: "Bullet List",
      Icon: List,
    },
    {
      value: "numbered-list",
      label: "Numbered List",
      Icon: ListOrdered,
    },
    {
      value: "quote",
      label: "Quote",
      Icon: Quote,
    },
  ];

  const selectedOption =
    currentLevel
      ? options.find(
          (option) => option.value === `heading-${currentLevel}`,
        )
      : options.find((option) => {
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
  const SelectedIcon = selectedOption?.Icon ?? AlignLeft;

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
      options={options as any}
      renderMenuItem={(item) => {
        const option = options.find(
          (option) => option.value === item.value,
        );

        if (!option) return <></>;

        const Icon = option.Icon;

        return (
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-x-2 rounded-sm px-2 py-1.5 text-left text-xs text-(--bn-colors-menu-text) hover:bg-(--bn-colors-hovered-background)"
            onClick={() => handleSelect(item.value)}
          >
            <Icon size={16} />
            {option.label}
          </button>
        );
      }}
      menuClasses="min-w-36"
    />
  );
};

export default CustomBlockTypeSelect;