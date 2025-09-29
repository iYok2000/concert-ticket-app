#  Concert Ticket App

Concert booking system with Admin/User dashboards.

## Quick Setup

```bash
# Install dependencies
pnpm install

# Start both API and Web
pnpm dev
```

**Open**: http://localhost:3000

## Usage

- **Switch Role**: Use role switcher to access Admin or User features
- **Admin**: Create concerts, view all reservations  
- **User**: Book tickets, view personal history

## Tech Stack

- Backend: NestJS (port 3001)
- Frontend: Next.js (port 3000)
- Storage: In-memory (resets on restart)

## Commands

```bash
pnpm dev      # Start both servers รัน command นี้อันเดียวก็ได้
pnpm dev:api  # API only
pnpm dev:web  # Web only
```