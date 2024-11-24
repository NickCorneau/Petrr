# user official node version
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your frontend code
COPY . .

# Expose port 5173 for Vite dev server
EXPOSE 5173

# Start the frontend development server
CMD ["npm", "run", "dev", "--", "--host"]