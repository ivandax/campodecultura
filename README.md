# Campo de Cultura

A multilingual cultural content platform where users can create, share, and discover posts. Built with modern web technologies and Firebase backend.

## Features

- **User Authentication** - Secure signup/login with email verification and password recovery
- **Post Management** - Create, edit, and publish rich-text posts with formatting
- **User Profiles** - View and manage personal posts and profile information
- **Internationalization** - Full support for English and Spanish (i18n)
- **Responsive Design** - Accessible and mobile-friendly interface

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Styled Components
- **Routing**: React Router v6
- **State Management**: Zustand
- **Backend**: Firebase (Auth, Firestore, Hosting)
- **Rich Text**: React Quill
- **i18n**: react-i18next
- **Testing**: Vitest, React Testing Library

## Getting Started

```bash
# Install dependencies
yarn install

# Run development server
yarn dev
# App runs at http://localhost:5173/

# Run tests
yarn test

# Build for production
yarn build
```

## Deployment

```bash
firebase deploy --only hosting
```
