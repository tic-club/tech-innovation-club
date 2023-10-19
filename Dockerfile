# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Build the Prisma schema and generate Prisma Client
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Start the Next.js app
CMD ["npm", "start"]
