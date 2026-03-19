FROM node:24-slim
WORKDIR /usr/src/app

#Install deps
COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install

# Bundle app source
COPY . .

# None root user for security
USER node

# Expose ports
EXPOSE 4000
EXPOSE 5000
EXPOSE 2525
EXPOSE 587
EXPOSE 465


# Run app
CMD ["npm", "start"]