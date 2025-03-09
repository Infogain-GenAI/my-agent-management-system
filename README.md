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
curl -X GET "http://localhost:3000/api/agent?page=1&limit=10&sort=name&userId=cm805786f0000qyasuvnbqfo9&status=ACTIVE"
```
#### Get an agent by ID (GET)

```bash
curl -X GET "http://localhost:3000/api/agent?id=cm805787h000hqyasawcn6v4t&userId=cm805786f0000qyasuvnbqfo9&status=ACTIVE"
```
Get agents by name (GET)

```bash
curl -X GET "http://localhost:3000/api/agent?name=Agent 1&page=1&limit=10&sort=name&userId=cm805786f0000qyasuvnbqfo9&status=ACTIVE"
```

Get agents by User (GET)
```bash
http://localhost:3000/api/agent?userId=cm805786f0000qyasuvnbqfo9&page=1&limit=10&sort=name&userId=cm805786f0000qyasuvnbqfo9&status=ACTIVE
```

Get agents by domain (GET)
```bash
curl -X GET "http://localhost:3000/api/agent?domain=cm805786w0006qyasoxym0rwd&page=1&limit=10&sort=name&userId=cm805786f0000qyasuvnbqfo9&status=ACTIVE"
```
Get agents by provider (GET)
```bash
curl -X GET "http://localhost:3000/api/agent?provider=cm805786n0002qyasdm98tz9w&page=1&limit=10&sort=name&userId=cm805786f0000qyasuvnbqfo9&status=ACTIVE"
```
Get agents by status (GET)
```bash
curl -X GET "http://localhost:3000/api/agent?status=ACTIVE&page=1&limit=10&sort=name&userId=cm805786f0000qyasuvnbqfo9"
```
Get agents by provider and domain filtered by status (GET)
```bash
curl -X GET "http://localhost:3000/api/agent?provider=cm805786n0002qyasdm98tz9w&domain=cm805786w0006qyasoxym0rwd&status=ACTIVE&page=1&limit=10&sort=name&userId=cm805786f0000qyasuvnbqfo9"
``` 




#### Create a new agent (POST)

```bash
curl -X POST "http://localhost:3000/api/agent" -H "Content-Type: application/json" -d '{
  "name": "AWS Agent1",
  "description": "Description of the AWS Agent",
  "status": "ACTIVE",
  "capabilities": ["CAPABILITY_1", "CAPABILITY_2"],
  "features": ["FEATURE_2", "FEATURE_3"],
  "config": {"aws_api-key": "432543536sssssddd!@33", "key":"AWS value1"},
  "provider_id": "cm805786n0002qyasdm98tz9w",
  "persona_id": "cm8057876000bqyaszcrn7yhm",
  "user_id": "cm805786f0000qyasuvnbqfo9",
	"domain_id":"cm80578710007qyasoac9ttn3"
}'
```

#### Update an existing agent (PUT)

```bash
curl -X PUT "http://localhost:3000/api/agent" -H "Content-Type: application/json" -d '{
  "id": "cm81igr0t0001qyz4t7yud4yh",
	"name": "Insomnia update Agent",
  "description": "Description of the update Agent",
  "status": "HELLO",
  "capabilities": ["CAPABILITY_1", "CAPABILITY_3"],
  "features": ["FEATURE_2", "FEATURE_4"],
  "config": {"api-key": "422222ddddddddddd33", "key":"Insomnia value31"},
  "provider_id": "cm805786n0002qyasdm98tz9w",
  "persona_id": "cm8057876000bqyaszcrn7yhm",
  "user_id": "cm805786l0001qyas8fkth595",
	"domain_id":"cm80578720008qyasxouy3yr4"
}'
```

#### Delete an agent (DELETE)

```bash
curl -X DELETE "http://localhost:3000/api/agent" -H "Content-Type: application/json" -d '{
	 "id": "cm81it4oa0000qygsd33fxzd5",
	  "user_id":"cm805786f0000qyasuvnbqfo9"
}'
```

### Running with Docker

To build and run the Docker container using Docker Compose:

```bash
docker-compose up --build
docker-compose exec app npm run seed
```

Docker Compose setup includes its own PostgreSQL database.

