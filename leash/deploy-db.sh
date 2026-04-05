#!/usr/bin/env bash
set -euo pipefail

# 手動デプロイ

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# .env から VPS_HOST などを読み込む
if [ -f "${SCRIPT_DIR}/.env" ]; then
  set -a
  source "${SCRIPT_DIR}/.env"
  set +a
fi

# 以前生成したイメージを削除
if docker image inspect "inusidian-flyway:${FLYWAY_VERSION}" > /dev/null 2>&1; then
    docker image rm "inusidian-flyway:${FLYWAY_VERSION}"
fi

# イメージの生成 & タグ付け & プッシュ
docker buildx build --platform linux/amd64 -t "inusidian-flyway:${FLYWAY_VERSION}" -f "${REPO_ROOT}/kennel/Dockerfile" --load "${REPO_ROOT}/kennel"
docker tag "inusidian-flyway:${FLYWAY_VERSION}" "${DOCKER_REGISTRY_REPOSITORY_NAME}:flyway-${FLYWAY_VERSION}"
docker push "${DOCKER_REGISTRY_REPOSITORY_NAME}:flyway-${FLYWAY_VERSION}"
