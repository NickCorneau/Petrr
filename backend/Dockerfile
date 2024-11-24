
# FROM node:18-bullseye

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npx tsc

# EXPOSE 5000

# CMD ["node", "dist/index.js"]


# backend/Dockerfile

# Use Node.js as the base image
FROM node:18-bullseye

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies, including devDependencies
RUN npm install

# Install ts-node-dev globally (optional, for better CLI handling)
RUN npm install -g ts-node-dev

# Copy the rest of the backend code
COPY . .

# Expose the backend port
EXPOSE 5000

# Run the application using ts-node-dev for hot reloading
CMD ["ts-node-dev", "--respawn", "--transpile-only", "src/index.ts"]
