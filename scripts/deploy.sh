# 手動デプロイ

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# .env から VPS_HOST などを読み込む
if [ -f "${SCRIPT_DIR}/.env" ]; then
  set -a
  source "${SCRIPT_DIR}/.env"
  set +a
fi

# イメージタグ
WEB_IMAGE_TAG="${WEB_VERSION}"
API_IMAGE_TAG="${API_VERSION}"
FLYWAY_IMAGE_TAG="${FLYWAY_VERSION}"
BATCH_IMAGE_TAG="${BATCH_VERSION}"

# イメージ名
WEB_IMAGE_NAME="inusidian-web"
API_IMAGE_NAME="inusidian-api"
FLYWAY_IMAGE_NAME="inusidian-flyway"
# Docker Registry リポジトリ名
DOCKER_REGISTRY_REPOSITORY_NAME="${DOCKER_REGISTRY_REPOSITORY_NAME}"
# Docker Registry イメージタグ名
DOCKER_REGISTRY_WEB_IMAGE_TAG="web-${WEB_IMAGE_TAG}"
DOCKER_REGISTRY_API_IMAGE_TAG="api-${API_IMAGE_TAG}"
DOCKER_REGISTRY_FLYWAY_IMAGE_TAG="flyway-${FLYWAY_IMAGE_TAG}"

# 以前生成したイメージを削除
if docker image inspect "${WEB_IMAGE_NAME}:${WEB_IMAGE_TAG}" > /dev/null 2>&1; then
    docker image rm "${WEB_IMAGE_NAME}:${WEB_IMAGE_TAG}"
fi
if docker image inspect "${API_IMAGE_NAME}":"${API_IMAGE_TAG}" > /dev/null 2>&1; then
    docker image rm "${API_IMAGE_NAME}:${API_IMAGE_TAG}"
fi
if docker image inspect "${FLYWAY_IMAGE_NAME}:${FLYWAY_IMAGE_TAG}" > /dev/null 2>&1; then
    docker image rm "${FLYWAY_IMAGE_NAME}:${FLYWAY_IMAGE_TAG}"
fi

# イメージの生成
docker buildx build --platform linux/amd64 -t "${WEB_IMAGE_NAME}:${WEB_IMAGE_TAG}" -f ./inusidian-frontend/Dockerfile --load ./inusidian-frontend
docker buildx build --platform linux/amd64 -t "${API_IMAGE_NAME}:${API_IMAGE_TAG}" -f ./inusidian-backend/Dockerfile --load ./inusidian-backend
docker buildx build --platform linux/amd64 -t "${FLYWAY_IMAGE_NAME}:${FLYWAY_IMAGE_TAG}" -f ./inusidian-sql/Dockerfile --load ./inusidian-sql

# イメージにタグ付け
docker tag "${WEB_IMAGE_NAME}:${WEB_IMAGE_TAG}" "${DOCKER_REGISTRY_REPOSITORY_NAME}:${DOCKER_REGISTRY_WEB_IMAGE_TAG}"
docker tag "${API_IMAGE_NAME}:${API_IMAGE_TAG}" "${DOCKER_REGISTRY_REPOSITORY_NAME}:${DOCKER_REGISTRY_API_IMAGE_TAG}"
docker tag "${FLYWAY_IMAGE_NAME}:${FLYWAY_IMAGE_TAG}" "${DOCKER_REGISTRY_REPOSITORY_NAME}:${DOCKER_REGISTRY_FLYWAY_IMAGE_TAG}"

# レジストリにプッシュ
docker push "${DOCKER_REGISTRY_REPOSITORY_NAME}:${DOCKER_REGISTRY_WEB_IMAGE_TAG}"
docker push "${DOCKER_REGISTRY_REPOSITORY_NAME}:${DOCKER_REGISTRY_API_IMAGE_TAG}"
docker push "${DOCKER_REGISTRY_REPOSITORY_NAME}:${DOCKER_REGISTRY_FLYWAY_IMAGE_TAG}"
