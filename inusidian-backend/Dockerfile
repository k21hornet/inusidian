FROM eclipse-temurin:21-jdk AS builder

COPY . /app
WORKDIR /app

RUN apt-get update && \
apt-get install -y findutils unzip curl && \
curl -LO https://services.gradle.org/distributions/gradle-8.14-bin.zip && \
mkdir -p /opt/gradle && \
unzip gradle-8.14-bin.zip -d /opt/gradle && \
./gradlew build -x test

FROM eclipse-temurin:21-jre

COPY --from=builder /app/build/libs/inusidian-backend-1.3.0.jar /app/inusidian-backend.jar

RUN apt-get update && \
apt-get install -y netcat-openbsd && \
ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
apt-get clean && \
rm -rf /var/lib/apt/lists/*

EXPOSE 8080

CMD ["java", "-jar", "/app/inusidian-backend.jar"]