#!/usr/bin/env bash
set -euo pipefail

# 手動デプロイ

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# .env から変数を読み込む
if [ -f "${SCRIPT_DIR}/.env" ]; then
  set -a
  source "${SCRIPT_DIR}/.env"
  set +a
fi

# Docker Registry イメージタグ名
DOCKER_REGISTRY_WEB_IMAGE_TAG="web-${WEB_VERSION}"
DOCKER_REGISTRY_API_IMAGE_TAG="api-${API_VERSION}"
DOCKER_REGISTRY_FLYWAY_IMAGE_TAG="flyway-${FLYWAY_VERSION}"

# web: 以前生成したイメージを削除
if docker image inspect "inusidian-web:${WEB_VERSION}" > /dev/null 2>&1; then
    docker image rm "inusidian-web:${WEB_VERSION}"
fi

# flyway: 以前生成したイメージを削除
if docker image inspect "inusidian-flyway:${FLYWAY_VERSION}" > /dev/null 2>&1; then
    docker image rm "inusidian-flyway:${FLYWAY_VERSION}"
fi

# web: イメージの生成 & タグ付け & プッシュ
docker buildx build --platform linux/amd64 -t "inusidian-web:${WEB_VERSION}" -f "${REPO_ROOT}/muzzle/Dockerfile" --load "${REPO_ROOT}/muzzle"
docker tag "inusidian-web:${WEB_VERSION}" "${DOCKER_REGISTRY_REPOSITORY_NAME}:${DOCKER_REGISTRY_WEB_IMAGE_TAG}"
docker push "${DOCKER_REGISTRY_REPOSITORY_NAME}:${DOCKER_REGISTRY_WEB_IMAGE_TAG}"

# flyway: イメージの生成 & タグ付け & プッシュ
docker buildx build --platform linux/amd64 -t "inusidian-flyway:${FLYWAY_VERSION}" -f "${REPO_ROOT}/kennel/Dockerfile" --load "${REPO_ROOT}/kennel"
docker tag "inusidian-flyway:${FLYWAY_VERSION}" "${DOCKER_REGISTRY_REPOSITORY_NAME}:${DOCKER_REGISTRY_FLYWAY_IMAGE_TAG}"
docker push "${DOCKER_REGISTRY_REPOSITORY_NAME}:${DOCKER_REGISTRY_FLYWAY_IMAGE_TAG}"

# api: Jib でビルド & レジストリにプッシュ
"${REPO_ROOT}/core/gradlew" -p "${REPO_ROOT}/core" :jib \
  "-PjibToImage=${DOCKER_REGISTRY_REPOSITORY_NAME}:${DOCKER_REGISTRY_API_IMAGE_TAG}"
