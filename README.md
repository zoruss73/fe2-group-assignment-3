# FE2 Authentication App

A modern authentication UI built with React, featuring Login and Register pages with a dark violet/fuchsia theme, animated SVG illustrations, and form validation.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

---

## Features

- **Login Page** — Email & password authentication against localStorage
- **Register Page** — First name, last name, email, password & confirm password with validation
- **Dark Theme** — Slate/violet/fuchsia color scheme with gradient accents
- **SVG Illustrations** — Custom inline SVGs with GSAP-animated floating elements
- **Responsive** — Full-width form on mobile, 1/3 + 2/3 split layout on desktop (`lg+`)
- **Form Validation** — Powered by React Hook Form
- **Reusable Components** — `Button`, `Input`, `Label`, `Modal`, `AuthLayout`
- **Typography** — Montserrat for headings/labels/buttons, Poppins for inputs

---

## Tech Stack

| Tool             | Purpose                 |
| ---------------- | ----------------------- |
| React 19         | UI library              |
| Vite 7           | Build tool & dev server |
| Tailwind CSS 4   | Utility-first styling   |
| React Router DOM | Client-side routing     |
| React Hook Form  | Form state & validation |
| GSAP             | SVG animations          |

---

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layouts/
│   │   │   └── AuthLayout.jsx      # Auth route wrapper with <Outlet />
│   │   ├── Button.jsx              # Gradient submit button
│   │   ├── Card.jsx                # Card component
│   │   ├── Input.jsx               # Dark-themed input field
│   │   ├── Label.jsx               # Form label
│   │   └── Modal.jsx               # Modal component
│   ├── pages/
│   │   ├── Login.jsx               # Login page with SVG illustration
│   │   └── Register.jsx            # Register page with SVG illustration
│   ├── App.jsx                     # Routes configuration
│   ├── index.css                   # Tailwind imports & font config
│   └── main.jsx                    # App entry point
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/zoruss73/fe2-group-assignment-3.git

# Navigate to the frontend directory
cd fe2-group-assignment-3/frontend

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Pages

### Login (`/`)

- Email and password fields
- Validates credentials against users stored in `localStorage`
- Links to the Register page

### Register (`/register`)

- First name, last name, email, password, and confirm password fields
- Saves new users to `localStorage`
- Redirects to Login on successful registration

---

## License

This project is for educational purposes.
