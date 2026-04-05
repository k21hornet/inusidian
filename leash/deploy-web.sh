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
if docker image inspect "inusidian-web:${WEB_VERSION}" > /dev/null 2>&1; then
    docker image rm "inusidian-web:${WEB_VERSION}"
fi

# イメージの生成 & タグ付け & プッシュ
docker buildx build --platform linux/amd64 -t "inusidian-web:${WEB_VERSION}" -f "${REPO_ROOT}/muzzle/Dockerfile" --load "${REPO_ROOT}/muzzle"
docker tag "inusidian-web:${WEB_VERSION}" "${DOCKER_REGISTRY_REPOSITORY_NAME}:web-${WEB_VERSION}"
docker push "${DOCKER_REGISTRY_REPOSITORY_NAME}:web-${WEB_VERSION}"
