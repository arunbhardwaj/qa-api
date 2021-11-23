FROM node:lts-alpine
# ENV NODE_ENV=production
WORKDIR /usr/src/app
# COPY --chown=node:/usr/src/app ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
# COPY --chown=node:/usr/src/app . .
COPY . .
ENV PORT=3000
EXPOSE 3000
# RUN chown -R node /usr/src/app
# USER node
# CMD ["nodemon", "./server/index.js"]
CMD ["npm", "run", "server-dev"]