FROM postgres:12.9-alpine
# ENV NODE_ENV=production

WORKDIR /app
# RUN apk update
# RUN apk add postgresql
COPY . .
# RUN psql -U postgres TODO: have it import and run script schema file.
# But first figure out how to enter into the postgres without prompts?
# ENV PORT=5432
# EXPOSE 5432
# RUN chown -R node /app # Learn more about other fixes for permission issues
# USER postgres
# RUN psql -U postgres qa -f /app/schema.sql
# CMD ["postgres"]
