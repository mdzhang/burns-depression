# Frontend

## Development

Install [`node]`(https://nodejs.org/en/) v18+ e.g. using [`anyenv`](https://github.com/anyenv/anyenv) & [`nodenv`](https://github.com/nodenv/nodenv)

```sh
# ensure you're in the frontend/ directory and have recently `git pull`'d
$ brew install anyenv
$ anyenv init
$ anyenv install --init
$ anyenv install nodenv
$ nodenv rehash
$ nodenv install 18.2.0
$ nodenv global 18.2.0
$ npm install -g yarn
$ yarn install
```

Install [packages](https://www.npmjs.com/) with `yarn install`

Start the site in development mode with `yarn start`

* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
* The page will reload if you make edits.
* You will also see any lint errors in the console.

### Testing

Run [Jest](https://jestjs.io/) tests with `yarn test`

### Serving statically

```sh
# Builds the app for production to the `build` folder.\
# It correctly bundles React in production mode and optimizes the build for the best performance.

# The build is minified and the filenames include the hashes.\
$ yarn build
$ yarn global add serve
$ serve -s build
```