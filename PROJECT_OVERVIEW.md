# ♚ KnightOra Chess Academy — Full-Stack Project Overview

> **A comprehensive technical, architectural, and functional overview of the KnightOra Chess Academy full-stack platform.**

---

## 1. Executive Summary

**KnightOra Chess Academy** is a modern, high-performance web platform and academy management system built for online chess coaching. Tailored for students and parents across the **USA, UK, India, and worldwide**, the platform combines a public-facing, conversion-optimized marketing website with a role-based portal for students, parents, coaches, and administrators.

### Core Value Proposition
- **Global Online Coaching:** Targeted coaching for kids and juniors with low student-to-coach ratios (1:1 and 1:4).
- **FIDE & USCF Preparation:** Structured, rated syllabus from complete beginners (Zero ELO) to tournament champions (1800+ ELO).
- **Real Tournament Pedigree:** Showcasing verified tournament winners from US Chess Supernationals, Canadian Chess Challenge, CCL Scholastic, and Elite Chess Open.
- **Transparent Multi-Currency Pricing:** Clear dual-currency breakdown (USD `$` and INR `₹`) with real-time conversion rates.
- **Frictionless WhatsApp Onboarding:** Instant free trial booking that formats student details and opens direct WhatsApp chats with academy coordinators.

---

## 2. Technology Stack

