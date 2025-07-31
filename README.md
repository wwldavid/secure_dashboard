1.  npx create-next-app@latest secure-dashboard

2.  npm install tailwindcss @tailwindcss/postcss postcss

3.  npm install next-auth @prisma/client prisma express-validator escape-html

### Define the database schema/model

4.  touch .env (DATABASE_URL from Railway)

5.  npm install prisma @prisma/client --save-de

6.  npx prisma init

7.  add model User in schema.prisma, then run: npx prisma migrate dev --name add_user_model

8.  npx prisma studio （Check if the database was created successfully.）

### Wrap encryption and decryption functions into a utility

9. create lib/crypto.js

10. Generate a 32-byte (256-bit) random key
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    Save it to .env file as an environment variable

11.
