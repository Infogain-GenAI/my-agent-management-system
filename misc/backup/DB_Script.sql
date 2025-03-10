-- DROP SCHEMA aiden1;

CREATE SCHEMA aiden1 AUTHORIZATION postgres;

-- DROP TYPE aiden1.agent;

CREATE TYPE aiden1.agent AS (
	id text,
	"name" text,
	description text,
	"status" status,
	capabilities _capability,
	features _feature,
	config jsonb,
	created_at timestamp,
	updated_at timestamp,
	provider_id text,
	persona_id text,
	user_id text);

-- DROP TYPE aiden1."capability";

CREATE TYPE aiden1."capability" AS ENUM (
	'CAPABILITY_1',
	'CAPABILITY_2',
	'CAPABILITY_3',
	'CAPABILITY_4');

-- DROP TYPE aiden1."domain";

CREATE TYPE aiden1."domain" AS (
	id text,
	"name" text,
	"type" domain_type,
	created_at timestamp,
	updated_at timestamp);

-- DROP TYPE aiden1.domain_agent;

CREATE TYPE aiden1.domain_agent AS (
	domain_id text,
	agent_id text);

-- DROP TYPE aiden1."domain_type";

CREATE TYPE aiden1."domain_type" AS ENUM (
	'SOFTWARE_DEVELOPMENT',
	'CLOUD_OPERATIONS',
	'DEVOPS',
	'SECURITY',
	'DATA_ENGINEERING',
	'HUMAN_RESOURCES',
	'FINANCE',
	'IT_SUPPORT');

-- DROP TYPE aiden1."feature";

CREATE TYPE aiden1."feature" AS ENUM (
	'FEATURE_1',
	'FEATURE_2',
	'FEATURE_3',
	'FEATURE_4');

-- DROP TYPE aiden1."integration_type";

CREATE TYPE aiden1."integration_type" AS ENUM (
	'SDK',
	'API',
	'NATIVE');

-- DROP TYPE aiden1.metric;

CREATE TYPE aiden1.metric AS (
	id text,
	agent_id text,
	provider_id text,
	domain_id text,
	persona_id text,
	user_id text,
	metric_type text,
	metric_value float8,
	unit text,
	created_at timestamp,
	updated_at timestamp);

-- DROP TYPE aiden1.persona;

CREATE TYPE aiden1.persona AS (
	id text,
	"name" text,
	description text,
	created_at timestamp,
	updated_at timestamp);

-- DROP TYPE aiden1.provider;

CREATE TYPE aiden1.provider AS (
	id text,
	"name" text,
	"type" provider_type,
	description text,
	"status" status,
	features _feature,
	agent_types _provider_agent_type,
	integration _integration_type,
	config jsonb,
	logo_link text,
	doc_link text,
	created_at timestamp,
	updated_at timestamp);

-- DROP TYPE aiden1."provider_agent_type";

CREATE TYPE aiden1."provider_agent_type" AS ENUM (
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
	'PRE_BUILT_SOLUTIONS');

-- DROP TYPE aiden1."provider_type";

CREATE TYPE aiden1."provider_type" AS ENUM (
	'FRAMEWORKS',
	'PLATFORMS');

-- DROP TYPE aiden1."role";

CREATE TYPE aiden1."role" AS ENUM (
	'PLATFORM_ADMIN',
	'PROJECT_ADMIN',
	'SUPPORT',
	'USER');

-- DROP TYPE aiden1."status";

CREATE TYPE aiden1."status" AS ENUM (
	'ACTIVE',
	'OFFLINE',
	'MAINTENANCE',
	'PENDING',
	'ERROR',
	'ONLINE');

-- DROP TYPE aiden1."user";

CREATE TYPE aiden1."user" AS (
	id text,
	first_name text,
	last_name text,
	email text,
	"role" role,
	created_at timestamp,
	updated_at timestamp);

-- DROP TYPE aiden1.user_agent;

CREATE TYPE aiden1.user_agent AS (
	user_id text,
	agent_id text);

-- DROP TYPE aiden1."_agent";

CREATE TYPE aiden1."_agent" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 8,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1.agent,
	DELIMITER = ',');

-- DROP TYPE aiden1."_capability";

CREATE TYPE aiden1."_capability" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 4,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1."capability",
	DELIMITER = ',');

-- DROP TYPE aiden1."_domain";

CREATE TYPE aiden1."_domain" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 8,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1."domain",
	DELIMITER = ',');

-- DROP TYPE aiden1."_domain_agent";

CREATE TYPE aiden1."_domain_agent" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 8,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1.domain_agent,
	DELIMITER = ',');

-- DROP TYPE aiden1."_domain_type";

