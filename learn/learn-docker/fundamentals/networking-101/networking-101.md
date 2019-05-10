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

