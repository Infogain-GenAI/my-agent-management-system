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
-- Data for Name: persona; Type: TABLE DATA; Schema: aiden1; Owner: postgres
--

COPY aiden1.persona (id, name, description, created_at, updated_at) FROM stdin;
cm8057876000bqyaszcrn7yhm	Developer	Software Developer	2025-03-08 11:50:04.099	2025-03-08 11:50:04.099
cm805787a000cqyasrnjwfnqx	DevOps Engineer	DevOps Engineer	2025-03-08 11:50:04.102	2025-03-08 11:50:04.102
cm805787b000dqyash3xxv9yp	Security Specialist	Security Specialist	2025-03-08 11:50:04.103	2025-03-08 11:50:04.103
cm805787c000eqyasll5tuk13	Data Engineer	Data Engineer	2025-03-08 11:50:04.105	2025-03-08 11:50:04.105
cm805787f000fqyas4qazxg1j	HR Manager	Human Resources Manager	2025-03-08 11:50:04.108	2025-03-08 11:50:04.108
\.


--
-- Data for Name: provider; Type: TABLE DATA; Schema: aiden1; Owner: postgres
--

COPY aiden1.provider (id, name, type, description, status, features, agent_types, integration, config, logo_link, doc_link, created_at, updated_at) FROM stdin;
cm805786n0002qyasdm98tz9w	AWS	PLATFORMS	Amazon Web Services	ONLINE	{FEATURE_1,FEATURE_2}	{PLANNER,EXECUTOR}	{API}	{"key": "value"}	https://aws.amazon.com/logo.png	https://aws.amazon.com/documentation	2025-03-08 11:50:04.079	2025-03-08 11:50:04.079
cm805786r0003qyasn4seqjcf	Azure	PLATFORMS	Microsoft Azure	ONLINE	{FEATURE_3,FEATURE_4}	{REVIEWER,ASSISTANT}	{SDK}	{"key": "value"}	https://azure.microsoft.com/logo.png	https://azure.microsoft.com/documentation	2025-03-08 11:50:04.084	2025-03-08 11:50:04.084
cm805786t0004qyasouqcjwlu	Google Cloud	PLATFORMS	Google Cloud Platform	ONLINE	{FEATURE_1,FEATURE_3}	{CODER,VALIDATOR}	{NATIVE}	{"key": "value"}	https://cloud.google.com/logo.png	https://cloud.google.com/documentation	2025-03-08 11:50:04.085	2025-03-08 11:50:04.085
cm805786v0005qyaspfjilc3j	Heroku	PLATFORMS	Heroku Cloud Platform	OFFLINE	{FEATURE_2,FEATURE_4}	{WORKER,MANAGER}	{API}	{"key": "value"}	https://heroku.com/logo.png	https://heroku.com/documentation	2025-03-08 11:50:04.087	2025-03-08 11:50:04.087
\.


--
-- Data for Name: agent; Type: TABLE DATA; Schema: aiden1; Owner: postgres
--

