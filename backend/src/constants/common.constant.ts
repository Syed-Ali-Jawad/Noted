import type { Note } from "../generated/prisma/client.js";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const DEFAULT_NOTES: Partial<Note>[] = [{
    title: "Welcome to MyNotes 👋",
    content: `# Welcome 👋

This is your personal space for capturing ideas, tasks, and everything in between.

You can use **bold text**, *italic text*, and <u>underlined text</u> to make important information stand out.

> A good note-taking app should make capturing ideas feel effortless.

Useful resource: [Google](https://www.google.com/)

**Tip:** Pin important notes so they always stay at the top.`,
    color: "BLUE",
    type: "RICHTEXT",
    isPinned: true,
    isArchived: false,
    isTrashed: false,
},

{
    title: "Project Ideas",
    content: `## Project Ideas

Here are a few projects I'd like to build:

1. Expense tracker with charts
2. Simple habit tracker
3. Personal bookmark manager
4. Job application tracker

> The next project should probably focus on solving a real problem rather than adding too many features.

The goal is to keep each project **small, focused, and useful**.

Reference: [MDN Web Docs](https://developer.mozilla.org/)`,
    color: "PURPLE",
    type: "RICHTEXT",
    isPinned: false,
    isArchived: false,
    isTrashed: false,
},

{
    title: "Quick Thought",
    content: `## Keep the UI simple

Good products don't need every possible feature.

Focus on making the core experience **fast**, *predictable*, and <u>pleasant to use</u>.

### A few principles

1. Reduce unnecessary clicks
2. Keep important actions visible
3. Give clear feedback after actions

> Simple interfaces are often harder to design than complicated ones.

A useful resource is [Nielsen Norman Group](https://www.nngroup.com/).`,
    color: "WHITE",
    type: "RICHTEXT",
    isPinned: false,
    isArchived: false,
    isTrashed: false,
},

{
    title: "Frontend Learning Plan",
    content: `## Frontend Learning Plan

Topics to revisit:

- React rendering
- State management
- TypeScript generics
- Performance optimization
- Accessibility
- REST APIs
- Testing

**Priority:** React rendering and TypeScript.

*Performance optimization should come after understanding the fundamentals.*

> Strong fundamentals make learning new libraries much easier.

Most of the fundamentals are already familiar, but revisiting them regularly helps keep everything sharp.

Learn more at [React](https://react.dev/).`,
    color: "BLUE",
    type: "RICHTEXT",
    isPinned: false,
    isArchived: true,
    isTrashed: false,
},

{
    title: "Old Project Notes",
    content: `# React + Node + PostgreSQL

Initial project structure:

- React frontend
- Express API
- PostgreSQL database
- Prisma ORM
- JWT authentication

### Architecture

1. React handles the UI
2. Express exposes the REST API
3. PostgreSQL stores application data
4. Prisma handles database access

> Keep the backend simple until the application actually needs more complexity.

Useful documentation: [PostgreSQL](https://www.postgresql.org/docs/)`,
    color: "PURPLE",
    type: "RICHTEXT",
    isPinned: false,
    isArchived: true,
    isTrashed: false,
},

{
    title: "Unused Idea",
    content: `## Dashboard Idea

Build a small dashboard that shows:

1. Frequently used links
2. Recent documents
3. Useful shortcuts

> A simple start page could make frequently used resources easier to access.

Potential reference: [React Documentation](https://react.dev/learn).

The goal is to keep the first version **small and focused**.`,
    color: "PURPLE",
    type: "RICHTEXT",
    isPinned: false,
    isArchived: false,
    isTrashed: true,
}];