# Mobile

The mobile app is built using [React Native](https://reactnative.dev/) and [Expo](https://expo.dev/). It currently only renders a `WebView` of the same app accessed via a mobile browser.

## Development

- Start the frontend at <http://dev.amisad.com> by following the [top level README](../README.md)
- Install the [Expo Go](https://expo.dev/client) app on your phone
- Start a tunnel with `cloudflared`:
  ```sh
  $ cloudflared tunnel --url http://localhost:80
  ```
- Setup dotenv files
  ```sh
  cp .envrc.example .envrc
  # replace xxx with your tunnel's top level domain
  ```
- Start Expo on your host with `yarn start`
- Use the Expo Go app to scan the resulting QR code && navigate to the app
  - _NB_: ensure all ad blockers, private DNS, etc. are disabled on your phone first!

## Releasing

Releases are managed via GitHub Actions && Expo automatically.

To manually release:

1. Install EAS and initialize the project
    ```sh
    $ npm install --global eas-cli
    # see Supabase secrets for value of EAS_PROJECT_ID
    $ eas init --id $EAS_PROJECT_ID
    $ eas build --non-interactive --platform=android
    ```
