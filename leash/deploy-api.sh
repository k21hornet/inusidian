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

# Jib でビルド & レジストリにプッシュ
"${REPO_ROOT}/core/gradlew" -p "${REPO_ROOT}/core" :jib \
  "-PjibToImage=${DOCKER_REGISTRY_REPOSITORY_NAME}:api-${API_VERSION}"
