# Library Management System - Frontend

A modern, responsive web application for managing library operations including book management, user authentication, and analytics dashboard.

## 🚀 Features

- **User Authentication** - Secure login system with JWT authentication
- **Book Management** - Add, view, and manage library books
- **Dashboard Analytics** - Visual analytics and activity tracking
- **Responsive Design** - Mobile-friendly interface
- **Real-time Updates** - Dynamic content updates

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type-safe code
- **Vite** - Fast build tool and dev server
- **React Context API** - State management
- **CSS3** - Styling

## 📁 Project Structure

```
src/
├── api/              # API integration layer
│   ├── AuthApi.ts    # Authentication endpoints
│   └── BooksApi.ts   # Books CRUD endpoints
├── Components/       # Reusable UI components
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Modal.tsx
│   ├── Navbar.tsx
│   └── Sidebar.tsx
├── context/          # React Context providers
│   └── AuthContext.tsx
├── pages/            # Application pages
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   └── Dashboard/    # Dashboard sub-sections
│       ├── ActivitySection.tsx
│       ├── AddBookSection.tsx
│       ├── AnalyticsSection.tsx
│       └── BooksSection.tsx
├── types/            # TypeScript type definitions
│   ├── api.ts
│   ├── auth.ts
│   └── book.ts
└── assets/           # Static assets
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Library_man_System_frontend/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_endpoint
```

### API Integration

API services are located in the `src/api/` directory. Update the base URL and endpoints according to your backend configuration.

## 🏗️ Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📝 Type Safety

This project uses TypeScript for type safety. Type definitions are organized in the `src/types/` directory:

- `api.ts` - API response types
- `auth.ts` - Authentication types
- `book.ts` - Book model types

## 🎨 Styling

The project uses CSS modules and custom CSS. Main styles are in:

- `App.css` - Application-level styles
- `index.css` - Global styles

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Built with React + TypeScript + Vite
- Icons and assets from respective sources
