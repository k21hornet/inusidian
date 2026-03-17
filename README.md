# Inusidian

**Unleash your learning potential with INUSIDIAN**

INUSIDIAN is a spaced repetition system (SRS) flashcard application designed to help you learn vocabulary efficiently using the principles of the forgetting curve.
Create custom decks, add cards with multiple fields, and review them at optimal intervals for maximum retention.

## 開発コマンド

### ローカル起動

```
cd inusidian-sql

docker-compose up -d

# Migration実行
./gradlew flywayMigrate
```

### docker起動

```
# DB起動
docker-compose up -d mysql

# Migration実行
docker-compose --profile tools run --rm flyway

# Migration状態確認
docker-compose --profile tools run --rm flyway info

# App起動
docker-compose up -d
```
