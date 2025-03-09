# My Agent Management System

## My sample test app with Next.js and Prisma

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

#### Step 1: Set Up the Next.js Project

```bash
npx create-next-app@latest my-agent-management-system
cd my-agent-management-system
npm install prisma @prisma/client
npx prisma init
```

Update the `DATABASE_URL` in `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

#### Step 2: Define the Prisma Schema

```bash
npx prisma db push  # if experimenting
npx prisma generate
npx prisma migrate dev --name init
```

Create a `.env` file and add the following:

```env
DATABASE_URL="postgresql://<user>:<password>@<localhost>:<5432>/<database>?schema=<schema>"
```

See Prisma Schema and seed file in the `prisma` folder. The API is in `src/pages/api/agent/index.ts`.

#### Run the Development Server

```bash
npm install
npx prisma validate  # for validating Prisma schema before running
npx prisma db push  # to push the DB scripts to create DB tables in a schema as mentioned in .env
npm run dev
```

### Initial Check

Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.

### API Call to See All Agents

Use Postman or a browser to access:

[http://localhost:3000/api/agent?page=1&limit=10&sort=name](http://localhost:3000/api/agent?page=1&limit=10&sort=name)

### To Run Docker

#### Docker Compose with PostgreSQL

```bash
docker-compose up --build
docker-compose exec app npm run seed
```

#### Build and Run the Docker Container

Create a `docker-compose.yml` file with the following content:

```yaml
version: '3.8'

services:
    app:
        build: .
        restart: always
        environment:
            DATABASE_URL: postgres://<user>:<password>@<host>:<port>/<database>?schema=<schema>
        ports:
            - "3000:3000"
```

Then save and run:

```bash
docker-compose up --build
docker-compose exec app npm run seed
```
## My sample test app with nextjs and prisma 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started


I created using the following commands
Step 1: Set Up the Next.js Project
npx create-next-app@latest my-agent-management-system
cd my-agent-management-system

npm install prisma @prisma/client
npx prisma init

update the DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public" in .env 

Step 2: Define the Prisma Schema in  prisma/schema.prisma

npx prisma db push  if experimenting or 

npx prisma generate
npx prisma migrate dev --name init


Create a .env

add the 
DATABASE_URL="postgresql://<user>:<passwrd>@<localhost>:<5432>/<database>?schema=<schema>"

See Prisma Schema and seed file is in Prisma folder 

API is in  src\pages\api\agent\index.ts

Run the development server:

```bash
    npm install
    npx prisma validate  #for validating prisma schema before running 
    npx prisma db push  #to push the db scripts to create Db tables in a schema as mentioned in .env
    npm run dev

```
#### initial check 
Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.

#### API call to see all agents In a post man or in browzer 
http://localhost:3000/api/agent?page=1&limit=10&sort=name 
 


Get all agents (GET)

```bash
curl -X GET "http://localhost:3000/api/agent?page=1&limit=10&sort=name"

```

Get an agent by ID (GET)
```bash
 curl -X GET "http://localhost:3000/api/agent?id=agent-id"
 
```
Create a new agent (POST)

```bash
curl -X POST "http://localhost:3000/api/agent" -H "Content-Type: application/json" -d '{
  "name": "New Agent",
  "description": "Description of the new agent",
  "status": "ACTIVE",
  "capabilities": ["CAPABILITY_1", "CAPABILITY_2"],
  "features": ["FEATURE_1", "FEATURE_2"],
  "config": {"key": "value"},
  "provider_id": "provider-id",
  "persona_id": "persona-id",
  "user_id": "user-id"
}'

```
Update an existing agent (PUT)

```bash
curl -X PUT "http://localhost:3000/api/agent" -H "Content-Type: application/json" -d '{
  "id": "agent-id",
  "name": "Updated Agent",
  "description": "Updated description of the agent",
  "status": "MAINTENANCE",
  "capabilities": ["CAPABILITY_3", "CAPABILITY_4"],
  "features": ["FEATURE_3", "FEATURE_4"],
  "config": {"key": "new-value"},
  "provider_id": "new-provider-id",
  "persona_id": "new-persona-id",
  "user_id": "new-user-id"
}'

```
Delete an agent (DELETE)
```bash
curl -X DELETE "http://localhost:3000/api/agent" -H "Content-Type: application/json" -d '{
  "id": "agent-id"
}'

```
#### to run docker 


To run only  Build and run the Docker container
we build and run the Docker container using Docker Compose:


```bash
docker-compose up --build
docker-compose exec app npm run seed
```
Docker compose copy has its own Postgres db as well 

 