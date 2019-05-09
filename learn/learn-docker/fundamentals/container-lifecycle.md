### Container Lifecycle

#### Introductions

**Containers** are the runtime versions of **Images**.

#### Detaching and attaching

Start and name container: `docker container run —name c1 -it alpine:latest sh`

`Ctrl-p Ctrl-q` to detach from running container.

Without providing the `-it` flags, **_we would be unable to detach from the container_** `c1`.

You can also add `-d` flag to detach upon execution of command.

**Attach**: `docker container attach c1`

#### Visit container

`docker container exec c1 cat /etc/nginx/nginx.conf`

Execute interactive shell: `docker container exec -it c1 sh`

Good for debugging.

**Important Note**: If you have a default command to run upon Image creation, specified in Dockerfile (`CMD`), `docker container exec <command name>` ignores that command.

#### Interacting with containers

`docker container run -i alpine sh`

`-i`: attaches stdin to process running inside the container

`-t`: attaches a sudo-`tty`, a device for the shell to interact with the terminal

#### Stopping a container

Stop container: `docker container stop <CONTAINER NAME>`

Send `SIGTERM` `kill`: `docker container kill <CONTAINER NAME>`

#### The end of containers

`Ctrl-c` when you are attached to a container just forwards the `SIGINT` signal to the process id `1` to the container and the container exits as soon as the process id `1` is killed.

A container stops when the process with `PID = 1` terminates.

Docker will use the tag `latest` if no tag is specified.

You can detach from a container by pressing `Ctrl-p` and then `Ctrl-q`.

The command `docker container stop` will send a signal to the container's process with the ID `1` that is:

- first, it will send a `SIGTERM` and then it will send a `SIGKILL` if the process does not terminate.

**_You can only detach from a container you started if you included the `-it` flags_**.

#### Debugging the issue from the last assignment

A lot of commands will be missing in Docker images (we want them to be lightweight).

Install `ps`: `apt-get update && apt-get install -y procps`

The shell `bin/sh` does not forward `SIGINT` (signal interrupts).

#### Becoming PID 1

`JSON`: JavaScript Object Notation

Using `exec` form instead of `shell` form in Dockerfile:

In Dockerfile: `CMD ["/usr/sbin/nginx", "-g", "daemon off;"]`

#### Verify it is PID 1

#### Reading logs

Read logs of container `c1`: `docker container logs c1`

Follow output of container with `-f`: `docker container -f c1`

Containers should not write log files; they should write to either `stdout` or `stderr`.

#### Producing logs

Running ruby file `logger.rb`: `docker container run -v /Users/acon/workspace/docker_examples/logging_demo/scripts:/app ruby:2.4.2 ruby /app/logger.rb`

#### Using logfiles

Where default logfile is: `docker container exec c1 tail /var/log/nginx/access.log`

With Dockerfile: 

```dockerfile
FROM debian:buster-slim

RUN apt-get update
RUN apt-get install -y nginx

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
```

Modify the Dockerfile:

```dockerfile
FROM debian:buster-slim

RUN apt-get update
RUN apt-get install -y nginx
RUN rm /var/log/nginx/access.log && ln -s /dev/stdout /var/log/nginx/access.log

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
```

`RUN rm /var/log/nginx/access.log && ln -s /dev/stdout /var/log/nginx/access.log` changes `stderr` from being written to `/var/log/nginx/access.log` to `STDOUT` at `/dev/stdout`.

Then build image: `docker image build -t jfahrer/nginx:latest .`

If we start the container again, it will output to `stdout` and `stderr`.

Run container: `docker container run --name c1 --rm -p 80:80 jfahrer/nginx:latest`

#### Quiz

You should send log outputs to `STDOUT` and `STDERR`.

The `CMD`: The shell format wraps the command inside a `sh -c`. The exec format calls the executable directly.

Comments in a Dockerfile need to start with a `#` at the _beginning_ of a line.

Using file to print to `STDOUT`: write to the file `/dev/stdout`.