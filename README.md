# Motors USA
frontend/ Next.js (port 3000) · backend/ Express + PostgreSQL (port 4000)

    npm run setup      # once
    cp backend/.env.example backend/.env     # add DATABASE_URL later
    npm run dev        # runs both

Database: put DATABASE_URL in backend/.env, then: npm run db:init --prefix backend
Power BI connects to the views in backend/db/views.sql
