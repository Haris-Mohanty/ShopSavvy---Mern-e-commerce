# # Step 1: Use Node image to build the React app
# FROM node:22 AS build

# # Set working directory inside container
# WORKDIR /app

# # Copy package files first (for faster caching)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy all frontend source code
# COPY . .

# # Build the React app for production
# RUN npm run build

# # Step 2: Use NGINX image to serve the build files
# FROM nginx:latest

# # Copy the build output to NGINX's public folder
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 3000 (or 80 — your choice)
# EXPOSE 3000

# # Start NGINX server
# CMD ["nginx", "-g", "daemon off;"]



# Build stage
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:22

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
