# Founder Matching Database Setup

## Description

This contains the database initialization scripts for the Founder Matching Web Application. It sets up a PostgreSQL database with necessary permissions for the application user.

## Prerequisites

- PostgreSQL installed on your system
- `psql` command-line tool available
- Superuser access to PostgreSQL

## Database Setup Instructions

### 1. Connect to PostgreSQL

First, connect to PostgreSQL using the default database:

```bash
psql -U <username> postgres
```

### 2. Create User Account

```sql
CREATE USER <username> WITH PASSWORD <password>
```

### 3. Useful Commands

```bash
\c foundermatchingdb	# connect to your specific database
\dt	# list all tables in the current database
\d	# list all tables, views, and sequences
\d tablename	# describe a specific table
```

### 2. Database Creation

Execute the following commands to recreate the database, please ignore the DROP line if you have not created database before:

```sql
DROP DATABASE foundermatchingdb;
CREATE DATABASE foundermatchingdb;
```

### 3. Import Database Schema

Import the database schema from the SQL file:

```bash
psql foundermatchingdb < foundermatchingdb.sql
```

### 4. Set User Permissions

Connect to the database and set up user permissions:

```bash
psql postgres
```

```sql
\c foundermatchingdb
GRANT USAGE ON SCHEMA public TO <username>;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO <username>;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO <username>;
ALTER USER <username> CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE foundermatchingdb TO <username>;
```
