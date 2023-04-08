--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.2 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: heartbeats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.heartbeats (
    "timestamp" timestamp with time zone NOT NULL
);


ALTER TABLE public.heartbeats OWNER TO postgres;

--
-- Name: quiz_results; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_results (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    result jsonb,
    user_id uuid NOT NULL
);


ALTER TABLE public.quiz_results OWNER TO postgres;

--
-- Name: quiz_results_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_results_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quiz_results_id_seq OWNER TO postgres;

--
-- Name: quiz_results_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_results_id_seq OWNED BY public.quiz_results.id;


--
-- Name: quiz_results id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_results ALTER COLUMN id SET DEFAULT nextval('public.quiz_results_id_seq'::regclass);


--
-- Name: heartbeats heartbeats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heartbeats
    ADD CONSTRAINT heartbeats_pkey PRIMARY KEY ("timestamp");


--
-- Name: quiz_results quiz_results_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_results
    ADD CONSTRAINT quiz_results_pkey PRIMARY KEY (id);


--
-- Name: quiz_results; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

--
-- Name: quiz_results user_update_own_quiz_results; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY user_update_own_quiz_results ON public.quiz_results USING ((auth.uid() = user_id));


--
-- PostgreSQL database dump complete
--

