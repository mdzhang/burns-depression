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

The [`pg_cron` extension](https://supabase.com/docs/guides/database/extensions/pgcron) is enabled.

It can be explored using [Retool](https://retool.com/). See [here](https://amisad.retool.com/editor/56b73190-0e0b-11ed-bc13-9b7b1b94e78e).

Retool is connected to Supabase using a Postgres connection and the connection string [here](https://app.supabase.com/project/ndiwftxorygotvnblwbg/settings/database).