The project is structured as a full-stack monorepo with clean separation between the frontend client and backend API server.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        KnightOra Monorepo                              │
├──────────────────────────────────┬─────────────────────────────────────┤
│       Client (Next.js 16)        │       Server (Express.js + TS)      │
├──────────────────────────────────┼─────────────────────────────────────┤
│ • Next.js 16.4.3 (Turbopack)     │ • Node.js + Express 4.19            │
│ • React 19.3.0                   │ • TypeScript 5.5                    │
│ • Tailwind CSS v4                │ • MongoDB Atlas + Mongoose 8.5      │
│ • Framer Motion 14 & Lucide      │ • JWT (Access & Refresh Tokens)     │
│ • Axios Interceptors + Token Ref │ • Cloudinary SDK (Image Management) │
│ • React Hot Toast                │ • Nodemailer (SMTP Notifications)   │
│ • Recharts (Dashboard Analytics) │ • Helmet + Express-Rate-Limit       │
└──────────────────────────────────┴─────────────────────────────────────┘
```

### Frontend (`/client`)
- **Framework:** Next.js 16.4.3 with Turbopack and React 19.
- **Styling:** Tailwind CSS v4 with bespoke luxury chess design tokens (rich golds, warm slates, emerald highlights).
- **Typography:** `Playfair Display` for editorial headings and `Inter` for UI body copy.
- **Animation:** Custom `ScrollReveal` component leveraging modern `IntersectionObserver` APIs for staggered scroll animations.
- **HTTP Client:** Axios client configured with automatic request/response interceptors and silent token refresh upon `401 Unauthorized`.
- **Forms & Validation:** Controlled form state management with `react-hot-toast` notifications.

### Backend (`/server`)
- **Runtime & Language:** Node.js with TypeScript (`ts-node-dev` for development, `tsc` for production).
- **Web Framework:** Express.js 4.19 with modular routing.
- **Database & ODM:** MongoDB Atlas utilizing Mongoose 8.5 with strict schemas, indexes, and virtuals.
- **Security & Middleware:** Helmet, CORS with origin checks, Express-Rate-Limit (general + strict auth limiters), Morgan request logging.
- **Authentication:** Dual JWT tokens (short-lived access tokens and secure refresh tokens) with `bcryptjs` password hashing.
- **Third-Party Integrations:** Cloudinary for media uploads, Nodemailer for transactional booking confirmations.

---

## 3. Directory & File Structure

```
KnightOra/
├── package.json                   # Root monorepo scripts (concurrently dev & build)
├── PROJECT_OVERVIEW.md            # This comprehensive project documentation
│
├── client/                        # Next.js 16 Frontend Application
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Root layout with fonts, AuthProvider, Toaster, Floating WhatsApp
│   │   ├── page.tsx               # Homepage assembling all hero & feature sections
│   │   ├── globals.css            # Design tokens, custom scrollbars, animations & Tailwind v4
│   │   ├── about/page.tsx         # Academy story, coaching philosophy, and mentors
│   │   ├── courses/page.tsx       # Curriculum breakdown (Beginner, Intermediate, Advanced)
│   │   ├── trial/page.tsx         # WhatsApp-integrated Free Trial booking form
│   │   ├── gallery/page.tsx       # Real KnightOra tournament winners & classroom photos
│   │   ├── blog/page.tsx          # Chess insights, tactical guides, and academy news
│   │   ├── auth/
│   │   │   ├── login/page.tsx     # Student/Coach/Parent login screen
│   │   │   └── register/page.tsx  # User onboarding with password strength checker
│   │   └── dashboard/
│   │       ├── student/page.tsx   # Student Portal (classes, ratings, homework)
│   │       ├── parent/page.tsx    # Parent Portal (progress reports, attendance, fees)
│   │       ├── coach/page.tsx     # Coach Portal (batch management, evaluations)
│   │       └── admin/page.tsx     # Admin Portal (academy KPIs, trials, leads, users)
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroSection.tsx    # Full-bleed coaching hero, trust badges & headline
│   │   │   ├── StatsSection.tsx   # Verified metrics (students, tournaments, ratings)
│   │   │   ├── BenefitsSection.tsx# "Why Choose KnightOra" with real classroom photos
│   │   │   ├── WinnersSection.tsx # Real trophy photos of national & scholastic champions
│   │   │   ├── FeaturedCourses.tsx# Dual-currency pricing cards (Duo, Individual, Group)
│   │   │   ├── TestimonialsSection.tsx # Parent & student testimonials
│   │   │   └── CTASection.tsx     # Conversion banner with Supernationals medalist photo
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Sticky translucent navigation with mobile menu
│   │   │   └── Footer.tsx         # Light theme footer with links, contacts, social icons
│   │   └── shared/
│   │       ├── ScrollReveal.tsx   # Reusable viewport scroll animation wrapper
│   │       └── AnnouncementBanner.tsx # Top notification bar for webinars/camps
│   ├── lib/
│   │   ├── api.ts                 # Axios instance with auth interceptors & typed endpoints
│   │   └── auth-context.tsx       # React Context for session persistence and roles
│   └── public/
│       └── images/                # Real KnightOra winner photos, coaching scenes, logos
│
└── server/                        # Express.js TypeScript Backend
    ├── src/
    │   ├── index.ts               # Express application initialization & middleware setup
    │   ├── seed.ts                # Database seeder with sample courses, users, and blogs
    │   ├── config/
    │   │   └── database.ts        # MongoDB Atlas Mongoose connection logic
    │   ├── controllers/
    │   │   ├── authController.ts  # Register, login, refresh token, session verify
    │   │   ├── courseController.ts# Course CRUD, enrollment queries
    │   │   └── trialController.ts # Trial booking logic, lead status management
    │   ├── middleware/
    │   │   ├── auth.ts            # JWT verification & role-based route guard
    │   │   └── errorHandler.ts    # Global centralized error handling
    │   ├── models/                # Mongoose Database Schemas
    │   │   ├── User.ts            # Admin, Coach, Student, Parent profiles
    │   │   ├── Course.ts          # Course definitions, levels, formats
    │   │   ├── TrialBooking.ts    # Trial booking leads and schedules
    │   │   ├── Enrollment.ts      # Active student-course registrations
    │   │   ├── Attendance.ts      # Class attendance records
    │   │   ├── Assignment.ts      # Puzzles, homework, and coach feedback
    │   │   ├── BlogPost.ts        # Content management for chess articles
    │   │   ├── Gallery.ts         # Media items and competition achievements
    │   │   ├── Announcement.ts    # System & academy-wide broadcasts
    │   │   └── Setting.ts         # Global platform configurations
    │   ├── routes/                # Modular Express API Routes
    │   └── utils/
    │       └── jwt.ts             # Token generation and verification utilities
    └── .env.example               # Template for required environment variables
