FROM node:24-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

FROM node:24-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Grant node user write permissions to the working directory for log file rotation
RUN chown node:node /usr/src/app

COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node package.json app.js ./
COPY --chown=node:node src ./src

USER node
RUN touch app.log

EXPOSE 4000 5000

# Health check using built-in Node HTTP client to avoid curl dependency in Alpine
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "const port=process.env.NODE_PORT||5000; const key=(process.env.VALID_KEYS||'').split(',')[0]||''; const req=require('http').get({host:'127.0.0.1',port:port,path:'/api',headers:{'authv1':key}},r=>process.exit(r.statusCode===200?0:1));req.on('error',()=>process.exit(1));"

CMD ["node", "app.js"]