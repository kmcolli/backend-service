# Stage 1
FROM node:alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

# # Expose the port the app runs in
EXPOSE 8080

# Serve the app
CMD ["npm", "start"]

# # Stage 2
# FROM nginx:1.17.1-alpine
# COPY --from=build-step /app/dist /usr/share/nginx/html
