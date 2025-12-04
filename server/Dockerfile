# Use Node 22 base image (non-Alpine is easier for native packages)
FROM node:22

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock (if present) and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of your app source
COPY . .

# Set default environment variable (can be overridden at runtime)
ENV PORT=8080

# Expose the port the app listens on
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
