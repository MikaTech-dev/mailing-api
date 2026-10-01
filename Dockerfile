# ==============================================================================
# Stage 1: Dependency Installation
# ==============================================================================
FROM node:24-alpine AS deps

WORKDIR /usr/src/app

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install production-only dependencies and clean npm cache to save space
RUN npm ci --omit=dev --ignore-scripts && \
    npm cache clean --force

# ==============================================================================
# Stage 2: Minimal Production Runtime
# ==============================================================================
FROM node:24-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Ensure workspace ownership so log4js can write app.log as non-root user
RUN chown -R node:node /usr/src/app

# Copy production artifacts with non-root ownership
COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node package.json ./
COPY --chown=node:node app.js ./
COPY --chown=node:node src ./src

# Run as non-privileged user for security
USER node

# Expose API ports (configurable at runtime via NODE_PORT)
EXPOSE 4000 5000

# Dynamic health check using built-in node HTTP client (no extra packages needed)
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "const port=process.env.NODE_PORT||5000; const key=(process.env.VALID_KEYS||'').split(',')[0]||''; const req=require('http').get({host:'127.0.0.1',port:port,path:'/api',headers:{'authv1':key}},r=>process.exit(r.statusCode===200?0:1));req.on('error',()=>process.exit(1));"

CMD ["node", "app.js"]