deploy:
	npx supabase functions deploy keepalive

keepalive:
	curl -i --location --request POST 'https://ndiwftxorygotvnblwbg.functions.supabase.co/keepalive' \
		--header "Authorization: Bearer ${BEARER_TOKEN}" \
		--header 'Content-Type: application/json'

redump:
	# limit to public schema, ignore privileges, dump schema only
	pg_dump -s -x -h db.ndiwftxorygotvnblwbg.supabase.co -p 5432 -d postgres -U postgres --schema=public > schema.sql
