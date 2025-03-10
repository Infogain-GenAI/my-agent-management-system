--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: aiden1; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA aiden1;


ALTER SCHEMA aiden1 OWNER TO postgres;

--
-- Name: capability; Type: TYPE; Schema: aiden1; Owner: postgres
--

CREATE TYPE aiden1.capability AS ENUM (
    'CAPABILITY_1',
    'CAPABILITY_2',
    'CAPABILITY_3',
    'CAPABILITY_4'
);


ALTER TYPE aiden1.capability OWNER TO postgres;

--
-- Name: domain_type; Type: TYPE; Schema: aiden1; Owner: postgres
--

CREATE TYPE aiden1.domain_type AS ENUM (
    'SOFTWARE_DEVELOPMENT',
    'CLOUD_OPERATIONS',
    'DEVOPS',
    'SECURITY',
    'DATA_ENGINEERING',
    'HUMAN_RESOURCES',
    'FINANCE',
    'IT_SUPPORT'
);


ALTER TYPE aiden1.domain_type OWNER TO postgres;

--
-- Name: feature; Type: TYPE; Schema: aiden1; Owner: postgres
--

CREATE TYPE aiden1.feature AS ENUM (
    'FEATURE_1',
    'FEATURE_2',
    'FEATURE_3',
    'FEATURE_4'
);


ALTER TYPE aiden1.feature OWNER TO postgres;

--
-- Name: integration_type; Type: TYPE; Schema: aiden1; Owner: postgres
--

CREATE TYPE aiden1.integration_type AS ENUM (
    'SDK',
    'API',
    'NATIVE'
);


ALTER TYPE aiden1.integration_type OWNER TO postgres;

--
-- Name: provider_agent_type; Type: TYPE; Schema: aiden1; Owner: postgres
--

CREATE TYPE aiden1.provider_agent_type AS ENUM (
    'PLANNER',
    'EXECUTOR',
    'REVIEWER',
    'ASSISTANT',
    'CUSTOM_FLOWS',
    'CODER',
    'VALIDATOR',
    'WORKER',
    'MANAGER',
    'SPECIALIST',
    'CUSTOM',
    'PRE_BUILT',
    'ENTERPRISE_ASSISTANT',
    'PROCESS_AUTOMATION',
    'CUSTOM_AGENTS',
    'PRE_BUILT_SOLUTIONS'
);


ALTER TYPE aiden1.provider_agent_type OWNER TO postgres;

--
-- Name: provider_type; Type: TYPE; Schema: aiden1; Owner: postgres
--

CREATE TYPE aiden1.provider_type AS ENUM (
    'FRAMEWORKS',
    'PLATFORMS'
);


ALTER TYPE aiden1.provider_type OWNER TO postgres;

--
-- Name: role; Type: TYPE; Schema: aiden1; Owner: postgres
--

CREATE TYPE aiden1.role AS ENUM (
    'PLATFORM_ADMIN',
    'PROJECT_ADMIN',
    'SUPPORT',
    'USER'
);


ALTER TYPE aiden1.role OWNER TO postgres;

--
-- Name: status; Type: TYPE; Schema: aiden1; Owner: postgres
--

CREATE TYPE aiden1.status AS ENUM (
    'ACTIVE',
    'OFFLINE',
    'MAINTENANCE',
    'PENDING',
    'ERROR',
    'ONLINE'
);


ALTER TYPE aiden1.status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: agent; Type: TABLE; Schema: aiden1; Owner: postgres
--

