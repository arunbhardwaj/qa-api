FROM node:latest
# ENV NODE_ENV=production
WORKDIR /usr/src/app
# COPY --chown=node:/usr/src/app ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
# COPY --chown=node:/usr/src/app . .
COPY . .
ENV PORT=3000
ENV PGUSER=postgres
ENV PGPASSWORD=password
ENV PGHOST='ec2-18-208-115-250.compute-1.amazonaws.com'
ENV PGDATABASE=postgres
ENV PGPORT=5432
# RUN chown -R node /usr/src/app
# USER node
# CMD ["nodemon", "./server/index.js"]
CMD ["npm", "run", "server-dev"]