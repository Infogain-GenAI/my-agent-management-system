
## Dump of DB from Postgres
#### dump of all schema + data 
```bash
.\pg_dump -U postgres -h localhost -p 5432 -d postgres --schema=aiden1 -f C:/work/aiden1_full_dump.sql
```

#### dump of all schema only
```bash

.\pg_dump -U postgres -h localhost -p 5432 -d postgres --schema-only --schema=aiden1 -f C:/work/aiden1_schema_dump.sql
```
#### dump of data only  
```bash
.\pg_dump -U postgres -h localhost -p 5432 -d postgres --schema=aiden1 --data-only -f C:/work/aiden1_data_dump.sql
```
## API spec for agent api 
TODO