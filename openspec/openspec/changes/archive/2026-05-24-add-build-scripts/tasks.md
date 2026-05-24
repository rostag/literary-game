## 1. Root Package Scripts

- [x] 1.1 Add `build` script to root package.json — builds both server and client via concurrently
- [x] 1.2 Add `start` script to root package.json — runs compiled server in production mode

## 2. Server Production Mode

- [x] 2.1 Configure Express to serve built client static files from `client/dist/` when `NODE_ENV=production`
- [x] 2.2 Add catch-all route to serve `client/dist/index.html` for client-side routing in production

## 3. Documentation

- [x] 3.1 Add "Build & Run" section to DEVELOPMENT.md with `npm run build` and `npm run start` instructions

## 4. Verify

- [x] 4.1 Run `npm run build` from root and confirm both server and client build successfully
- [x] 4.2 Run `npm run start` and confirm the app works at http://localhost:3001
