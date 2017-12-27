# Readable

This app is for the "Readable" project that is part of the Udacity React Nano-degree course.

## Get Started

Install the app dependencies

```sh
npm install
```

And then start the app up

```sh
npm start
```

## Server

By default, the app uses a copy of the provided [project server](https://github.com/udacity/reactnd-project-readable-starter) hosted on [`now`](https://zeit.co/now), but the server's base URL can easily be customized by specifying a different environment variable if needed.

```sh
REACT_API_BASE_URL=http://path-to-your-server:3001 npm start
```

### Running the Local Server

If you want to run the app against a local copy of the API server, you can easily do that as well.

The repository for the provided project server can be found at: https://github.com/udacity/reactnd-project-readable-starter

Either download a copy of the repository to your local machine or clone the repo with:

```sh
git clone https://github.com/udacity/reactnd-project-readable-starter
```

Once you have the repository on your local machine, you simply need to browse to the repo's `api-server` directory,install the dependencies and start the server with the following commands:

* Browse to correct directory

```sh
cd reactnd-project-readable-starter/api-server
```

* Install dependencies

```sh
npm install
```

* Start the node server

```sh
node server
```

By default the running server will be available at `http://localhost:3001`.

> PS. If running your own server instance, remember to set the correct environment variable when starting up the frontend app.

```sh
REACT_API_BASE_URL=http://localhost:3001 npm start
```

---

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
