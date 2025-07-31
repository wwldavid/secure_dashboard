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

### NextAuth.js

11. npm install next-auth bcrypt @prisma/client

12. Add two fields to the User model: email String @unique and passwordHash String.
    npx prisma migrate dev --name add_email_and_password

13. openssl rand -base64 32
    add NEXTAUTH_SECRET in .env

14. npm install bcrypt

### Dashboard

### ProfileForm

15. npm install escape-html (Prevent Cross-Site Scripting (XSS) attacks)

### Profile Api

16.
