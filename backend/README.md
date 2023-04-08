# Backend

This site uses [Supabase](https://supabase.com/) for authentication and storage. No additional backend is necessary.

The project supabase site is located [here](https://app.supabase.com/project/ndiwftxorygotvnblwbg).

## Authentication

Supabase is used to do OAuth login with GitHub and Google.

GitHub Oauth was setup using [these](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) instructions; [see app here](https://github.com/settings/applications/1960145). Owned by `mdzhang`

Google Oauth was setup using [these](https://developers.google.com/identity/protocols/oauth2) instructions; [see app here](https://console.cloud.google.com/apis/credentials?project=burns-depression). Owned by <mailto:zhang.michelle.d@gmail.com>.

Oauth app Client ID and Secret are then added to the [supabase authentication settings page](https://app.supabase.com/project/ndiwftxorygotvnblwbg/auth/settings).

## Storage

Supabase is also used for data storage.

It can be explored using [Retool](https://retool.com/). See [here](https://amisad.retool.com/editor/56b73190-0e0b-11ed-bc13-9b7b1b94e78e).

Retool is connected to Supabase using a Postgres connection and the connection string [here](https://app.supabase.com/project/ndiwftxorygotvnblwbg/settings/database).

The [`pg_cron` extension](https://supabase.com/docs/guides/database/extensions/pgcron) is enabled.

## Secrets

After setting up the CLI, you can see these:

`$ npx supabase secrets list`

## Edge Functions

An edge function `keepalive` is used to ping the app so it is not automatically paused in the case of prolonged inactivity on the site. It is hit using a scheduled task via the database & `pg_cron`.

To deploy: `make deploy`
To hit: `make keepalive`
  - before this, set your `BEARER_TOKEN` environment variable to the Supabase secret `SUPABASE_ANON_KEY` 's value

## Development

1. Setup Supabase CLI
  ```sh
  $ npm install
  $ npx supabase login
  $ npx supabase init
  $ npx supabase link --project-ref ndiwftxorygotvnblwbg
  ```