COPY aiden1.agent (id, name, description, status, capabilities, features, config, created_at, updated_at, provider_id, persona_id, user_id) FROM stdin;
cm805787h000hqyasawcn6v4t	Agent 1	Agent 1 Description	ACTIVE	{CAPABILITY_1,CAPABILITY_2}	{FEATURE_1,FEATURE_2}	{"key": "value"}	2025-03-08 11:50:04.109	2025-03-08 11:50:04.109	cm805786n0002qyasdm98tz9w	cm8057876000bqyaszcrn7yhm	cm805786f0000qyasuvnbqfo9
cm805787m000jqyas85rutxhs	Agent 2	Agent 2 Description	OFFLINE	{CAPABILITY_3,CAPABILITY_4}	{FEATURE_3,FEATURE_4}	{"key": "value"}	2025-03-08 11:50:04.114	2025-03-08 11:50:04.114	cm805786r0003qyasn4seqjcf	cm805787a000cqyasrnjwfnqx	cm805786f0000qyasuvnbqfo9
cm805787o000lqyasf5t2wnff	Agent 3	Agent 3 Description	MAINTENANCE	{CAPABILITY_1,CAPABILITY_3}	{FEATURE_1,FEATURE_3}	{"key": "value"}	2025-03-08 11:50:04.116	2025-03-08 11:50:04.116	cm805786t0004qyasouqcjwlu	cm805787b000dqyash3xxv9yp	cm805786l0001qyas8fkth595
cm805787q000nqyas2r66h21k	Agent 4	Agent 4 Description	PENDING	{CAPABILITY_2,CAPABILITY_4}	{FEATURE_2,FEATURE_4}	{"key": "value"}	2025-03-08 11:50:04.118	2025-03-08 11:50:04.118	cm805786v0005qyaspfjilc3j	cm805787c000eqyasll5tuk13	cm805786l0001qyas8fkth595
cm805787s000pqyaswswn0ra2	Agent 5	Agent 5 Description	ERROR	{CAPABILITY_1,CAPABILITY_4}	{FEATURE_1,FEATURE_4}	{"key": "value"}	2025-03-08 11:50:04.12	2025-03-08 11:50:04.12	cm805786n0002qyasdm98tz9w	cm805787f000fqyas4qazxg1j	cm805786f0000qyasuvnbqfo9
cm809qt3f0001qyawzbrro21u	Insomnia Agent	Description of the Insomnia agent	ACTIVE	{CAPABILITY_3,CAPABILITY_2}	{FEATURE_2,FEATURE_3}	{"key": "Insomnia value", "api-key": "hsdfashfiasdofif23746320911!@33"}	2025-03-08 13:57:15.849	2025-03-08 13:57:15.849	cm805786n0002qyasdm98tz9w	cm8057876000bqyaszcrn7yhm	cm805786f0000qyasuvnbqfo9
cm809vskf0003qyawqcxw04ld	Insomnia Agent2	Description of the Insomnia agent2	ACTIVE	{CAPABILITY_3,CAPABILITY_2}	{FEATURE_2,FEATURE_3}	{"key": "Insomnia value2", "api-key": "432543536ddddddddddddddd!@33"}	2025-03-08 14:01:08.702	2025-03-08 14:01:08.702	cm805786n0002qyasdm98tz9w	cm8057876000bqyaszcrn7yhm	cm805786f0000qyasuvnbqfo9
cm811bmid0001qyjcijhwpqrn	Insomnia Agent2	Description of the Insomnia agent2	ACTIVE	{CAPABILITY_3,CAPABILITY_2}	{FEATURE_2,FEATURE_3}	{"key": "Insomnia value2", "api-key": "432543536ddddddddddddddd!@33"}	2025-03-09 02:49:16.98	2025-03-09 02:49:16.98	cm805786n0002qyasdm98tz9w	cm8057876000bqyaszcrn7yhm	cm805786f0000qyasuvnbqfo9
cm811wdrc0001qy6cqnszs2cs	Insomnia update Agent	Description of the update Agent	ACTIVE	{CAPABILITY_1,CAPABILITY_3}	{FEATURE_2,FEATURE_4}	{"key": "Insomnia value31", "api-key": "422222ddddddddddd33"}	2025-03-09 03:05:25.415	2025-03-09 03:10:28.284	cm805786n0002qyasdm98tz9w	cm8057876000bqyaszcrn7yhm	cm805786l0001qyas8fkth595
cm81c6yq30001qy5k96ouvjrv	Insomnia new Agent2	Description of the new Agent	ACTIVE	{CAPABILITY_3,CAPABILITY_2}	{FEATURE_2,FEATURE_3}	{"key": "Insomnia value1", "api-key": "432543536sssssddd!@33"}	2025-03-09 07:53:35.304	2025-03-09 07:53:35.304	cm805786n0002qyasdm98tz9w	cm8057876000bqyaszcrn7yhm	cm805786f0000qyasuvnbqfo9
cm81ifpl20000qyz4a0jt7zya	AWS Agent	Description of the AWS Agent	ACTIVE	{CAPABILITY_1,CAPABILITY_2}	{FEATURE_2,FEATURE_3}	{"key": "AWS value1", "aws_api-key": "432543536sssssddd!@33"}	2025-03-09 10:48:21.062	2025-03-09 10:48:21.062	cm805786n0002qyasdm98tz9w	cm8057876000bqyaszcrn7yhm	cm805786f0000qyasuvnbqfo9
cm81igr0t0001qyz4t7yud4yh	AWS Agent	Description of the AWS Agent	ACTIVE	{CAPABILITY_1,CAPABILITY_2}	{FEATURE_2,FEATURE_3}	{"key": "AWS value1", "aws_api-key": "432543536sssssddd!@33"}	2025-03-09 10:49:09.581	2025-03-09 10:49:09.581	cm805786n0002qyasdm98tz9w	cm8057876000bqyaszcrn7yhm	cm805786f0000qyasuvnbqfo9
cm81nl1h60000qyc4sgog7n4g	AWS Agent12	Description of the AWS Agent	ACTIVE	{CAPABILITY_1,CAPABILITY_2}	{FEATURE_2,FEATURE_3}	{"key": "AWS value1", "aws_api-key": "432543536sssssddd!@33"}	2025-03-09 13:12:27.834	2025-03-09 13:12:27.834	cm805786n0002qyasdm98tz9w	cm8057876000bqyaszcrn7yhm	cm805786f0000qyasuvnbqfo9
cm81dbax30001qyao1zzgnqgm	Insomnia update Agent	Description of the update Agent	ACTIVE	{CAPABILITY_1,CAPABILITY_3}	{FEATURE_2,FEATURE_4}	{"key": "Insomnia value31", "api-key": "422222ddddddddddd33"}	2025-03-09 08:24:57.351	2025-03-09 13:12:49.381	cm805786n0002qyasdm98tz9w	cm8057876000bqyaszcrn7yhm	cm805786f0000qyasuvnbqfo9
\.


