
# Xignature Backend Developer Challange

> `Abd. Jahiduddin - abd.jahiduddin@gmail.com`


## Tech Stack

* **Nest JS**

* **Typeorm**

* **PostgreSQL**

* **Docker**
## Environment Variables

**Development**

Jika menjalankan backend di lingkungan development pastikan terdapat file dengan nama dev.stage.env dan berisi environment variables berikut: 

```javascript
HOST_PORT=8080

DB_HOST="localhost"
DB_PORT=5432
DB_USERNAME="postgres"
DB_PASSWORD="password"
DB_NAME="dbname"

JWT_SECRET="jwtsecret"
```

**Docker Compose**

Jika menjalankan backend menggunakan docker compose pastikan terdapat file dengan nama docker.env dan berisi environment variables berikut: 

```javascript
STAGE="prod"
HOST_PORT=3000

DB_PORT=5432
DB_USERNAME="postgres"
DB_PASSWORD="password"
DB_NAME="dbname"

JWT_SECRET="jwtsecret"
```


## Run Backend

Clone project

```bash
  git clone https://github.com/abdjahiduddin/xignature-test-abd-jahiduddin.git
```

Masuk ke directory project 

```bash
  cd xignature-test-abd-jahiduddin
```

**Development**

Install dependencies

```bash
  yarn install
```

Menjalankan backend di lingkungan development

```bash
  yarn start:dev
```

**Docker Compose**

Menjalankan backend menggunakan docker compose

```bash
  docker compose --env-file docker.env up -d
```


## API Documentation
[Postman API Documentation](https://documenter.getpostman.com/view/3903208/2s8ZDYZ3E9)