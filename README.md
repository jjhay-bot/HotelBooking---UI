# Hotel Booking System Web Application

## Project Repositories

- **Frontend (UI):** [https://github.com/jjhay-bot/HotelBooking---UI](https://github.com/jjhay-bot/HotelBooking---UI)
- **Backend (API):** [https://github.com/jjhay-bot/HotelBokingAPI](https://github.com/jjhay-bot/HotelBokingAPI)

## Deployed URLs

- **API Health Endpoint:** [https://hotelbookingapi-bpfkd9d4amdhbea9.southeastasia-01.azurewebsites.net/health](https://hotelbookingapi-bpfkd9d4amdhbea9.southeastasia-01.azurewebsites.net/health)
- **Frontend (UI):** [https://bedderdeals.fun-at.work/](https://bedderdeals.fun-at.work/)

## Developer Notes

- Install **[Run on save]([https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave]())** (optional)

  - This will auto-generate index files for `constants`, `pages` and `hooks`
- **Alias Configuration**:

  - `@/`: This alias maps to the `src/` directory.
  - `@pages`: This alias maps to the `src/pages/` directory. Example: `import Home from '@pages/Home';`
  - When adding new files or directories, ensure that imports use the `@/` alias for consistency.
  - To update or add new aliases, modify `vite.config.js` and `jsconfig.json`.

### `src` Folder Structure:

- `assets`: Static assets like CSS, images, and fonts.
- `components`: Reusable UI components used across different parts of the application.
- `constants`: Application-wide constant values.
- `data`: Contains API service definitions and data fetching logic.
- `hooks`: Custom React hooks for encapsulating reusable stateful logic.
- `pages`: Top-level components representing different views or routes of the application.
- `routes`: Defines the application's routing configuration.
- `store`: Manages the application's global state (e.g., using Redux, Zustand, or Context API).
- `utils`: Utility functions and helper modules.

<!-- ====== INITIAL PROJECT SETUP ====== -->

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [pnpm](https://pnpm.io/) (install via `npm install -g pnpm`)

### Install dependencies
```sh
pnpm install
```

### Run the development server
```sh
pnpm dev
```

### Build for production
```sh
pnpm build
```

### Run tests (if available)
```sh
pnpm test
```

## See Also
- [Project Overview](./project-overview.md)
- [Future Improvements & Security Progress](./future-improvements%20%5Bsecurity%5D/auth_cookie_migration.md)
- [Input Sanitization & Validation](./future-improvements%20%5Bsecurity%5D/sanitation_validation.md)
- [Authentication Usage](./future-improvements%20%5Bsecurity%5D/AUTH_USAGE.md)

For more details, see the documentation above.
