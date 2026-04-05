# Inusidian Database

## 開発コマンド

```
# マイグレーションを実行
docker-compose --profile migration up -d flyway

# コンテナが残っていて動かない場合（--force-recreate で強制再実行）
docker-compose --profile migration up --force-recreate flyway

# DB起動
docker-compose up -d

# 削除
docker-compose --profile migration down -v

# ログイン
docker exec -it inusidian-db mysql -u user -ppass
```
