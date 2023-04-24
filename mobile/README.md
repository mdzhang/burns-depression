# Mobile

The mobile app is build using React Native and Expo.

## Development

- Start the frontend at <http://dev.amisad.com> by following the [top level README](../README.md)
- Install the [Expo Go](https://expo.dev/client) app on your phone
- Start a tunnel with `cloudflared`:
  ```sh
  $ cloudflared tunnel --url http://localhost:80
  ```
- Set `uri` to be the tunnel e.g. `'https://se-likes-folders-resort.trycloudflare.com'` in `App.tsx`
- Start Expo on your host with `yarn start`
- Use the Expo Go app to scan the resulting QR code
  - _NB_: ensure all ad blockers, private DNS, etc. are disabled on your phone first!