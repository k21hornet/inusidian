# Flyway

## 準備

DB コンテナを起動しておく。

```bash
docker-compose -f docker-compose-local.yml up -d
```

## コマンド

```bash
cd inusidian-sql

# マイグレーション実行
./gradlew flywayMigrate

# 適用状況確認
./gradlew flywayInfo

# チェックサム検証
./gradlew flywayValidate

# スキーマを全削除（開発用途のみ）
./gradlew flywayClean
```
