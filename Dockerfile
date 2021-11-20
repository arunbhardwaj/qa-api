FROM node:lts-alpine
# ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --chown=node:/usr/src/app ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY --chown=node:/usr/src/app . .
ENV PORT=3000
EXPOSE 3000
# RUN chown -R node /usr/src/app
USER node
CMD ["node", "server/index.js"]
