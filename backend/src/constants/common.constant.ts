import type { Note } from "../generated/prisma/client.js";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const DEFAULT_NOTES: Partial<Note>[] = [
    // ─── PINNED ─────────────────────────────────────────────

    {
        title: "Welcome to Noted 👋",
        content: `# Welcome 👋

This is your personal space for capturing ideas, tasks, and everything in between.

You can use **bold text**, *italic text*, and <u>underlined text</u> to highlight important information.

> A good note-taking app should make capturing ideas feel effortless.

Useful resource: [Google](https://www.google.com/)`,
        color: "BLUE",
        type: "RICHTEXT",
        isPinned: true,
        isArchived: false,
        isTrashed: false,
    },

    {
        title: "Today's Priorities",
        content: `- [x] Review today's schedule
- [ ] Reply to important messages
- [ ] Finish the current task
- [ ] Organize pending work
- [ ] Prepare for tomorrow`,
        color: "YELLOW",
        type: "CHECKLIST",
        isPinned: true,
        isArchived: false,
        isTrashed: false,
    },

    // ─── ACTIVE ─────────────────────────────────────────────

    {
        title: "Things to Remember",
        content: `A few things I want to keep in mind.

Take breaks when working for long periods, keep important tasks organized, and avoid putting off small tasks that can be finished quickly.

Keeping things simple usually makes it easier to stay consistent.`,
        color: "PURPLE",
        type: "TEXT",
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
        title: "Planning a Weekend Trip",
        content: `## Planning a Weekend Trip

A short trip can be much more enjoyable with a little planning.

Remember to **check the weather**, *pack light*, and <u>keep important documents somewhere safe</u>.

### Things to consider

1. Choose the destination
2. Check travel times
3. Plan a few activities
4. Leave some free time

> The best trips usually leave room for a little spontaneity.

A useful resource is [Google Maps](https://maps.google.com/).`,
        color: "WHITE",
        type: "RICHTEXT",
        isPinned: false,
        isArchived: false,
        isTrashed: false,
    },

    // ─── ARCHIVED ───────────────────────────────────────────

    {
        title: "Old Notes",
        content: `Some information from an older project.

The original plan included several ideas, tasks, and notes that are no longer relevant.

Keeping old information organized makes it easier to find what is still useful later.`,
        color: "PURPLE",
        type: "TEXT",
        isPinned: false,
        isArchived: true,
        isTrashed: false,
    },

    {
        title: "Learning Notes",
        content: `## Learning Notes

Topics to revisit:

1. Review the fundamentals
2. Practice common patterns
3. Explore new concepts
4. Build something small
5. Review what was learned

> Strong fundamentals make learning new things much easier.

Learn more at [React](https://react.dev/).`,
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
        content: `## A Simple Idea

Sometimes a small improvement can make a routine much easier.

1. Identify the problem
2. Think of a simple solution
3. Try it out
4. Keep what works

> Small improvements can add up over time.

Potential reference: [MDN Web Docs](https://developer.mozilla.org/).

The goal is to keep the first version **small and focused**.`,
        color: "PURPLE",
        type: "RICHTEXT",
        isPinned: false,
        isArchived: false,
        isTrashed: true,
    },
];