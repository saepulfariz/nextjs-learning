This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Prisma Setup & Commands

### Initial Setup

```bash
pnpm install @prisma/client
pnpm install prisma --save-dev
npx prisma init
```

### Development Workflow

```bash
# Create and run migration
npx prisma migrate dev --name describe_your_change

# Generate client
npx prisma generate

# Seed database
npx prisma db seed
```

### Migration Management

```bash
# Check migration status
npx prisma migrate status

# Deploy migrations (PRODUCTION)
npx prisma migrate deploy

# Reset database (DEV ONLY)
npx prisma migrate reset
```

### Troubleshooting Common Issues

#### 1. "Relation already exists" Error

```bash
# Mark migration as already applied
npx prisma migrate resolve --applied [migration_name]

# Then deploy remaining migrations
npx prisma migrate deploy
```

#### 2. Migration History Conflicts

```bash
# Check what's different
npx prisma migrate status

# Option 1: Reset (dev only)
npx prisma migrate reset --force

# Option 2: Resolve conflicts
npx prisma migrate resolve --applied [migration_name]
```

#### 3. Database Out of Sync

```bash
# Force push schema to database (careful!)
npx prisma db push --accept-data-loss

# Or reset and start fresh
npx prisma migrate reset
```

#### Fix production migrate

```bash
npx prisma migrate resolve --applied 20250718100021_init_table
npx prisma migrate deploy
npx prisma generate
```

#### Self Notes

```bash
pnpm install @prisma/client
pnpm install prisma --save-dev
npx prisma init
npx prisma migrate dev --name init_table
npx prisma generate
npx prisma migrate dev --name create_divisions_table
npx prisma migrate reset
npx prisma migrate dev --name create_roles_table
```

## Redux

### Initial Setup

```bash
npm install @reduxjs/toolkit react-redux
```

## Next Auth

### Initial Setup

```bash
pnpm install next-auth zod bcrypt
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
