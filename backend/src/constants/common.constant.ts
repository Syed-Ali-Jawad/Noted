import type { Note } from "../generated/prisma/client.js";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const DEFAULT_NOTES: Partial<Note>[] = [
    // ─── PINNED ─────────────────────────────────────────────

    {
        title: "Welcome to MyNotes 👋",
        content: `# Welcome 👋

This is your personal space for capturing ideas, tasks, and everything in between.

Start by creating a note, checking off a task, or writing down something you don't want to forget.

**Tip:** Pin important notes so they always stay at the top.`,
        color: "BLUE",
        type: "RICHTEXT",
        isPinned: true,
        isArchived: false,
        isTrashed: false,
    },

    {
        title: "Today's Priorities",
        content: `- [x] Review current project tasks
- [ ] Finish the notes app UI
- [ ] Test authentication flow
- [ ] Deploy the latest changes
- [ ] Update portfolio project`,
        color: "YELLOW",
        type: "CHECKLIST",
        isPinned: true,
        isArchived: false,
        isTrashed: false,
    },

    // ─── ACTIVE ─────────────────────────────────────────────

    {
        title: "Project Ideas",
        content: `A few ideas I'd like to build:

- Expense tracker with charts
- Simple habit tracker
- Personal bookmark manager
- Job application tracker

The next project should probably focus on solving a real problem rather than adding too many features.`,
        color: "PURPLE",
        type: "RICHTEXT",
        isPinned: false,
        isArchived: false,
        isTrashed: false,
    },

    {
        title: "Shopping List",
        content: `- [ ] Milk
- [ ] Bread
- [ ] Eggs
- [ ] Coffee
- [ ] Chicken
- [ ] Fruits`,
        color: "GREEN",
        type: "CHECKLIST",
        isPinned: false,
        isArchived: false,
        isTrashed: false,
    },

    {
        title: "Quick Thought",
        content: `Keep the UI simple.

Good products don't need every possible feature. Focus on making the core experience fast, predictable, and pleasant to use.`,
        color: "WHITE",
        type: "TEXT",
        isPinned: false,
        isArchived: false,
        isTrashed: false,
    },

    // ─── ARCHIVED ───────────────────────────────────────────

    {
        title: "Old Project Notes",
        content: `React + Node + PostgreSQL

Initial project structure:

- React frontend
- Express API
- PostgreSQL database
- Prisma ORM
- JWT authentication

The project was eventually replaced with a newer version.`,
        color: "PURPLE",
        type: "TEXT",
        isPinned: false,
        isArchived: true,
        isTrashed: false,
    },

    {
        title: "Frontend Learning Plan",
        content: `Topics to revisit:

- React rendering
- State management
- TypeScript generics
- Performance optimization
- Accessibility
- REST APIs
- Testing

Most of the fundamentals are already familiar, but revisiting them regularly helps keep everything sharp.`,
        color: "BLUE",
        type: "RICHTEXT",
        isPinned: false,
        isArchived: true,
        isTrashed: false,
    },

    {
        title: "Weekend Plans",
        content: `- [x] Clean the room
- [ ] Go for a walk
- [ ] Watch a movie
- [ ] Finish the book
- [ ] Prepare for next week`,
        color: "YELLOW",
        type: "CHECKLIST",
        isPinned: false,
        isArchived: true,
        isTrashed: false,
    },

    // ─── TRASH ──────────────────────────────────────────────

    {
        title: "Temporary Notes",
        content: `Temporary information that is no longer needed.

Delete this note permanently when everything has been confirmed.`,
        color: "WHITE",
        type: "TEXT",
        isPinned: false,
        isArchived: false,
        isTrashed: true,
    },

    {
        title: "Old Shopping List",
        content: `- [x] Rice
- [x] Cooking oil
- [x] Tea
- [x] Biscuits`,
        color: "GREEN",
        type: "CHECKLIST",
        isPinned: false,
        isArchived: false,
        isTrashed: true,
    },

    {
        title: "Unused Idea",
        content: `Build a small dashboard that shows frequently used links, recent documents, and useful shortcuts.`,
        color: "PURPLE",
        type: "RICHTEXT",
        isPinned: false,
        isArchived: false,
        isTrashed: true,
    },
];