## Learn Docker

### Fundamentals

#### Getting Started

`docker container run alpine sh`

Steps:

- tries to find the container `alpine` locally but can't, so it pulls it `library/alpine` from Docker Hub
- the `sh` command tries to run inside the container, but without the appropriate `-it` flags, it errors
- `alpine` is a lightweight Linux distrubtions
- **you need the `-it` flags every time you want to run a shell inside a container**
- ==remember that a container is just a **process** on the operating system==



**Start Detached Container**: `docker container run -d alpine`

- the key sequence `Ctrl-p Ctrl-q` will detach from a container if you used the `-it` flags

**Start Container and Run Command `sh`**: `docker container run -it alpine sh`

**Stop Container**: `docker container stop <NAME>`

**List Containers**: `docker container ls`

**Remove Container(s)**: `docker container rm [<NAME>|<ID>]`

**Remove All Containers**: `docker container rm $(docker container ls -aq)`

- pass in result of `docker container ls -aq`

**Create Container With Specified Name**: `docker container run —name <SPECIFIED NAME>`

The key sequence `Ctrl-D` quits the shell and terminates the container since the shell is the main process of the container.

**Delete Image**: `docker image rm <NAME>`

**Deleting**: 

- the command `docker container rm d610b552c56e` will delete the container with the ID `d610b552c56e` **_when it is stopped.**

#### Running Nginx inside a Docker container as a web server

`docker container run -p 80:80 nginx`

Syntax for port mapping is: `-p <local port>:<remote port>`

#### Volumes

Run simple html file on webserver: `docker container run -p 80:80 —volume /home/austin.connor/repos/learn/docker_examples/html:/usr/share/nginx/html nginx`

#### Isolation

Linux kernels have namespaces, we are concerned with 3 main ones: `pid`, `net`, and `mount`

#### Links

(Deprecated but still widely used, there is a better way though)

Link two containers together: `docker container run -it —rm —name c2 —link c1 alpine sh`

==(`—rm` automatically deletes the container upon exit)==

#### User Defined Networks

Run container on previously created network `test`: `docker container run —rm -it —name c1 —network test alpine sh`

(No need to link the containers)

Default network is called: `bridge`

#### Docker Client (CLI)

Communicate with Docker API over UNIX circuit or HTTP

**Management** and regular **Commands**

They interact with the Docker daemon

The **Commands** are mainly just aliases to **Management** commands, but you should use the Management commands.

Supply flags immediately following the relevant command.

#### Hide Legacy Commands

`DOCKER_HIDE_LEGACY_COMMANDS=true`

==**Containers communicate with another not by using Interprocess Communication (IPC) or Shared Memory, but by the use of <u>networks</u>**==

The default network is called `bridge`.

