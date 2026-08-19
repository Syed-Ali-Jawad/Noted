# Google Keep Replica — UI Plan (Simplified)

## Pages

Only 4 main pages:

1. Login
2. Signup
3. Notes
4. Profile

Additional pages:
- Trash
- Archive

---

# 1. Login Page

Purpose:
Allow existing users to access their notes.

Components:

- Email input
- Password input
- Login button
- Link to signup


---

# 2. Signup Page

Components:

- Name
- Email
- Password
- Confirm password
- Signup button


---

# 3. Notes Page (Main Application)

This is the main workspace.

Layout:

------------------------------------
| Logo | Search | Profile           |
------------------------------------

| Sidebar | Notes Area

---

## Sidebar

Options:

📝 Notes

🗄 Archive

🗑 Trash


No labels page.

---

# Notes Area

## Create Note Input

At top:

"Take a note..."

Click opens note editor.

---

# Pinned Section

Pinned notes appear at the top.

Example:

Pinned

[ Note ] [ Note ] [ Note ]


--------------------

Other Notes

[ Note ] [ Note ] [ Note ]


Pinned notes are not separate page.
They are just prioritized.

---

# Note Card

Contains:

- Title
- Content
- Note type indicator
- Labels
- Created/updated date

Actions menu:

⋮

Options:

- Edit
- Pin/unpin
- Archive
- Move to trash
- Add label
- Change color


---

# Creating a Note

Single note creator.

Options:

Note type:

- Text
- Checklist
- Image


Features:

- Add title
- Add content
- Add checklist items
- Upload image
- Select color
- Add label


---

# Labels

No separate label management page.

Labels are created while creating/editing notes.

Example:

Create note:

Title:
Learn PostgreSQL

Label:
Backend

If label does not exist:
- Create new label

If label exists:
- Select existing label


Labels are only used for filtering/searching.

---

# Archive Page

Purpose:

Store notes removed from main view.

Features:

- View archived notes
- Unarchive note
- Move to trash
- Delete permanently


---

# Trash Page

Purpose:

Handle deleted notes.

Features:

- View deleted notes
- Restore note
- Delete permanently

Optional:
- Empty trash button


---

# Profile Page

Contains:

- User information
- Update name
- Change password
- Logout


---

# Navigation Flow

User logs in

↓

Notes Page

↓

Create/Edit notes

↓

Archive or Trash when needed

↓

Profile for account settings