CREATE TYPE aiden1."_domain_type" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 4,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1."domain_type",
	DELIMITER = ',');

-- DROP TYPE aiden1."_feature";

CREATE TYPE aiden1."_feature" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 4,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1."feature",
	DELIMITER = ',');

-- DROP TYPE aiden1."_integration_type";

CREATE TYPE aiden1."_integration_type" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 4,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1."integration_type",
	DELIMITER = ',');

-- DROP TYPE aiden1."_metric";

CREATE TYPE aiden1."_metric" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 8,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1.metric,
	DELIMITER = ',');

-- DROP TYPE aiden1."_persona";

CREATE TYPE aiden1."_persona" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 8,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1.persona,
	DELIMITER = ',');

-- DROP TYPE aiden1."_provider";

CREATE TYPE aiden1."_provider" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 8,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1.provider,
	DELIMITER = ',');

-- DROP TYPE aiden1."_provider_agent_type";

CREATE TYPE aiden1."_provider_agent_type" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 4,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1."provider_agent_type",
	DELIMITER = ',');

-- DROP TYPE aiden1."_provider_type";

CREATE TYPE aiden1."_provider_type" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 4,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1."provider_type",
	DELIMITER = ',');

-- DROP TYPE aiden1."_role";

CREATE TYPE aiden1."_role" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 4,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1."role",
	DELIMITER = ',');

-- DROP TYPE aiden1."_status";

CREATE TYPE aiden1."_status" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 4,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1."status",
	DELIMITER = ',');

-- DROP TYPE aiden1."_user";

CREATE TYPE aiden1."_user" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 8,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1."user",
	DELIMITER = ',');

-- DROP TYPE aiden1."_user_agent";

CREATE TYPE aiden1."_user_agent" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 8,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = aiden1.user_agent,
	DELIMITER = ',');
-- aiden1."domain" definition

-- Drop table

-- DROP TABLE aiden1."domain";

CREATE TABLE aiden1."domain" (
	id text NOT NULL,
	"name" text NOT NULL,
	"type" aiden1."domain_type" NOT NULL,
	created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(3) NOT NULL,
	CONSTRAINT domain_pkey PRIMARY KEY (id)
);
CREATE INDEX domain_name_idx ON aiden1.domain USING btree (name);
CREATE INDEX domain_type_idx ON aiden1.domain USING btree (type);

-- Permissions

ALTER TABLE aiden1."domain" OWNER TO postgres;
GRANT ALL ON TABLE aiden1."domain" TO postgres;


-- aiden1.persona definition

-- Drop table

-- DROP TABLE aiden1.persona;

CREATE TABLE aiden1.persona (
	id text NOT NULL,
	"name" text NOT NULL,
	description text NOT NULL,
	created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(3) NOT NULL,
	CONSTRAINT persona_pkey PRIMARY KEY (id)
);
CREATE INDEX persona_name_idx ON aiden1.persona USING btree (name);

-- Permissions

ALTER TABLE aiden1.persona OWNER TO postgres;
GRANT ALL ON TABLE aiden1.persona TO postgres;


-- aiden1.provider definition

-- Drop table

-- DROP TABLE aiden1.provider;

CREATE TABLE aiden1.provider (
	id text NOT NULL,
	"name" text NOT NULL,
	"type" aiden1."provider_type" NOT NULL,
	description text NULL,
	"status" aiden1."status" NOT NULL DEFAULT 'OFFLINE'::aiden1.status,
	features aiden1."_feature" NULL,
	agent_types aiden1."_provider_agent_type" NULL,
	integration aiden1."_integration_type" NULL,
	config jsonb NULL,
	logo_link text NULL,
	doc_link text NULL,
	created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(3) NOT NULL,
	CONSTRAINT provider_pkey PRIMARY KEY (id)
);
CREATE INDEX provider_name_idx ON aiden1.provider USING btree (name);
CREATE INDEX provider_type_idx ON aiden1.provider USING btree (type);

-- Permissions

ALTER TABLE aiden1.provider OWNER TO postgres;
GRANT ALL ON TABLE aiden1.provider TO postgres;


-- aiden1."user" definition

-- Drop table

-- DROP TABLE aiden1."user";

CREATE TABLE aiden1."user" (
	id text NOT NULL,
	first_name text NOT NULL,
	last_name text NOT NULL,
	email text NOT NULL,
	"role" aiden1."role" NOT NULL DEFAULT 'USER'::aiden1.role,
	created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(3) NOT NULL,
	CONSTRAINT user_pkey PRIMARY KEY (id)
);
CREATE INDEX user_email_idx ON aiden1."user" USING btree (email);
CREATE UNIQUE INDEX user_email_key ON aiden1."user" USING btree (email);

