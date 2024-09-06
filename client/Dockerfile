# Get a node image
FROM node:22.8-alpine3.19

# Set the working directory that the rest of the frontend will run on 
WORKDIR /app

# Copy the package.json file now
COPY package*.json .

# Install all the dependencies
RUN npm ci

# Copy all the source code
COPY . . 

# The port on which the frontend will run
EXPOSE 5173

CMD ["npm","run","dev","--","--host"]
