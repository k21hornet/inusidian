FROM openjdk:21 AS builder

COPY . /app
WORKDIR /app

RUN microdnf update && \
microdnf install -y findutils && \
microdnf install -y unzip && \
curl -LO https://services.gradle.org/distributions/gradle-8.14-bin.zip && \
mkdir -p /opt/gradle && \
unzip gradle-8.14-bin.zip -d /opt/gradle && \
./gradlew build -x test

FROM openjdk:21

COPY --from=builder /app/build/libs/inusidian-api-1.3.0.jar /app/inusidian-api.jar

RUN microdnf install -y nc && \
ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

EXPOSE 8080

CMD ["java", "-jar", "/app/inusidian.jar"]
