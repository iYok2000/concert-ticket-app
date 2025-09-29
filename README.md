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

Bonus Task (Optional):
● Express your opinion about how to optimize your website in case that this
website contains intensive data and when more people access, the lower speed
you get?
- Use CDN + Caching (Redis) ลดโหลดซ้ำ
	•	Optimize Database: index, pagination, query ให้เบา
        • Monitoring หาคอขวดแล้วแก้ตรงจุด
● Express your opinion about how to handle when many users want to reserve the
ticket at the same time? We want to ensure that in the concerts there is no one
that needs to stand up during the show
- Queue System (RabbitMQ/Kafka) ควบคุมลำดับจอง