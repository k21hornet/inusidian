FROM eclipse-temurin:25-jdk AS builder

WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

RUN chmod +x gradlew && ./gradlew dependencies --no-daemon || true

COPY . .

RUN ./gradlew build -x test --no-daemon

FROM eclipse-temurin:25-jre

WORKDIR /app

COPY --from=builder /app/build/libs/api-1.5.0.jar /app/api.jar

RUN apt-get update && \
    apt-get install -y netcat-openbsd && \
    ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 8080

CMD ["java", "-jar", "/app/api.jar"]