```

---

## 4. Key Functional Modules & Pages

### 4.1. Homepage (`/`)
1. **Hero Section:**
   - **Headline:** `#1 Online Chess Coaching for Kids in the USA, UK & Worldwide`
   - **Visuals:** High-resolution academy coaching backdrop with soft contrast overlay.
   - **Badges:** FIDE Certified Mentors, USCF & Scholastic Prep, 1:4 Student-Coach Batches, 4.9/5 Rating (500+ Families).
   - **Actions:** Quick links to Explore Courses and instant WhatsApp consultation.

2. **Verified Statistics:**
   - Highlights 500+ Active Students, 15+ FIDE Rated Mentors, 94% Tournament Win Rate, and 50+ Podiums across USA/Canada.

3. **"More Than Just Chess Lessons" (Benefits):**
   - Direct display of real classroom photos:
     - **Live Analysis:** Coach demonstrating tactics on a wall-mounted demonstration board.
     - **Academy Culture:** Energetic junior students cheering together in class.
   - Core differentiators: Consistent coach, weekly reports, low batch ratio, flexible scheduling.

4. **Hall of Champions (Winners Section):**
   - Features actual KnightOra students with their awards:
     - *US Chess Supernationals* medalists
     - *CCL Scholastic Cup* 1st place champions
     - *Buffalo Grove Triple Podium* winners
     - *Canadian Chess Challenge* qualifiers
     - *Elite Chess Open* trophy holders

5. **Flexible Pricing Plans:**
   - Directly converted based on current exchange rates (**1 USD ≈ ₹94 INR**):
     - **Duo (2 Kids):** `$5 / ₹470` per class *(was ~~$15 / ₹1,410~~)*
     - **Individual (1-on-1):** `$8 / ₹750` per class *(was ~~$18 / ₹1,690~~)* — *Most Popular*
     - **Group (8 Classes):** `$35 / ₹3,290` monthly pack *(was ~~$50 / ₹4,700~~)* — *Best Value*
   - Includes feature checklist, direct trial CTA, and one-tap WhatsApp enrollment.

6. **CTA Section:**
   - High-impact closing panel: *"Begin Your Child's Chess Journey"* showcasing the US Chess Supernationals medalist photo.

---

### 4.2. Training Programs & Detailed Syllabus (`/courses`)
Structured across three comprehensive developmental milestones with batch sizes removed for maximum focus on curriculum:
- **Beginner Foundations (Zero to 1000 ELO):**
  - *Duration:* 12 Weeks (24 Sessions)
  - *Topics:* Board geometry, piece values, castling, en passant, promotion, core tactical motifs (pins, forks, skewers), checkmating nets, opening safety, King & pawn endgames, algebraic notation.
  - *Outcome:* Confidently play full rated games and reach 1000 ELO.
