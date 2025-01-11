
# Conventions for Next.js 14 TypeScript Project

This document outlines the conventions to follow when developing with Next.js 14 and TypeScript in this project. Adhering to these guidelines will help maintain consistency and improve collaboration among team members.

## Project Structure

```
/project-root
|-- /public              # Static files like images and icons
|-- /src                 # Main source code
| |-- /app               # Next.js 14 app routing system
| | |-- /api             # API routes
| | |-- /(routes)        # App routes and layouts
| |-- /components        # Reusable React components
| |-- /constants         # Constants
| |-- /lib               # Util fns, custom hooks, shared logic
| |-- /styles            # Global styles
| |-- /types             # TypeScript types and interfaces
| `-- /tests             # Unit and integration tests
|-- /e2e                 # End-to-end tests
|-- .env                 # Environment variables
|-- .env.local           # Local environment variables (git ignored)
|-- next-env.d.ts        # Next.js TypeScript declarations
|-- next.config.mjs      # Next.js configuration (using ES modules)
|-- tsconfig.json        # TypeScript configuration
|-- package.json         # Project dependencies and scripts
|-- CONVENTIONS.md       # This file
`-- README.md            # Project overview and setup instructions
```

## Naming Conventions

### File and Folder Names

- Use `PascalCase` for components (e.g., `Button.tsx`, `UserProfile.tsx`).
- Use `camelCase` for utility functions, custom hooks, and other non-component files (e.g., `useCustomHook.ts`, `formatDate.ts`).
- Use `kebab-case` for route folders in the app directory (e.g., `user-profile`).
- Keep file names descriptive and relevant to their content.

### Components

- Each component should reside in its own folder within `/src/components`, with styles and tests located there as well:

```
/src/components/Button/
|-- Button.tsx
|-- Button.module.css
`-- Button.test.tsx
```

  

### App Router (Next.js 14)

- Use the new app directory structure for routing.
- Create route folders using `kebab-case` (e.g., `/src/app/user-profile`).
- Use `page.tsx` for the main component of a route.
- Use `layout.tsx` for shared layouts.
- Use `loading.tsx` for loading states.
- Use `error.tsx` for error boundaries.

## Coding Style

### TypeScript

- Use TypeScript for all `.ts` and `.tsx` files.
- Define types and interfaces in separate files within the `/src/types` directory or co-located with the components that use them.
- Use `interface` for objects and `type` for union types, function signatures, or when you need to use intersection types.
- Prefer explicit typing over `any`. Use `unknown` for values of unknown type that require type checking before use.

### Props and State

- Always type props and state in components:

```tsx
interface ButtonProps {
    label: string
    onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return <button onClick={onClick}>{label}</button>
}
```

### General JavaScript/TypeScript

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with TypeScript adjustments.
- Use `const` and `let`; avoid `var`.
- Prefer arrow functions for functional components and callbacks.

### React and JSX/TSX

- Use functional components with hooks instead of class components.
- Use self-closing tags for empty elements.
- Keep JSX and TSX indentation consistent (2 spaces).
- Use de-structuring for props in components.

## State Management

- Use React's built-in state (`useState`, `useReducer`) and context (useCo`ntext) for local and shared state management.
- For more complex state, consider using libraries like Zustand or Jotai, which work well with React Server Components.

## Data Fetching

- Utilize Next.js 14's server components for data fetching where possible.
- Use the new `use` hook for client-side data fetching when necessary.
- Organize API calls in the `/src/lib` directory.
- Use `async/await` for handling asynchronous operations.

## Testing

- Use Jest and React Testing Library for unit and integration tests.
- Use Playwright or Cypress for end-to-end testing.
- Organize unit and integration tests alongside the components they test.
- Place e2e tests in the `/e2e` directory.

## Environment Variables

- Define environment variables in `.env.local` for local development (git ignored).
- Use `.env` for default values and documentation of required environment variables.
- Use `NEXT_PUBLIC_` prefix only for variables that need to be exposed to the browser.

## Documentation

- Document complex components, hooks, and utilities with JSDoc comments.
- Maintain a comprehensive `README.md` with setup instructions and project details.

## Git Conventions

- Use meaningful commit messages, following the format: `type(scope): subject`.
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

  

## Branching Strategy

- Use `main` for production-ready code.
- Use feature branches prefixed with `feature/` for new features and `bugfix/` for bug fixes.
- Consider using `develop` as an integration branch before merging to `main`.

  

## Performance Considerations

- Utilize Next.js 14 features like React Server Components, streaming, and partial prerendering for optimal performance.
- Implement proper code splitting using dynamic imports where necessary.
- Use Image component from Next.js for optimized image loading.

  
Remember to keep this document updated as new best practices emerge or as the project's needs evolve.