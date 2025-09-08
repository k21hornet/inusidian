#!/bin/zsh

# イメージ名
FRONTEND_IMAGE_NAME="inusidian/frontend:1.0"
BACKEND_IMAGE_NAME="inusidian/backend:1.0"
DATABASE_IMAGE_NAME="inusidian/database:1.0"

docker-compose down --volumes --remove-orphans

# 以前に生成したイメージがある場合は削除
if docker image inspect "${FRONTEND_IMAGE_NAME}" > /dev/null 2>&1; then
    docker image rm "${FRONTEND_IMAGE_NAME}"
fi
if docker image inspect "${BACKEND_IMAGE_NAME}" > /dev/null 2>&1; then
    docker image rm "${BACKEND_IMAGE_NAME}"
fi
if docker image inspect "${DATABASE_IMAGE_NAME}" > /dev/null 2>&1; then
    docker image rm "${DATABASE_IMAGE_NAME}"
fi

docker buildx rm mybuilder
docker buildx create --use --name mybuilder

# イメージを生成
docker build -t "${FRONTEND_IMAGE_NAME}" -f ./frontend/Dockerfile ./frontend
docker build -t "${BACKEND_IMAGE_NAME}" -f ./backend/Dockerfile ./backend
docker buildx build --platform linux/amd64 -t "${DATABASE_IMAGE_NAME}" --load -f ./database/Dockerfile ./database
