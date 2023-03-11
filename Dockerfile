FROM node:18


# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./

RUN yarn add

# Copy app source code
COPY . .

# Build app
ENTRYPOINT [ "yarn", "run", "start:dev" ]

EXPOSE 8080