# Docker Commands

The docker build command builds Docker images from a Dockerfile and a “context”.

```
docker build [OPTIONS] PATH | URL | -
```

e.g. `docker build -t node-app-image .`

* `-t`: Name and optionally a tag in the 'name:tag' format

---

The docker run command first creates a writeable container layer over the specified image, and then starts it using the specified command

```
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

e.g. `docker run -d -v D:/Documents/Docker/node-docker:/app:ro -v /app/node_modules -p 3000:4000 -e PORT=4000 --env-file ./.env --name node-app node-app-image`

* `-d`: Run container in background and print container ID
* `-v`: Bind mount a volume
* `-p`: Publish a container's port(s) to the host
* `-e`: Set environment variables
* `--env-file`: Read in a file of environment variables
* `--name`: Assign a name to the container

---

Remove one or more containers

```
docker rm [OPTIONS] CONTAINER [CONTAINER...]
```

e.g. `docker rm -f -v node-app`

* `-f`: Force the removal of a running container (uses SIGKILL)
* `-v`: Remove anonymous volumes associated with the container

---

The docker exec command runs a new command in a running container.

```
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

e.g. `docker exec -i -t node-app bash`

* `-i`: Keep STDIN open even if not attached
* `-t`: Allocate a pseudo-TTY

---

The docker logs command batch-retrieves logs present at the time of execution.

```
docker logs [OPTIONS] CONTAINER
```

e.g. `docker logs node-app`

---

Builds, (re)creates, starts, and attaches to containers for a service.

```
docker compose-up [OPTIONS] [SERVICE...]
```

e.g. `docker-compose up -d --build`

e.g. `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build`

* `-d`: Detached mode: Run containers in the background
* `--build`: Build images before starting containers.

---

Stops containers and removes containers, networks, volumes, and images created by up.

```
docker-compose down [OPTIONS]
```

e.g. `docker-compose down -v`

* `-v`: Remove named volumes declared in the volumes section of the Compose file and anonymous volumes attached to containers.

---