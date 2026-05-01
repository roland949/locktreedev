

# LocktreeDev

LocktreeDev focuses on developing websites that improve existing products and processes.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

You need to have **Node.js** and **npm** installed on your machine.

- [Node.js](https://nodejs.org/) (v20 or higher recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/locktreedev/locktreedev.git
   cd locktreedev
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Development

This project uses Tailwind CSS v4. To compile the CSS and prepare the production build, use the following commands:

- **Production Build (with versioning):**
  ```bash
  npm run build
  ```
  This command generates a `dist` folder containing the production-ready `index.html` and versioned assets (CSS, JS, images).

- **Watch for changes (recommended during development):**
  ```bash
  npm run dev
  ```

> **Note:** The `dist` folder is automatically generated and ignored by git. The build process includes a versioning script that updates the asset references in `dist/index.html`.

### Running the Project

For development, you can view the site by simply opening the source `index.html` file in your preferred web browser:

```bash
open index.html # On macOS
```

For production testing, open the file in the `dist` folder after running the build:

```bash
open dist/index.html
```

Alternatively, you can use a local development server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code or any other static file server.
