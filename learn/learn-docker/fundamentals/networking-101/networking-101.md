## Networking 101

### Publishing ports

`docker container run —publish 8080:80 -d nginx:latest`: this publishes the container's port `80` to the local port `8080`. If it publishes it with the IP address `0.0.0.0`, Docker does this for all IP addresses on the system.

You can specify the IP address and port: `docker container run —publish 127.0.0.1:80:80 -d nginx:latest`

### Publishing multiple ports

2 options:

- multiple p flags: `docker container run -p 80:80 -p 81:81 nginx`
- using a range: `docker container run -p 80-99:80-99 nginx`

### The EXPOSE instruction

- `EXPOSE 80` instruction in Dockerfile is used to specify what port a specific service is using. It's mainly used for documentation for the programmer(s).

### Quiz

- `-p 127.0.0.1:8080:80` publishes the container's port `80` to the local port `8080` and only binds it to `127.0.0.1`
- The command `docker container ls` will show you what ports have been published for your running containers.
- The `EXPOSE` command:
  - will add metadata to the image
  - helps Docker to understand which ports can be published for a container.
- `docker container run -p 80 nginx:latest`:
  - the command will publish the container's port 80
  - the command will publish a port and assign a random local port

### Links (are deprecated, use User Defined Networks)

**Links** are used so that a container can talk to another container by its name.

`docker container run —name webserver —rm -d nginx:latest`

`docker container run —link webserver -it alpine:latest`

Then `ping webserver` to ensure it is linked.

**_Linking with an alias_**:

- Same first step
- `docker container run —link webserver:ws -it alpine:latest`
- Then `ping ws`

### User defined networks

`bridge` will be used if we do not specify explicitly.

`docker network create mynet`: create network

`docker network inspect <NETWORK NAME>`

Run container on specified network: `docker container run —network mynet -it —rm alpine:latest`

Remove network: `docker network rm <NETWORK NAME>`

### Resolving hostnames

`docker container run —network mynet —name c1 —rm -it alpine:latest`

`docker container run —network mynet -name c2 -rm -it alpine:latest`

Running `ping c2` inside a shell of `c1` container produces a successful response.

You can specify the `ip` address at run: `docker container run —network mynet —name c2 —rm -it —ip 172.18.0.99 alpine:latest`

### User defined networks and links

- Combining user defined networks and links
- Creating aliases to connect them

`docker container run —network mynet -it —rm —link postgres:pg alpine:latest`

`docker container run —network mynet —name postgres —rm postgres:9.6.6-alpine`

You can `ping pg` and get a successful response. 

### Sharing names

Create multiple containers on the same network using a `network-alias` with the same name:

- start initial container: `docker container run —network mynet -it alpine:latest`
- Start multiple containers on network with same `network-alias`
  - `docker container run —network mynet -d —network-alias webserver nginx:latest`
  - run this command multiple times

### Quiz

- The IP address `127.0.0.11` can be used as a DNS server in user-defined networks.