- **Intermediate Tactics & Strategy (1000–1400 ELO):**
  - *Duration:* 16 Weeks (32 Sessions)
  - *Topics:* Deflection, decoying, overloading, open files & outposts, pawn structures (isolated/doubled/passed), opening repertoires (Italian, Sicilian, Queen's Gambit), candidate moves, Lucena & Philidor endgames.
  - *Outcome:* Calculate 3–4 moves deep, dominate middlegame plans, and reach 1400 ELO.
- **Advanced & Tournament Prep (1400–1800+ ELO):**
  - *Duration:* Ongoing Specialized Training
  - *Topics:* Calculation trees, prophylactic thinking, engine-tested opening novelties, opposite-color bishop technique, triangulation, dynamic sacrifices, tournament time management, FIDE rating roadmap.
  - *Outcome:* Compete for podiums in FIDE and national championships.

---

### 4.3. Frictionless Free Trial Class Booking (`/trial`)
- **Client-Side Form Validation:** Validates student name, age (4–80), current skill level, parent/guardian name, email, phone number, preferred date, and preferred time slot.
- **Direct WhatsApp Automation:**
  - Upon submitting, the application packages all inputs into a clean, pre-formatted message:
    ```text
    Hi KnightOra! I'd like to book a FREE TRIAL class. 🎉

    👤 Student: Aarav Patel (Age: 8)
    📚 Level: Complete Beginner
    👨‍👩 Parent/Guardian: Rajesh Patel
    📧 Email: rajesh@example.com
    📞 Phone: +91 98765 43210
    📅 Preferred Date: Wednesday, November 11, 2026
    ⏰ Preferred Time: 03:00 PM - 04:00 PM
    📝 Goals: Preparing for local scholastic championship

    Please confirm my free trial booking. Thank you! 🙏
    ```
  - Automatically launches `https://wa.me/918459527115?text=...` in a new window, bypassing tedious email back-and-forth and driving immediate WhatsApp conversations.

---

### 4.4. Role-Based Dashboards

| Dashboard | Target User | Key Capabilities |
| :--- | :--- | :--- |
| **Student** (`/dashboard/student`) | Enrolled Kids & Teens | View upcoming live class links, solve assigned puzzles, review coach notes, track rating progress over time. |
| **Parent** (`/dashboard/parent`) | Guardians | Monitor student attendance, read weekly progress assessments, view active billing plans, contact coach. |
| **Coach** (`/dashboard/coach`) | FIDE Mentors | Manage batch rosters, mark attendance, assign tactics homework, submit performance evaluations. |
| **Admin** (`/dashboard/admin`) | Academy Directors | Full CRM for trial bookings/leads, user management (activate/deactivate), course catalog editor, revenue reports. |

---

## 5. Backend Architecture & Database Models

The backend leverages MongoDB with strict Mongoose validation:

```
┌─────────────────────────────────────────────────────────────┐
│                       MongoDB Schemas                       │
├───────────────┬─────────────────────────────────────────────┤
│ User          │ Email, passwordHash, role, phone, profile   │
│ Course        │ Title, slug, level, pricing, syllabus       │
│ TrialBooking  │ Student info, parent info, slot, leadStatus │
│ Enrollment    │ StudentId, courseId, startDate, status      │
│ Attendance    │ BatchId, studentId, date, status, notes     │
│ Assignment    │ StudentId, coachId, puzzles, submission     │
│ BlogPost      │ Title, slug, author, content, tags, status  │
│ Gallery       │ ImageUrl, title, category, eventYear        │
│ Setting       │ Key-value academy configuration store       │
└───────────────┴─────────────────────────────────────────────┘
```

### Complete API Route Reference

#### Authentication (`/api/auth`)
- `POST /api/auth/register` — Create a new account with email, password, and role.
- `POST /api/auth/login` — Authenticate user and receive access & refresh tokens.
- `POST /api/auth/refresh` — Issue a new access token using a valid refresh token.
- `POST /api/auth/logout` — Invalidate user session.
- `GET  /api/auth/me` — Retrieve the currently authenticated user's profile.

#### Courses (`/api/courses`)
- `GET    /api/courses` — List courses (supports filtering by level, featured flag, limit).
- `GET    /api/courses/:slug` — Retrieve detailed course syllabus and metadata.
- `POST   /api/courses` *(Admin)* — Create a new course offering.
- `PUT    /api/courses/:id` *(Admin)* — Update course details.
- `DELETE /api/courses/:id` *(Admin)* — Soft/hard delete a course.

#### Trial Bookings (`/api/trials`)
- `POST   /api/trials` — Submit a trial booking request.
- `GET    /api/trials` *(Admin/Coach)* — List all trial bookings with filter by status.
- `PUT    /api/trials/:id` *(Admin)* — Update trial status (`pending`, `confirmed`, `completed`).
- `DELETE /api/trials/:id` *(Admin)* — Remove trial record.

#### Users & Enrollments (`/api/users`, `/api/enrollments`)
- `GET   /api/users` *(Admin)* — List all registered users with pagination and search.
- `PATCH /api/users/:id/toggle-active` *(Admin)* — Enable/disable user access.
- `POST  /api/enrollments` — Register a student into a specific batch or course.

---

## 6. Security, Performance & UX Best Practices

1. **Authentication Interceptor & Silent Refresh:**
   - The Axios client automatically attaches `Bearer <token>` to all protected outgoing requests.
   - When an access token expires (HTTP 401), the interceptor halts failed requests, calls `/api/auth/refresh`, updates tokens in `localStorage`, and replays the original request seamlessly.

2. **Defensive Input Styling:**
   - Form inputs use `@layer components` in Tailwind CSS with explicit left-padding overrides (`.input.pl-10 { padding-left: 2.75rem !important }`) and centered pointer-events-none icons, preventing icon/text collisions across browsers.

3. **Rate Limiting & Abuse Prevention:**
   - Global rate limiter caps traffic at 200 requests per 15-minute window per IP.
   - Authentication routes enforce a strict threshold of 20 attempts per 15 minutes to eliminate brute-force risks.

4. **SEO & High-Performance Media:**
   - Pre-rendered static pages via Next.js SSG for lightning-fast First Contentful Paint (FCP).
   - Responsive images using Next.js `<Image />` with modern WebP formatting, automatic dimensions, and lazy loading.
   - Structured metadata and OpenGraph tags configured in `layout.tsx`.

---

## 7. Local Development & Deployment Guide

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher
- **MongoDB:** MongoDB Atlas connection URI or local instance

### Installation
1. Clone the repository and install root dependencies:
   ```bash
   cd KnightOra
   npm install
   ```
2. Install client and server dependencies:
   ```bash
   cd client && npm install
   cd ../server && npm install
   cd ..
   ```

### Configuration
1. **Server Environment:** Create `server/.env` based on `server/.env.example`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/knightora?retryWrites=true&w=majority
   JWT_ACCESS_SECRET=your-super-secret-access-key
   JWT_REFRESH_SECRET=your-super-secret-refresh-key
   CLIENT_URL=http://localhost:3000
   ```
2. **Client Environment:** Create `client/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

### Running the Application
- **Run both frontend and backend concurrently:**
  ```bash
  npm run dev
  ```
  - Client runs at: `http://localhost:3000`
  - Server runs at: `http://localhost:5000`
  - API Health Check: `http://localhost:5000/api/health`

- **Build for Production:**
  ```bash
  npm run build
  ```
  *(Compiles TypeScript backend to `/dist` and runs Next.js production bundle via Turbopack).*

---

## 8. Summary of Recent Enhancements

| Enhancement Area | Description |
| :--- | :--- |
| **Light Theme Redesign** | Modernized entire site into a warm light aesthetic with gold and emerald accents. |
| **Real Tournament Photos** | Added genuine trophies & medalists (Supernationals, Scholastic Cup, Canadian Challenge). |
| **Real Classroom Images** | Integrated demonstration board teaching and classroom celebration photos in Why Choose section. |
| **WhatsApp Direct Booking** | Replaced generic form submission with a pre-filled direct WhatsApp deep link. |
| **Live Multi-Currency Pricing** | Converted USD to INR using the current live exchange rate (`$5 / ₹470`, `$8 / ₹750`, `$35 / ₹3,290`). |
| **Curriculum Focus** | Removed batch size and tuition fees from `/courses` to spotlight structured learning topics and milestones. |

---

*Document prepared for KnightOra Chess Academy • Better Thinkers. Stronger Moves.*

