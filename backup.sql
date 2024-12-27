--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Postgres.app)
-- Dumped by pg_dump version 16.4 (Postgres.app)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: journalentries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.journalentries (
    id integer NOT NULL,
    userid integer NOT NULL,
    content text NOT NULL,
    analysis text,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.journalentries OWNER TO postgres;

--
-- Name: journal_test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.journal_test (
)
INHERITS (public.journalentries);


ALTER TABLE public.journal_test OWNER TO postgres;

--
-- Name: journalentries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.journalentries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.journalentries_id_seq OWNER TO postgres;

--
-- Name: journalentries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.journalentries_id_seq OWNED BY public.journalentries.id;


--
-- Name: quotes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quotes (
    id integer NOT NULL,
    text text NOT NULL,
    author character varying(255),
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.quotes OWNER TO postgres;

--
-- Name: quotes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quotes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quotes_id_seq OWNER TO postgres;

--
-- Name: quotes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quotes_id_seq OWNED BY public.quotes.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255),
    currentstreak integer DEFAULT 0,
    lastentrydate date
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: journal_test id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journal_test ALTER COLUMN id SET DEFAULT nextval('public.journalentries_id_seq'::regclass);


--
-- Name: journal_test createdat; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journal_test ALTER COLUMN createdat SET DEFAULT CURRENT_TIMESTAMP;


--
-- Name: journalentries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journalentries ALTER COLUMN id SET DEFAULT nextval('public.journalentries_id_seq'::regclass);


--
-- Name: quotes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotes ALTER COLUMN id SET DEFAULT nextval('public.quotes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: journal_test; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.journal_test (id, userid, content, analysis, createdat) FROM stdin;
\.


--
-- Data for Name: journalentries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.journalentries (id, userid, content, analysis, createdat) FROM stdin;
\.


--
-- Data for Name: quotes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quotes (id, text, author, createdat) FROM stdin;
1	The unexamined life is not worth living.	Socrates	2024-12-24 21:47:25.685456
2	I think, therefore I am.	René Descartes	2024-12-24 21:47:25.685456
3	Happiness is not an ideal of reason, but of imagination.	Immanuel Kant	2024-12-24 21:47:25.685456
4	That which does not kill us makes us stronger.	Friedrich Nietzsche	2024-12-24 21:47:25.685456
5	Man is the measure of all things.	Protagoras	2024-12-24 21:47:25.685456
6	Life must be understood backward. But it must be lived forward.	Søren Kierkegaard	2024-12-24 21:47:25.685456
7	The only thing I know is that I know nothing.	Socrates	2024-12-24 21:47:25.685456
8	Hell is other people.	Jean-Paul Sartre	2024-12-24 21:47:25.685456
9	To be is to be perceived.	George Berkeley	2024-12-24 21:47:25.685456
10	The greatest happiness of the greatest number is the foundation of morals and legislation.	Jeremy Bentham	2024-12-24 21:47:25.685456
11	Freedom is nothing else but a chance to be better.	Albert Camus	2024-12-24 21:47:25.685456
12	Liberty consists in doing what one desires.	John Stuart Mill	2024-12-24 21:47:25.685456
13	Happiness depends upon ourselves.	Aristotle	2024-12-24 21:47:25.685456
14	The life of man is solitary, poor, nasty, brutish, and short.	Thomas Hobbes	2024-12-24 21:47:25.685456
15	We are what we repeatedly do. Excellence, then, is not an act, but a habit.	Aristotle	2024-12-24 21:47:25.685456
16	Man is condemned to be free.	Jean-Paul Sartre	2024-12-24 21:47:25.685456
17	I can control my passions and emotions if I can understand their nature.	Spinoza	2024-12-24 21:47:25.685456
18	All men by nature desire to know.	Aristotle	2024-12-24 21:47:25.685456
19	Leisure is the mother of philosophy.	Thomas Hobbes	2024-12-24 21:47:25.685456
20	Happiness is the highest good.	Aristotle	2024-12-24 21:47:25.685456
21	We live as we dream – alone.	Joseph Conrad	2024-12-24 21:47:25.685456
22	He who has a why to live can bear almost any how.	Friedrich Nietzsche	2024-12-24 21:47:25.685456
23	It is not length of life, but depth of life.	Ralph Waldo Emerson	2024-12-24 21:47:25.685456
24	Knowledge is power.	Francis Bacon	2024-12-24 21:47:25.685456
25	An ounce of action is worth a ton of theory.	Friedrich Engels	2024-12-24 21:47:25.685456
26	Man is the only creature who refuses to be what he is.	Albert Camus	2024-12-24 21:47:25.685456
27	It is not what happens to you, but how you react to it that matters.	Epictetus	2024-12-24 21:47:25.685456
28	Truth is ever to be found in simplicity, and not in the multiplicity and confusion of things.	Isaac Newton	2024-12-24 21:47:25.685456
29	The only true wisdom is in knowing you know nothing.	Socrates	2024-12-24 21:47:25.685456
30	We must be willing to let go of the life we planned so as to have the life that is waiting for us.	Joseph Campbell	2024-12-24 21:47:25.685456
31	What is rational is actual and what is actual is rational.	Georg Wilhelm Friedrich Hegel	2024-12-24 21:47:25.685456
32	Morality is not the doctrine of how we may make ourselves happy, but how we may make ourselves worthy of happiness.	Immanuel Kant	2024-12-24 21:47:25.685456
33	The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.	Ralph Waldo Emerson	2024-12-24 21:47:25.685456
34	Even while they teach, men learn.	Seneca	2024-12-24 21:47:25.685456
35	Science is organized knowledge. Wisdom is organized life.	Immanuel Kant	2024-12-24 21:47:25.685456
36	Nothing is so painful to the human mind as a great and sudden change.	Mary Shelley	2024-12-24 21:47:25.685456
37	Happiness is not something ready made. It comes from your own actions.	Dalai Lama	2024-12-24 21:47:25.685456
38	No man’s knowledge here can go beyond his experience.	John Locke	2024-12-24 21:47:25.685456
39	The more a man knows, the more he forgives.	Catherine the Great	2024-12-24 21:47:25.685456
40	The mind is everything. What you think you become.	Buddha	2024-12-24 21:47:25.685456
41	We do not act rightly because we have virtue or excellence, but we rather have those because we have acted rightly.	Aristotle	2024-12-24 21:47:25.685456
42	I would rather have questions that can’t be answered than answers that can’t be questioned.	Richard Feynman	2024-12-24 21:47:25.685456
43	Happiness lies in virtuous activity, and perfect happiness lies in the best activity, which is contemplative.	Aristotle	2024-12-24 21:47:25.685456
44	No great mind has ever existed without a touch of madness.	Aristotle	2024-12-24 21:47:25.685456
45	Do not go where the path may lead, go instead where there is no path and leave a trail.	Ralph Waldo Emerson	2024-12-24 21:47:25.685456
46	Man is the measure of all things.	Protagoras	2024-12-24 21:47:25.685456
47	Philosophy is a battle against the bewitchment of our intelligence by means of language.	Ludwig Wittgenstein	2024-12-24 21:47:25.685456
48	We are all in the gutter, but some of us are looking at the stars.	Oscar Wilde	2024-12-24 21:47:25.685456
49	Happiness is the meaning and the purpose of life, the whole aim and end of human existence.	Aristotle	2024-12-24 21:47:25.685456
50	Love is composed of a single soul inhabiting two bodies.	Aristotle	2024-12-24 21:47:25.685456
51	The price good men pay for indifference to public affairs is to be ruled by evil men.	Plato	2024-12-24 21:47:25.685456
52	God is dead! He remains dead! And we have killed him.	Friedrich Nietzsche	2024-12-24 21:47:25.685456
53	I count him braver who overcomes his desires than him who conquers his enemies; for the hardest victory is over self.	Aristotle	2024-12-24 21:47:25.685456
54	The mind is its own place and in itself, can make a Heaven of Hell, a Hell of Heaven.	John Milton	2024-12-24 21:47:25.685456
55	Happiness resides not in possessions, and not in gold, happiness dwells in the soul.	Democritus	2024-12-24 21:47:25.685456
56	I never teach my pupils, I only attempt to provide the conditions in which they can learn.	Albert Einstein	2024-12-24 21:47:25.685456
57	To live is to suffer, to survive is to find some meaning in the suffering.	Friedrich Nietzsche	2024-12-24 21:47:25.685456
58	The world is full of magical things patiently waiting for our wits to grow sharper.	Bertrand Russell	2024-12-24 21:47:25.685456
59	If you want to build a ship, don’t drum up people to collect wood and don’t assign them tasks and work, but rather teach them to long for the endless immensity of the sea.	Antoine de Saint-Exupéry	2024-12-24 21:47:25.685456
60	Man is free at the instant he wants to be.	Voltaire	2024-12-24 21:47:25.685456
61	The only journey is the one within.	Rainer Maria Rilke	2024-12-24 21:47:25.685456
62	Happiness is when what you think, what you say, and what you do are in harmony.	Mahatma Gandhi	2024-12-24 21:47:25.685456
63	What you do makes a difference, and you have to decide what kind of difference you want to make.	Jane Goodall	2024-12-24 21:47:25.685456
64	The way to get started is to quit talking and begin doing.	Walt Disney	2024-12-24 21:47:25.685456
65	Without music, life would be a mistake.	Friedrich Nietzsche	2024-12-24 21:47:25.685456
66	Not life, but good life, is to be chiefly valued.	Socrates	2024-12-24 21:47:25.685456
67	Everything should be made as simple as possible, but not simpler.	Albert Einstein	2024-12-24 21:47:25.685456
68	You must be the change you wish to see in the world.	Mahatma Gandhi	2024-12-24 21:47:25.685456
69	The journey of a thousand miles begins with one step.	Lao Tzu	2024-12-24 21:47:25.685456
70	What you leave behind is not what is engraved in stone monuments, but what is woven into the lives of others.	Pericles	2024-12-24 21:47:25.685456
71	Education is the most powerful weapon which you can use to change the world.	Nelson Mandela	2024-12-24 21:47:25.685456
72	Do what you can, with what you have, where you are.	Theodore Roosevelt	2024-12-24 21:47:25.685456
73	Success is not final, failure is not fatal: it is the courage to continue that counts.	Winston Churchill	2024-12-24 21:47:25.685456
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password_hash, currentstreak, lastentrydate) FROM stdin;
1	Aryan Kumar	ajaj@gmail.com	$2a$10$jkpwoOMByAwIVsIWU6JsEeQXecXkuM8owV2yeRR6fDYdyW1R63FDm	0	\N
2	Test User	test@example.com	$2a$10$/IkdwfaXT67sFYK5FvA/W.L6giWrbcZGClpIwEQHk87UK9H/FbtJW	0	\N
3	John Doe	njnj@gmail.com	$2a$10$U0k367krh1qQDwK36RGqteWA6lA5ordJtXHXCUXW7/kwhWQQlFwWu	0	\N
\.


--
-- Name: journalentries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.journalentries_id_seq', 42, true);


--
-- Name: quotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quotes_id_seq', 73, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: journalentries journalentries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journalentries
    ADD CONSTRAINT journalentries_pkey PRIMARY KEY (id);


--
-- Name: quotes quotes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotes
    ADD CONSTRAINT quotes_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: journalentries journalentries_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journalentries
    ADD CONSTRAINT journalentries_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

