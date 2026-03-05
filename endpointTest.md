## Register user

curl -X POST http://localhost:3000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{
"name": "Test User",
"email": "test@example.com",
"password": "123456"
}'

## Login User

curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
"email": "test@example.com",
"password": "123456"
}'

## Create a book

curl -X POST http://localhost:3000/api/books \
-H "Authorization: Bearer TOKEN" \
-H "Content-Type: application/json" \
-d '{
"title":"Atomic Habits",
"author":"James Clear",
"tags":["self-help"],
"status":"reading"
}'

## Get all books

curl http://localhost:3000/api/books \
-H "Authorization: Bearer TOKEN"

## Filters

curl "http://localhost:3000/api/books?status=reading&tag=self-help" \
-H "Authorization: Bearer TOKEN"

## Update Book

curl -X PATCH http://localhost:3000/api/books/BOOK_ID \
-H "Authorization: Bearer TOKEN" \
-H "Content-Type: application/json" \
-d '{"status":"completed"}'

## Delete Book

curl -X DELETE http://localhost:3000/api/books/BOOK_ID \
-H "Authorization: Bearer TOKEN"