--
-- Data for Name: domain; Type: TABLE DATA; Schema: aiden1; Owner: postgres
--

COPY aiden1.domain (id, name, type, created_at, updated_at) FROM stdin;
cm805786w0006qyasoxym0rwd	Software Development	SOFTWARE_DEVELOPMENT	2025-03-08 11:50:04.089	2025-03-08 11:50:04.089
cm80578710007qyasoac9ttn3	Cloud Operations	CLOUD_OPERATIONS	2025-03-08 11:50:04.093	2025-03-08 11:50:04.093
cm80578720008qyasxouy3yr4	DevOps	DEVOPS	2025-03-08 11:50:04.094	2025-03-08 11:50:04.094
cm80578730009qyasa9ueuvy8	Security	SECURITY	2025-03-08 11:50:04.096	2025-03-08 11:50:04.096
cm8057875000aqyasxo5tj4yx	Data Engineering	DATA_ENGINEERING	2025-03-08 11:50:04.097	2025-03-08 11:50:04.097
\.


--
-- Data for Name: domain_agent; Type: TABLE DATA; Schema: aiden1; Owner: postgres
--

COPY aiden1.domain_agent (domain_id, agent_id) FROM stdin;
cm805786w0006qyasoxym0rwd	cm805787h000hqyasawcn6v4t
cm80578710007qyasoac9ttn3	cm805787m000jqyas85rutxhs
cm80578720008qyasxouy3yr4	cm805787o000lqyasf5t2wnff
cm80578730009qyasa9ueuvy8	cm805787q000nqyas2r66h21k
cm8057875000aqyasxo5tj4yx	cm805787s000pqyaswswn0ra2
cm80578710007qyasoac9ttn3	cm811bmid0001qyjcijhwpqrn
cm80578710007qyasoac9ttn3	cm811wdrc0001qy6cqnszs2cs
cm80578720008qyasxouy3yr4	cm811wdrc0001qy6cqnszs2cs
cm80578710007qyasoac9ttn3	cm81c6yq30001qy5k96ouvjrv
cm80578710007qyasoac9ttn3	cm81dbax30001qyao1zzgnqgm
cm80578710007qyasoac9ttn3	cm81ifpl20000qyz4a0jt7zya
cm80578710007qyasoac9ttn3	cm81igr0t0001qyz4t7yud4yh
cm80578710007qyasoac9ttn3	cm81nl1h60000qyc4sgog7n4g
cm80578720008qyasxouy3yr4	cm81dbax30001qyao1zzgnqgm
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: aiden1; Owner: postgres
--

