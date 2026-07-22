# Is It Underrated?

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-18181B?style=for-the-badge&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-333333?style=for-the-badge&logo=node.js&logoColor=68A063)](https://nodejs.org/es)

**Is It Underrated?** is a data-driven web platform designed to solve the discoverability problem on Steam. Instead of relying on traditional recommendation algorithms that heavily favor AAA or massively popular games, this platform utilizes a custom ETL pipeline and a proprietary mathematical model to surface highly-rated, niche "hidden gems".

🔗 **[Live Demo](https://is-it-underrated.vercel.app)**

## Features

- **Custom Algorithmic Scoring:** Computes an "Underrated Score" (0-100) based on review quality, a niche/hidden multiplier, and current player vitality.
- **Serverless Architecture:** Fast, globally distributed frontend deployed on Vercel leveraging Next.js App Router for optimal SSR/SSG.
- **Robust ETL Pipeline:** A dedicated Node.js script that securely fetches data from the Steam Web API, handles rate limits (429 errors), transforms the metrics, and updates a PostgreSQL database.
- **Dynamic UI:** Fluid, dark-themed user interface utilizing Tailwind CSS, featuring conditional styling (glowing effects) for legendary scores (90+).
- **Search & Pagination:** URL-driven state management for seamless sharing and navigation across thousands of games.

## The "Underrated Score" Logic

The core of the platform is a weighted algorithm running in the data transformation phase:

> *Weights, parameters and factors are subject to change.*

1. **Statistical Confidence:** Games with less than 300 total reviews are discarded.
2. **Quality (70%):** The ratio of positive reviews to total reviews.
3. **Hidden Factor (25%):** A reverse-popularity metric. As a game approaches 3,000 reviews, this multiplier decreases to 0.
4. **Player Vitality (5%):** A logarithmic curve rewarding active communities without overpowering the score.
5. **Survival Penalty:** Games with 10 or fewer concurrent players receive a 2.5% penalty to ensure recommendations are currently playable.

## Getting Started

To run this project locally, you will need Node.js and a Supabase account.

### 1. Clone the repository
```bash
git clone https://github.com/soulhae/is-it-underrated-front.git
cd is-it-underrated-front
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env.local` file in the root directory and add your keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_KEY=your_supabase_service_role_key # (Only for backend/ETL scripts)
STEAM_WEBAPI_KEY=your_steam_api_key # (Only for backend/ETL scripts)
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ETL Pipeline Execution
To calculate and update the metrics for the Steam catalog, check my other repo: **[Is It Underrated? Data](https://github.com/Soulhae/is-it-underrated-data)**  
If you need help with the Steam API make sure to check: **[Steamworks Web API Reference](https://partner.steamgames.com/doc/webapi?l=english)** and **[Steam Web API 'xPaw' Documentation](https://steamapi.xpaw.me/)**

## Author
**Benjamín Herrera Arancibia**
