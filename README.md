# Dharma Offline

The offline build keeps the game interface and rules, bundles its images and fonts into one HTML file, and runs the existing two-player local game without a server or internet connection.

## Build the standalone game

1. Install Node.js.
2. From this folder, run `npm install`.
3. Run `npm run build:offline`.
4. Open `dist-offline/index.html` in a browser. You can also copy that single HTML file to another computer and open it there.

The first dependency install requires internet access. Once the offline HTML has been built, the game itself does not.