COPY aiden1."user" (id, first_name, last_name, email, role, created_at, updated_at) FROM stdin;
cm805786f0000qyasuvnbqfo9	John	Doe	john.doe@example.com	PLATFORM_ADMIN	2025-03-08 11:50:04.072	2025-03-08 11:50:04.072
cm805786l0001qyas8fkth595	Jane	Doe	jane.doe@example.com	PROJECT_ADMIN	2025-03-08 11:50:04.077	2025-03-08 11:50:04.077
\.


--
-- Data for Name: metric; Type: TABLE DATA; Schema: aiden1; Owner: postgres
--

COPY aiden1.metric (id, agent_id, provider_id, domain_id, persona_id, user_id, metric_type, metric_value, unit, created_at, updated_at) FROM stdin;
cm8057884000qqyas40f5vtjw	cm805787h000hqyasawcn6v4t	\N	\N	\N	\N	CPU	75.5	%	2025-03-08 11:50:04.132	2025-03-08 11:50:04.132
cm8057884000rqyaslz9ag584	cm805787m000jqyas85rutxhs	\N	\N	\N	\N	Memory	60.2	%	2025-03-08 11:50:04.132	2025-03-08 11:50:04.132
cm8057884000sqyasqfb0l7h7	cm805787o000lqyasf5t2wnff	\N	\N	\N	\N	Disk	80.1	%	2025-03-08 11:50:04.132	2025-03-08 11:50:04.132
cm8057884000tqyashnaaoawd	cm805787q000nqyas2r66h21k	\N	\N	\N	\N	Network	50.3	Mbps	2025-03-08 11:50:04.132	2025-03-08 11:50:04.132
cm8057884000uqyas4a2mhmh7	cm805787s000pqyaswswn0ra2	\N	\N	\N	\N	CPU	65.4	%	2025-03-08 11:50:04.132	2025-03-08 11:50:04.132
cm8057884000vqyas8uovkobx	cm805787h000hqyasawcn6v4t	\N	\N	\N	\N	Memory	70.8	%	2025-03-08 11:50:04.132	2025-03-08 11:50:04.132
cm8057884000wqyasuj4nstf5	cm805787m000jqyas85rutxhs	\N	\N	\N	\N	Disk	90	%	2025-03-08 11:50:04.132	2025-03-08 11:50:04.132
cm8057884000xqyasrel7zh8x	cm805787o000lqyasf5t2wnff	\N	\N	\N	\N	Network	40.5	Mbps	2025-03-08 11:50:04.132	2025-03-08 11:50:04.132
cm8057884000yqyasiu57o389	cm805787q000nqyas2r66h21k	\N	\N	\N	\N	CPU	55.6	%	2025-03-08 11:50:04.132	2025-03-08 11:50:04.132
cm8057884000zqyas0oocddta	cm805787s000pqyaswswn0ra2	\N	\N	\N	\N	Memory	75.9	%	2025-03-08 11:50:04.132	2025-03-08 11:50:04.132
\.


--
-- Data for Name: user_agent; Type: TABLE DATA; Schema: aiden1; Owner: postgres
--

COPY aiden1.user_agent (user_id, agent_id) FROM stdin;
cm805786f0000qyasuvnbqfo9	cm805787h000hqyasawcn6v4t
cm805786f0000qyasuvnbqfo9	cm805787m000jqyas85rutxhs
cm805786l0001qyas8fkth595	cm805787o000lqyasf5t2wnff
cm805786l0001qyas8fkth595	cm805787q000nqyas2r66h21k
cm805786f0000qyasuvnbqfo9	cm805787s000pqyaswswn0ra2
cm805786f0000qyasuvnbqfo9	cm811wdrc0001qy6cqnszs2cs
cm805786l0001qyas8fkth595	cm811wdrc0001qy6cqnszs2cs
cm805786f0000qyasuvnbqfo9	cm81c6yq30001qy5k96ouvjrv
cm805786f0000qyasuvnbqfo9	cm81ifpl20000qyz4a0jt7zya
cm805786f0000qyasuvnbqfo9	cm81igr0t0001qyz4t7yud4yh
cm805786f0000qyasuvnbqfo9	cm81nl1h60000qyc4sgog7n4g
cm805786f0000qyasuvnbqfo9	cm81dbax30001qyao1zzgnqgm
\.


--
-- PostgreSQL database dump complete
--

