import type { Note } from "../generated/prisma/client.js";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const DEFAULT_NOTES: Partial<Note>[] = [
    {
        title: "Welcome",
        content: `# Welcome 👋

Start writing your ideas here.`,
        color: "BLUE",
        type: "RICHTEXT",
        isPinned: true,
        isArchived: false,
        isTrashed: false,
    },
    {
        title: "Today's Tasks",
        content: `- [x] Set up MyNotes
- [ ] Add a new note
- [ ] Update profile`,
        color: "YELLOW",
        type: "CHECKLIST",
        isPinned: true,
        isArchived: false,
        isTrashed: false,
    },
    {
        title: "Shopping List",
        content: `- [ ] Milk
- [ ] Bread
- [ ] Eggs
- [ ] Coffee`,
        color: "GREEN",
        type: "CHECKLIST",
        isPinned: false,
        isArchived: false,
        isTrashed: false,
    },
    {
        title: "Quick Idea",
        content: `Build a simple **expense tracker** next.`,
        color: "PURPLE",
        type: "RICHTEXT",
        isPinned: false,
        isArchived: false,
        isTrashed: false,
    },
    {
        title: "Meeting Notes",
        content: `Discussed the new dashboard design.

Next: review the API changes.`,
        color: "BLUE",
        type: "TEXT",
        isPinned: false,
        isArchived: false,
        isTrashed: false,
    },
    {
        title: "Weekend Plans",
        content: `Go for a walk

Watch a movie
Finish the project`,
        color: "YELLOW",
        type: "TEXT",
        isPinned: false,
        isArchived: false,
        isTrashed: false,
    },
    {
        title: "Book Recommendations",
        content: `Try reading **Atomic Habits** and **Deep Work**.`,
        color: "WHITE",
        type: "RICHTEXT",
        isPinned: false,
        isArchived: false,
        isTrashed: false,
    },
    {
        title: "Workout",
        content: `- [ ] Push-ups
- [ ] Squats
- [ ] 20 min walk`,
        color: "GREEN",
        type: "CHECKLIST",
        isPinned: false,
        isArchived: false,
        isTrashed: false,
    },
    {
        title: "Learning",
        content: `Today I learned about SWR mutations and optimistic updates.`,
        color: "BLUE",
        type: "TEXT",
        isPinned: false,
        isArchived: false,
        isTrashed: false,
    },
    {
        title: "Old Project",
        content: `React + Node + PostgreSQL`,
        color: "PURPLE",
        type: "TEXT",
        isPinned: false,
        isArchived: true,
        isTrashed: false,
    },
    {
        title: "Reference",
        content: `npm run dev
npm run build`,
        color: "YELLOW",
        type: "TEXT",
        isPinned: false,
        isArchived: true,
        isTrashed: false,
    },
    {
        title: "Random Thought",
        content: `Sometimes the simplest solution is the best one.`,
        color: "GREEN",
        type: "TEXT",
        isPinned: false,
        isArchived: false,
        isTrashed: false,
    },
];