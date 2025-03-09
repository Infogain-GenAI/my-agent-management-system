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

[ http://localhost:3000/api/agent?page=1&limit=10&sort=name ](http://localhost:3000/api/agent?page=1&limit=10&sort=name )



#### to run docker 



Docker compose which has its own ppostgre db as well 

docker-compose up --build
docker-compose exec app npm run seed

To run only  Build and run the Docker container

we build and run the Docker container using Docker Compose:

new compse file will have only 
version: '3.8'

services:
  app:
    build: .
    restart: always
    environment:
      DATABASE_URL: postgres://<user>:<password>@<host>:<port>/<database>?schema=<schema>
    ports:
      - "3000:3000"


then save and run  
docker-compose up --build
docker-compose exec app npm run seed