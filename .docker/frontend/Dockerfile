ARG BUILDPLATFORM=arm64
FROM --platform=$BUILDPLATFORM node:20-alpine AS frontend-dev

WORKDIR /app
EXPOSE 3000

# Skip npm install if node_modules exists.
CMD \[ -d "node_modules" \] && npm run dev || npm install && npm run dev

ARG BUILDPLATFORM=arm64
FROM --platform=$BUILDPLATFORM node:20-alpine AS frontend-build


WORKDIR /app

COPY frontend/package.json /app/package.json
COPY frontend/package-lock.json /app/package-lock.json
RUN npm install

COPY frontend /app
RUN npm run build

ARG BUILDPLATFORM=arm64
FROM --platform=$BUILDPLATFORM node:20-alpine AS frontend

WORKDIR /app

ENV NODE_ENV=production

COPY --from=frontend-build /app/package.json /app/package.json
COPY --from=frontend-build /app/package-lock.json /app/package-lock.json
RUN npm install --omit=dev

COPY --from=frontend-build /app/build/server /app/build/server
COPY --from=frontend-build /app/build/client /app/build/client

ENV NODE_ENV=production
CMD ["npm", "run", "start"]
