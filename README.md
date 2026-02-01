# Home Server Dashboard

A modern, lightweight, and customizable dashboard for your home server services. Built with Node.js and vanilla JavaScript, featuring a sleek "Glassmorphism" black theme.

## 🚀 Features

-   **Glassmorphism UI:** Modern black theme with frosted glass effects and smooth animations.
-   **Categories:** Organize your services into logical groups (e.g., Networking, Media, Smart Home).
-   **Status Indicators:** Live monitoring of your services (Green = Online, Red = Offline). Automatically handles self-signed SSL certificates and redirects.
-   **Drag & Drop:** Reorder your cards and move them between categories directly in the UI.
-   **Smart Icons:** Automatically fetches icons for popular home server apps. Manual overrides supported via the edit menu.
-   **Docker Ready:** Easy deployment with Docker and Docker Compose.
-   **Persistent Storage:** All your links and categories are saved in a simple `data.json` file.

## 🛠️ Tech Stack

-   **Backend:** Node.js, Express
-   **Frontend:** HTML5, CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript
-   **Libraries:** [SortableJS](https://sortablejs.github.io/Sortable/) (served locally)
-   **Icons:** [Dashboard Icons](https://github.com/walkxcode/dashboard-icons) CDN

## 📥 Installation

### Option 1: Docker (Recommended)

1.  Clone this repository.
2.  Ensure `data.json` exists in the root directory (to avoid Docker mounting it as a folder).
3.  Run:
    ```bash
    sudo docker compose up -d --build
    ```
4.  Access the dashboard at `http://your-server-ip`.

### Option 2: Local Development

1.  Install Node.js (v18+ recommended).
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    node server.js
    ```
4.  Access the dashboard at `http://localhost:3000`.

## ⚙️ Customization

### Adding/Editing Links
Click the **Edit** button in the top right to enter edit mode. You can then:
-   Add new services.
-   Click the ✎ icon to edit an existing service.
-   Drag cards to reorder or change categories.
-   Click the ✕ icon to delete.

### Icon Overrides
When adding or editing a service, you can specify an **Icon Name**. The dashboard uses the [walkxcode/dashboard-icons](https://github.com/walkxcode/dashboard-icons) library. 
Examples: `plex`, `home-assistant`, `pi-hole`, `fritzbox`, `immich`.

## 📝 License

This project is open-source and available under the ISC License.

---
*This project was built with 🤖 **Gemini CLI**.*
