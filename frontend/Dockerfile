# frontend/Dockerfile

# Use an official Node.js image based on Debian
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose port 5173 for Vite
EXPOSE 5173

# Start the frontend development server
CMD ["npm", "run", "dev", "--", "--host"]