-- Permissions

ALTER TABLE aiden1."user" OWNER TO postgres;
GRANT ALL ON TABLE aiden1."user" TO postgres;


-- aiden1.agent definition

-- Drop table

-- DROP TABLE aiden1.agent;

CREATE TABLE aiden1.agent (
	id text NOT NULL,
	"name" text NOT NULL,
	description text NULL,
	"status" aiden1."status" NOT NULL DEFAULT 'OFFLINE'::aiden1.status,
	capabilities aiden1."_capability" NULL,
	features aiden1."_feature" NULL,
	config jsonb NULL,
	created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(3) NOT NULL,
	provider_id text NOT NULL,
	persona_id text NOT NULL,
	user_id text NOT NULL,
	CONSTRAINT agent_pkey PRIMARY KEY (id),
	CONSTRAINT agent_persona_id_fkey FOREIGN KEY (persona_id) REFERENCES aiden1.persona(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT agent_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES aiden1.provider(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX agent_name_idx ON aiden1.agent USING btree (name);
CREATE INDEX agent_persona_id_idx ON aiden1.agent USING btree (persona_id);
CREATE INDEX agent_provider_id_idx ON aiden1.agent USING btree (provider_id);
CREATE INDEX agent_status_idx ON aiden1.agent USING btree (status);
CREATE INDEX agent_user_id_idx ON aiden1.agent USING btree (user_id);

-- Permissions

ALTER TABLE aiden1.agent OWNER TO postgres;
GRANT ALL ON TABLE aiden1.agent TO postgres;


-- aiden1.domain_agent definition

-- Drop table

-- DROP TABLE aiden1.domain_agent;

CREATE TABLE aiden1.domain_agent (
	domain_id text NOT NULL,
	agent_id text NOT NULL,
	CONSTRAINT domain_agent_pkey PRIMARY KEY (domain_id, agent_id),
	CONSTRAINT domain_agent_agent_id_fkey FOREIGN KEY (agent_id) REFERENCES aiden1.agent(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT domain_agent_domain_id_fkey FOREIGN KEY (domain_id) REFERENCES aiden1."domain"(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Permissions

ALTER TABLE aiden1.domain_agent OWNER TO postgres;
GRANT ALL ON TABLE aiden1.domain_agent TO postgres;


-- aiden1.metric definition

-- Drop table

-- DROP TABLE aiden1.metric;

CREATE TABLE aiden1.metric (
	id text NOT NULL,
	agent_id text NULL,
	provider_id text NULL,
	domain_id text NULL,
	persona_id text NULL,
	user_id text NULL,
	metric_type text NOT NULL,
	metric_value float8 NOT NULL,
	unit text NOT NULL,
	created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(3) NOT NULL,
	CONSTRAINT metric_pkey PRIMARY KEY (id),
	CONSTRAINT metric_agent_id_fkey FOREIGN KEY (agent_id) REFERENCES aiden1.agent(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT metric_domain_id_fkey FOREIGN KEY (domain_id) REFERENCES aiden1."domain"(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT metric_persona_id_fkey FOREIGN KEY (persona_id) REFERENCES aiden1.persona(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT metric_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES aiden1.provider(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT metric_user_id_fkey FOREIGN KEY (user_id) REFERENCES aiden1."user"(id) ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX metric_agent_id_idx ON aiden1.metric USING btree (agent_id);
CREATE INDEX metric_domain_id_idx ON aiden1.metric USING btree (domain_id);
CREATE INDEX metric_persona_id_idx ON aiden1.metric USING btree (persona_id);
CREATE INDEX metric_provider_id_idx ON aiden1.metric USING btree (provider_id);
CREATE INDEX metric_user_id_idx ON aiden1.metric USING btree (user_id);

-- Permissions

ALTER TABLE aiden1.metric OWNER TO postgres;
GRANT ALL ON TABLE aiden1.metric TO postgres;


-- aiden1.user_agent definition

-- Drop table

-- DROP TABLE aiden1.user_agent;

CREATE TABLE aiden1.user_agent (
	user_id text NOT NULL,
	agent_id text NOT NULL,
	CONSTRAINT user_agent_pkey PRIMARY KEY (user_id, agent_id),
	CONSTRAINT user_agent_agent_id_fkey FOREIGN KEY (agent_id) REFERENCES aiden1.agent(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT user_agent_user_id_fkey FOREIGN KEY (user_id) REFERENCES aiden1."user"(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Permissions

ALTER TABLE aiden1.user_agent OWNER TO postgres;
GRANT ALL ON TABLE aiden1.user_agent TO postgres;




-- Permissions

GRANT ALL ON SCHEMA aiden1 TO postgres;
