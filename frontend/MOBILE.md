# Mobile

1. Follow [Capacitor Environment Setup](https://capacitorjs.com/docs/getting-started/environment-setup)

```sh
# build web app
$ yarn run build
# build mobile apps
$ npx cap add android
$ xcode-select --install
$ sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
$ ionic capacitor add ios
$ npx cap add ios
# copy web assets to mobile
$ npx cap sync
# open and view
$ npx cap open ios
```
