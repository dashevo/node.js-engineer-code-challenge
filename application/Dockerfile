FROM node:carbon-alpine

LABEL maintainer="Dash Developers <dev@dash.org>"
LABEL description="DashDrive Node.JS"

# Install dependencies first, in a different location
# for easier app bind mounting for local development
WORKDIR /

# Install packages
COPY package.json package-lock.json ./
RUN npm install
ENV PATH /node_modules/.bin:$PATH

# Copy project files
WORKDIR /usr/src/app
COPY . /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

EXPOSE 9229

CMD ["npm", "start"]
