# Use an official Node.js runtime as the base image for the client build
FROM --platform=linux/amd64 node:20-slim AS client-builder

# Set the working directory in the client builder container
WORKDIR /app

# Copy the client-side package.json and package-lock.json to the client builder container
COPY /package*.json ./

# Install client application dependencies
RUN npm install

# Copy the client application source code to the client builder container
COPY ./ ./

# Build the client-side code
RUN npm run build

COPY --from=client-builder /app/client/docs /app/server/wwwroot
