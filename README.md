## System Requirements

MacOS, Windows (including WSL), and Linux are supported.

If on MacOS, make sure to have Xcode installed and updated.

[Node.js 10.13](https://nodejs.org/en/) or later is required.

## Other Requirements

To run this app (successfully) you need to have an API key from [themoviedb](https://www.themoviedb.org/documentation/api).

## Getting Started

First, run:

```bash
yarn
# or
npm install
```

to install dependencies.

## Config File

At the root of the project there is a config.json file. In it you should see

```javascript
{
    "apiKey": ""
}
```

add your api key from [themoviedb](https://www.themoviedb.org/documentation/api).

## Running Dev environment

then, run:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the movie search app!