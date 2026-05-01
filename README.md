

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

This project uses Tailwind CSS v4. To compile the CSS, use the following commands:

- **Build once (with versioning):**
  ```bash
  npm run build
  ```

- **Watch for changes (recommended during development):**
  ```bash
  npm run dev
  ```

> **Note:** The compiled CSS files in `assets/css/` are automatically generated and are ignored by git. The build process includes a versioning script that updates the CSS reference in `index.html`.

### Running the Project

Since this is a static site, you can view it by simply opening the `index.html` file in your preferred web browser:

```bash
open index.html # On macOS
```

Alternatively, you can use a local development server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code or any other static file server.
