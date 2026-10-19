# Step 2 — React + Node (Next.js) packaged as one image.
# Build:  docker build -t todo-lab:0.2 .
# Run:    docker run --rm -p 8090:8090 -v todo-lab-data:/app/data todo-lab:0.2

FROM node:20-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8090
ENV HOSTNAME=0.0.0.0

RUN mkdir -p /app/data

# Next.js standalone output: minimal Node server
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 8090
CMD ["node", "server.js"]
