# Step 1: Use Node official image
FROM node:22-alpine

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy all backend source code to container
COPY . .

# Step 5: Expose backend port
EXPOSE 8080

# Step 6: Start the server
CMD ["npm", "start"]
