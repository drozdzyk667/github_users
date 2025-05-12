# GitHub Users Search App

A simple React application for searching GitHub users via the public GitHub Search API, built with:

- **React 19** + **TypeScript**
- **React Query** for fetching
- **React Hook Form** + **Yup** for form state and validation
- **MUI (Material-UI)** for components and styling
- **react-infinite-scroll-hook** for infinite scrolling

## Features

- **Debounced search**: waits 2 seconds after typing stops before querying
- **Infinite scroll**: loads additional pages as you scroll down
- **Form validation**: requires at least 3 characters; schema defined with Yup
- **Username truncation** with ellipsis and tooltip on hover for full name
- **Error handling**:
  - **API rate limits (403)**: handle with retry suggestion
  - **Other errors**: shows inline error cards with a "Try again" button

## Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run in development mode**

   ```bash
   npm start
   ```

4. **Open website**
   ```bash
   http://localhost:3000
   ```

## Project structure

```bash
src/
├── hooks/ # Custom React Query hooks (useGithubUsers)
├── common/
│ └── components/ # Common components like scroll to the top
├── modules/
│ └── UsersView/
    │ ├── api/ # GitHub API fetchers & error handling
    │ ├── helpers/ # matchers, types & validations
    │ └── components/ # UI components
├── App.tsx # Root component (ThemeProvider & QueryProvider)
└── index.tsx # React entry point
```
