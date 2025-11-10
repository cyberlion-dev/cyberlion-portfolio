# Christmas Drawing App - Features & Usage

## Overview

The Christmas Drawing app now has admin controls and copy-to-clipboard functionality for easy sharing!

## Passwords

**Family Password (View Only):**
- Password: `cyberlion2025`
- Can view drawings
- Can reveal their own assignment
- Cannot generate, lock, or delete

**Admin Password (Full Control):**
- Password: `cyberlionadmin2025`
- Can do everything family members can, PLUS:
  - Generate new drawings
  - Lock/unlock years
  - Delete drawings
  - Copy assignments to clipboard
  - Shows "Admin" badge when logged in

## Features

### 1. Generate Drawing (Admin Only)
- Click "Generate [Year] Drawing" to create assignments
- Algorithm ensures:
  - No self-assignments
  - No repeats from past 2 years
  - Circular gift-giving (everyone gives and receives once)
- Can only generate once per year
- Delete first if you want to regenerate

### 2. View Assignments (Everyone)
- Each family can click "Reveal" to see who they're giving to
- Reveal state is local (doesn't sync across devices)
- Refreshing the page hides all assignments again

### 3. Copy to Clipboard (Admin Only)
- **Individual Copy**: Reveal an assignment, then click "Copy Text"
  - Generates a personalized message like:
    ```
    🎄 Hey Jordan & Emily! 🎅

    Your 2025 Christmas gift assignment is:

    🎁 You're giving to: Chris & Stephanie

    Remember:
    - Keep it secret! 🤫
    - Budget: $50 (or whatever you agreed)
    - Gift exchange: [Add your date]

    Merry Christmas! 🎄
    ```
  - Text is copied to clipboard
  - Paste into text message to that family!

- **Copy All**: Click "Copy All" button
  - Copies all assignments in a list format:
    ```
    🎄 2025 Christmas Drawing Results 🎅

    Nicole & Kevin → Brittany & Jose
    Nathan & Alicia → Zach & Jess
    Brittany & Jose → Chris & Stephanie
    Jordan & Emily → Nicole & Kevin
    Chris & Stephanie → Nathan & Alicia
    Zach & Jess → Jordan & Emily

    Merry Christmas! 🎄
    ```

### 4. Lock/Unlock Years (Admin Only)
- Click "Lock" to prevent accidental deletion
- Locked years show a lock badge
- Must unlock before deleting

### 5. Delete Drawings (Admin Only)
- Click trash icon to delete a drawing
- Confirmation prompt to prevent accidents
- Cannot delete locked years

### 6. View History (Everyone)
- Click "Past Years" to expand history
- See all previous years' assignments
- Helps avoid duplicates

## Workflow for Admin

### Each Year:

1. **Early December**: Login with admin password
2. **Generate**: Click "Generate [Year] Drawing"
3. **Review**: Reveal all assignments to verify they look good
4. **Copy & Send**:
   - Option A: Click "Copy Text" for each family, paste into individual text messages
   - Option B: Click "Copy All", send group message with everyone's assignments
5. **Lock**: Click "Lock" to prevent accidental changes
6. **Next Year**: When the year changes, generate new drawing!

### If You Need to Regenerate:

1. Click "Unlock" (if locked)
2. Click trash icon to delete
3. Click "Generate [Year] Drawing" again

## Workflow for Family Members

1. Login with family password: `cyberlion2025`
2. Click "Reveal" to see your assignment
3. Remember who you're giving to!
4. Close the page (your reveal state won't persist)

## Technical Details

### Data Storage:
- All drawings stored in AWS S3 (`cyberlion-gen-bucket`)
- Syncs across all devices for everyone
- Persists forever (unless deleted)

### New Year Behavior:
- On January 1, 2026, the app automatically allows generating 2026 drawing
- 2025 drawing moves to "Past Years" section
- Can still view and lock old years

### Security:
- Admin password different from family password
- S3 bucket is private (only Lambda has access)
- Passwords are in code (fine for family use)
- No email addresses stored

## Customization

Want to change something? Edit these in `page.tsx`:

**Passwords:**
```typescript
const PASSWORD = "cyberlion2025";        // Family password
const ADMIN_PASSWORD = "cyberlionadmin2025";  // Admin password
```

**Family Members:**
```typescript
const FAMILIES = [
  "Nicole & Kevin",
  // Add or remove families here
];
```

**Copy Message Template:**
Edit the `copyAssignmentText` function to change the text format.

## Troubleshooting

**Drawing not saving:**
- Check AWS S3 bucket has the JSON file
- Check browser console for errors
- Verify `USE_API = true` in code

**Can't generate:**
- Make sure you're using the admin password
- Delete existing year first if regenerating

**Copy button not working:**
- Try refreshing the page
- Make sure you revealed the assignment first
- Check browser allows clipboard access

**Family can't see drawing:**
- Make sure they're using the same URL
- Verify API is working (check S3)
- Try clearing their browser cache

## Future Ideas

- Email integration (EmailJS already partially set up)
- Mobile app version
- Gift tracking (who bought what)
- Budget management
- Wish list integration
- Automatic reminder emails

---

Merry Christmas! 🎄🎅

**Admin**: Jordan
**Password**: Ask Jordan!
**Questions**: Contact Jordan
