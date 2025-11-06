# 24h Stories App

A React application for creating and viewing 24-hour stories, similar to Instagram Stories. Stories are stored locally using IndexedDB and automatically expire after 24 hours.

## Features

- **Add Stories**: Upload images to create new stories via a simple file input.
- **View Stories**: Click on story thumbnails to open in a full-screen modal.
- **Auto-Advance**: Stories automatically progress every 3 seconds with a smooth progress bar.
- **Navigation**: Use previous/next buttons to manually navigate between stories.
- **Delete Stories**: Remove stories directly from the viewer modal.
- **Auto-Cleanup**: Stories older than 23 hours are automatically deleted to maintain the 24-hour limit.
- **Responsive Design**: Built with TailwindCSS and DaisyUI for a clean, modern UI.

Try Demo : [24h-stories](https://24h-stories-mprs8jm8q-hirmaans-projects.vercel.app/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/duckuments/24-stories.git
   cd 24-stories
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal).

## Usage

1. **Adding a Story**:
   - Click the "+" button to upload an image file.
   - The image will be added as a new story thumbnail.

2. **Viewing Stories**:
   - Click on any story thumbnail to open it in the modal viewer.
   - Stories will auto-advance every 3 seconds.
   - Use the left/right arrow buttons to navigate manually.
   - Click the delete button (trash icon) to remove the current story.

3. **Story Management**:
   - Stories are persisted in the browser's IndexedDB.
   - Old stories (older than 23 hours) are automatically cleaned up.

## Technologies

- **React 19**: For building the user interface.
- **Vite**: Fast build tool and development server.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **DaisyUI**: Component library built on TailwindCSS.
- **IndexedDB**: Browser-based database for local storage of stories.

## Project Structure

```
src/
├── components/
│   ├── AddButton.jsx    # Component for adding new stories
│   └── Stories.jsx      # Main stories viewer and modal
├── data/
│   └── useData.js       # Custom hook for IndexedDB operations
├── App.jsx              # Main app component
├── index.css            # Global styles
└── main.jsx             # Entry point
```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint for code quality checks.
- `npm run preview`: Preview the production build.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

---

This project is a challenge from [roadmap.sh](https://roadmap.sh/projects/stories-feature).

