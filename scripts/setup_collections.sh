#!/bin/bash

# Чекаємо, поки Couchbase повністю запуститься (близько 15 секунд)
echo "Waiting for Couchbase to start..."
sleep 15

# 1. Створюємо Bucket (головне сховище)
# Назва: marketplace, Об'єм: 512MB
couchbase-cli bucket-create -c localhost:8091 \
    --username admin --password password \
    --bucket marketplace --bucket-type couchbase \
    --bucket-ramsize 512

# 2. Створюємо Scope (логічна група)
# Назва: store
couchbase-cli collection-manage -c localhost:8091 \
    --username admin --password password \
    --bucket marketplace --create-scope store

# 3. Створюємо всі 8 колекцій усередині scope "store"
COLLECTIONS=("products" "stocks" "users" "orders" "reviews" "categories" "suppliers" "warehouses" "roles")

for col in "${COLLECTIONS[@]}"; do
    echo "Creating collection: $col"
    couchbase-cli collection-manage -c localhost:8091 \
        --username admin --password password \
        --bucket marketplace --create-collection store.$col
done

echo "Database structure created successfully!"