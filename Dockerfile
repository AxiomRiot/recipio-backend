# Official Node JS runtime image
FROM node:16

# Port to run app on
ENV PORT=3000

# Set the working directory
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]