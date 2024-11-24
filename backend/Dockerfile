# user official node version
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose port 5000 for the backend
EXPOSE 5000

# Set environment variables (adjust as needed)
ENV PORT=5000

# Start the backend server
CMD ["npm", "run", "start"]