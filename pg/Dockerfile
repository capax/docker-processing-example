FROM postgres:9
ENV POSTGRES_USER=admin \
    POSTGRES_PASSWORD=Password123
COPY ddp-init.sh /docker-entrypoint-initdb.d/ddp-init.sh
EXPOSE 5432
