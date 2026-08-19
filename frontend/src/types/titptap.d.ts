// src/types/tiptap.d.ts
import "@tiptap/core";

declare module "@tiptap/core" {
  interface EditorStorage {
    markdown: {
      getMarkdown: () => string;
    };
  }
}
