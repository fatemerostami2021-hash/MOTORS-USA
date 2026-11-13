# Motors USA
frontend/ Next.js (port 3100) · backend/ Express + PostgreSQL (port 4000)

## Local
    npm run setup
    npm run dev
    npm run images --prefix frontend      # converts JPG/PNG in frontend/public/cars to WebP and fixes names

## Docker (frontend + backend + PostgreSQL)
    cp .env.docker.example .env           # set POSTGRES_PASSWORD
    docker compose up --build -d          # site: http://localhost:3100

## Vercel (frontend only): Root Directory = frontend. Set NEXT_PUBLIC_SITE_URL to your real domain.
