# Stage 1: Base image using Node.js Alpine for minimal footprint
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Copy package files first for caching layers
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy application source code
COPY src/ ./src/

# Expose default port
EXPOSE 3000

# Use non-root node user for security
USER node

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "src/index.js"]
