# Home Server Dashboard

## Project Overview
A sleek, lightweight home server dashboard with live status monitoring, category grouping, and drag-and-drop customization. It features a modern black Glassmorphism UI and allows full management of local network service links directly from the browser.

**Tech Stack:**
*   **Backend:** Node.js with Express
*   **Frontend:** Vanilla HTML5, CSS3 (Variables, Flexbox, Grid), and JavaScript
*   **Libraries:** SortableJS (served locally) for drag-and-drop
*   **Data Storage:** Local JSON file (`data.json`) for persistence

## Building and Running

### Prerequisites
*   Node.js (v18+ recommended)
*   npm or Docker/Docker Compose

### Local Development
1.  **Install Dependencies:** `npm install`
2.  **Start the Server:** `node server.js`
    *   App runs at `http://localhost:3000`.
    *   Server handles API requests for links and performs status checks (handling SSL/redirects).

### Docker (Recommended for Deployment)
1.  **Start with Docker Compose:** `sudo docker compose up -d --build`
    *   App is exposed on **Port 80**.
    *   The `data.json` file is mounted as a volume for persistence.
    *   Configured with `restart: unless-stopped`.

## Architecture & Features

*   **`server.js`:** 
    *   Serves the `public/` directory.
    *   API `GET /api/links`: Reads the link database.
    *   API `POST /api/links`: Saves the link database (reordering/edits).
    *   API `GET /api/status`: Performs a robust server-side check of target URLs (follows redirects, ignores self-signed SSL).
*   **`public/index.html`:**
    *   Single-file frontend containing all CSS and JS.
    *   Centered header with a floating control group (Edit/Add) in the top right.
    *   Dynamic rendering of cards grouped by Category.
    *   Status dots (Green/Red/Amber) updated asynchronously.
    *   Smart icon logic: Dashboard Icons CDN -> Google Favicon -> Generic Fallback.
*   **`data.json`:** Stores the array of link objects, including name, url, category, and optional icon name.

## Development Conventions
*   **Theming:** Solid black background (`--bg-color: #000000`) with semi-transparent white glassmorphism cards.
*   **Layout:** Responsive grid system using CSS Grid. 
*   **Simplicity:** No build tools or frameworks (React/Vue) to keep deployment instant and overhead minimal.