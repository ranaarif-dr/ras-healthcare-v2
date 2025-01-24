# Ras Healthcare Marketplace

## Project Overview
Ras Healthcare is an e-commerce platform specializing in high-quality healthcare supplements for the Pakistani audience. The platform offers a seamless shopping experience across devices, efficient order handling, and robust backend integration using modern technologies.

---

## Technologies Used

### Frontend
- **Next.js** (15.0.0) - React framework with App Router
- **React** (19.0.0 RC) - UI library
- **TypeScript** - Strongly-typed programming language
- **Tailwind CSS** (3.4.1) - CSS framework for styling
- **Radix UI** - Component primitives

### Backend
- **Appwrite** - Backend as a Service (BaaS) for authentication, database, and APIs

### Other Tools
- **Trax** - Planned for future shipment handling
- **Resend** - Email service

---

## Project Activities

### Day 1: Laying the Foundation
- Defined the project’s purpose and scope.
- Outlined target audience: all age groups in Pakistan.
- Selected core technologies for frontend, backend, and database.

### Day 2: Planning the Technical Foundation
- Structured the application’s architecture.
- Established folder structures and modular approach for scalability.
- Selected Appwrite for backend operations.

### Day 3: API Integration and Data Migration
- Integrated APIs using Appwrite SDK.
- Migrated initial data using custom scripts.
- Validated API responses for accuracy.

### Day 4: Building Dynamic Frontend Components
- Developed components for:
  - Product details
  - Cart operations
  - Checkout
  - Order management
  - Blog system
- Ensured responsive design for all components.

### Day 5: Testing, Error Handling, and Backend Integration Refinement
- Conducted functional, performance, and security testing.
- Implemented robust error handling mechanisms.
- Refined backend API and database structure.

---

## Folder Structure
```
Ras-Healthcare/
├── public/                # Static assets (images, fonts, etc.)
├── src/
│   ├── components/        # Reusable React components
│   │   ├── ProductDetails/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── OrderManagement/
│   │   └── BlogSystem/
│   ├── pages/             # Next.js pages for routing
│   │   ├── index.tsx      # Homepage
│   │   ├── product/[id].tsx
│   │   ├── cart.tsx
│   │   ├── checkout.tsx
│   │   └── orders.tsx
│   ├── styles/            # Tailwind CSS styles
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Helper functions
│   ├── api/               # API integration logic
│   │   ├── appwrite/      # Appwrite-specific API calls
│   │   └── helpers/       # Generic API helpers
│   ├── context/           # Context API for global state management
│   └── tests/             # Testing files
├── .eslintrc.js           # ESLint configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation (this file)
```

---

## How to Run the Project

### Prerequisites
- Node.js >= 16.x
- Yarn or npm
- Appwrite instance setup

### Steps to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ras-healthcare.git
   cd ras-healthcare
   ```
2. Install dependencies:
   ```bash
   yarn install
   # OR
   npm install
   ```
3. Configure environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the following variables:
     ```env
     NEXT_PUBLIC_APPWRITE_ENDPOINT=<your_appwrite_endpoint>
     NEXT_PUBLIC_APPWRITE_PROJECT_ID=<your_appwrite_project_id>
     ```
4. Run the development server:
   ```bash
   yarn dev
   # OR
   npm run dev
   ```
5. Open the application in your browser at `http://localhost:3000`.

---

## Future Plans
- Integrate Trax for shipment handling.
- Add advanced analytics for user behavior tracking.
- Expand product categories and promotional features.

---