CREATE TABLE aiden1.agent (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    status aiden1.status DEFAULT 'OFFLINE'::aiden1.status NOT NULL,
    capabilities aiden1.capability[],
    features aiden1.feature[],
    config jsonb,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    provider_id text NOT NULL,
    persona_id text NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE aiden1.agent OWNER TO postgres;

--
-- Name: domain; Type: TABLE; Schema: aiden1; Owner: postgres
--

CREATE TABLE aiden1.domain (
    id text NOT NULL,
    name text NOT NULL,
    type aiden1.domain_type NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE aiden1.domain OWNER TO postgres;

--
-- Name: domain_agent; Type: TABLE; Schema: aiden1; Owner: postgres
--

CREATE TABLE aiden1.domain_agent (
    domain_id text NOT NULL,
    agent_id text NOT NULL
);


ALTER TABLE aiden1.domain_agent OWNER TO postgres;

--
-- Name: metric; Type: TABLE; Schema: aiden1; Owner: postgres
--

CREATE TABLE aiden1.metric (
    id text NOT NULL,
    agent_id text,
    provider_id text,
    domain_id text,
    persona_id text,
    user_id text,
    metric_type text NOT NULL,
    metric_value double precision NOT NULL,
    unit text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE aiden1.metric OWNER TO postgres;

--
-- Name: persona; Type: TABLE; Schema: aiden1; Owner: postgres
--

CREATE TABLE aiden1.persona (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE aiden1.persona OWNER TO postgres;

--
-- Name: provider; Type: TABLE; Schema: aiden1; Owner: postgres
--

CREATE TABLE aiden1.provider (
    id text NOT NULL,
    name text NOT NULL,
    type aiden1.provider_type NOT NULL,
    description text,
    status aiden1.status DEFAULT 'OFFLINE'::aiden1.status NOT NULL,
    features aiden1.feature[],
    agent_types aiden1.provider_agent_type[],
    integration aiden1.integration_type[],
    config jsonb,
    logo_link text,
    doc_link text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE aiden1.provider OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: aiden1; Owner: postgres
--

CREATE TABLE aiden1."user" (
    id text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    role aiden1.role DEFAULT 'USER'::aiden1.role NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE aiden1."user" OWNER TO postgres;

--
-- Name: user_agent; Type: TABLE; Schema: aiden1; Owner: postgres
--

CREATE TABLE aiden1.user_agent (
    user_id text NOT NULL,
    agent_id text NOT NULL
);


ALTER TABLE aiden1.user_agent OWNER TO postgres;

--
-- Name: agent agent_pkey; Type: CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.agent
    ADD CONSTRAINT agent_pkey PRIMARY KEY (id);


--
-- Name: domain_agent domain_agent_pkey; Type: CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.domain_agent
    ADD CONSTRAINT domain_agent_pkey PRIMARY KEY (domain_id, agent_id);


--
-- Name: domain domain_pkey; Type: CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.domain
    ADD CONSTRAINT domain_pkey PRIMARY KEY (id);


--
-- Name: metric metric_pkey; Type: CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.metric
    ADD CONSTRAINT metric_pkey PRIMARY KEY (id);


--
-- Name: persona persona_pkey; Type: CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.persona
    ADD CONSTRAINT persona_pkey PRIMARY KEY (id);


--
-- Name: provider provider_pkey; Type: CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.provider
    ADD CONSTRAINT provider_pkey PRIMARY KEY (id);


--
-- Name: user_agent user_agent_pkey; Type: CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.user_agent
    ADD CONSTRAINT user_agent_pkey PRIMARY KEY (user_id, agent_id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: agent_name_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX agent_name_idx ON aiden1.agent USING btree (name);


--
-- Name: agent_persona_id_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX agent_persona_id_idx ON aiden1.agent USING btree (persona_id);


--
-- Name: agent_provider_id_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX agent_provider_id_idx ON aiden1.agent USING btree (provider_id);


--
-- Name: agent_status_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX agent_status_idx ON aiden1.agent USING btree (status);


--
-- Name: agent_user_id_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX agent_user_id_idx ON aiden1.agent USING btree (user_id);


--
-- Name: domain_name_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX domain_name_idx ON aiden1.domain USING btree (name);


--
-- Name: domain_type_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX domain_type_idx ON aiden1.domain USING btree (type);


--
-- Name: metric_agent_id_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX metric_agent_id_idx ON aiden1.metric USING btree (agent_id);


--
-- Name: metric_domain_id_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX metric_domain_id_idx ON aiden1.metric USING btree (domain_id);


--
-- Name: metric_persona_id_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX metric_persona_id_idx ON aiden1.metric USING btree (persona_id);


--
-- Name: metric_provider_id_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX metric_provider_id_idx ON aiden1.metric USING btree (provider_id);


--
-- Name: metric_user_id_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX metric_user_id_idx ON aiden1.metric USING btree (user_id);


--
-- Name: persona_name_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX persona_name_idx ON aiden1.persona USING btree (name);


--
-- Name: provider_name_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX provider_name_idx ON aiden1.provider USING btree (name);


--
-- Name: provider_type_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX provider_type_idx ON aiden1.provider USING btree (type);


--
-- Name: user_email_idx; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE INDEX user_email_idx ON aiden1."user" USING btree (email);


--
-- Name: user_email_key; Type: INDEX; Schema: aiden1; Owner: postgres
--

CREATE UNIQUE INDEX user_email_key ON aiden1."user" USING btree (email);


--
-- Name: agent agent_persona_id_fkey; Type: FK CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.agent
    ADD CONSTRAINT agent_persona_id_fkey FOREIGN KEY (persona_id) REFERENCES aiden1.persona(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: agent agent_provider_id_fkey; Type: FK CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.agent
    ADD CONSTRAINT agent_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES aiden1.provider(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: domain_agent domain_agent_agent_id_fkey; Type: FK CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.domain_agent
    ADD CONSTRAINT domain_agent_agent_id_fkey FOREIGN KEY (agent_id) REFERENCES aiden1.agent(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: domain_agent domain_agent_domain_id_fkey; Type: FK CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.domain_agent
    ADD CONSTRAINT domain_agent_domain_id_fkey FOREIGN KEY (domain_id) REFERENCES aiden1.domain(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: metric metric_agent_id_fkey; Type: FK CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.metric
    ADD CONSTRAINT metric_agent_id_fkey FOREIGN KEY (agent_id) REFERENCES aiden1.agent(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: metric metric_domain_id_fkey; Type: FK CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.metric
    ADD CONSTRAINT metric_domain_id_fkey FOREIGN KEY (domain_id) REFERENCES aiden1.domain(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: metric metric_persona_id_fkey; Type: FK CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.metric
    ADD CONSTRAINT metric_persona_id_fkey FOREIGN KEY (persona_id) REFERENCES aiden1.persona(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: metric metric_provider_id_fkey; Type: FK CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.metric
    ADD CONSTRAINT metric_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES aiden1.provider(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: metric metric_user_id_fkey; Type: FK CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.metric
    ADD CONSTRAINT metric_user_id_fkey FOREIGN KEY (user_id) REFERENCES aiden1."user"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_agent user_agent_agent_id_fkey; Type: FK CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.user_agent
    ADD CONSTRAINT user_agent_agent_id_fkey FOREIGN KEY (agent_id) REFERENCES aiden1.agent(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_agent user_agent_user_id_fkey; Type: FK CONSTRAINT; Schema: aiden1; Owner: postgres
--

ALTER TABLE ONLY aiden1.user_agent
    ADD CONSTRAINT user_agent_user_id_fkey FOREIGN KEY (user_id) REFERENCES aiden1."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

