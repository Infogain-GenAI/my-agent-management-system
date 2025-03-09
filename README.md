# My Agent Management System

## My sample test app with Next.js and Prisma

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

#### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/my-agent-management-system.git
cd my-agent-management-system
```

#### Step 2: Set Up the Next.js Project

```bash
npm install
npm install prisma @prisma/client
npx prisma init
```

Update the `DATABASE_URL` in `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

#### Step 3: Define the Prisma Schema

```bash
npx prisma db push  # if experimenting 
npx prisma generate # generate client 
npx prisma migrate dev --name init  # for versioning the schema push 
```

Create a `.env` file and add the following:

```env
DATABASE_URL="postgresql://<user>:<password>@<localhost>:<5432>/<database>?schema=<schema>"
```

See Prisma Schema and seed file in the `prisma` folder. The API is in `src/pages/api/agent/index.ts`.

#### Step 4: Run the Development Server

```bash
npm install
npx prisma validate  # for validating Prisma schema before running
npx prisma db push  # to push the DB scripts to create DB tables in a schema as mentioned in .env
or 
npx prisma migrate dev --name init  # for versioning the schema push 
npm run seed  # to seed the database
npm run dev # to run dev 
```

### Initial Check

Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.

### API Call Samples


#### Get all agents (GET)

```bash
curl -X GET "http://localhost:3000/api/agent?page=1&limit=10&sort=name"
```
#### Get an agent by ID (GET)

```bash
curl -X GET "http://localhost:3000/api/agent?id=agent-id"
```
Get agents by name (GET)

```bash
curl -X GET "http://localhost:3000/api/agent?name=agent-name&page=1&limit=10&sort=name"
```
Get agents by domain (GET)
```bash
curl -X GET "http://localhost:3000/api/agent?domain=domain-name&page=1&limit=10&sort=name"
```
Get agents by provider (GET)
```bash
curl -X GET "http://localhost:3000/api/agent?provider=provider-name&page=1&limit=10&sort=name"
```
Get agents by status (GET)
```bash
curl -X GET "http://localhost:3000/api/agent?status=ACTIVE&page=1&limit=10&sort=name"
```
Get agents by provider and domain filtered by status (GET)
```bash
curl -X GET "http://localhost:3000/api/agent?provider=provider-name&domain=domain-name&status=ACTIVE&page=1&limit=10&sort=name"
``` 

#### Create a new agent (POST)

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

#### Update an existing agent (PUT)

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

#### Delete an agent (DELETE)

```bash
curl -X DELETE "http://localhost:3000/api/agent" -H "Content-Type: application/json" -d '{
  "id": "agent-id"
}'
```

### Running with Docker

To build and run the Docker container using Docker Compose:

```bash
docker-compose up --build
docker-compose exec app npm run seed
```

Docker Compose setup includes its own PostgreSQL database.

