## Container behavior

### The environment

Change the bash appearance: `export PS1="\h:\w# "` will set the bash appearance to `<HOSTNAME>:<PATH>#`

This is after `docker container run -it jfahrer/myalpine:latest`

==**Control prompt of shell using Docker**==:

- `-e`: environment variables for Docker
  - Ex: `docker container run -it -e "PS1=\h:\w# " jfahrer/myalpine:latest`

### The ENV instruction

- Make setting the `-e` more permanent by setting it in the Dockerfile:

  - Dockerfile:

    - ```dockerfile
      FROM alpine:latest
      
      RUN apk update
      RUN apk add bash
      
      ENV PS1 "\h:\w# "
      CMD bash
      ```

  - Then build image: `docker image build -t jfahrer/myalpine:latest .`

  - Then running `docker container run -it jfahrer/myalpine:latest` creates shell specified in Dockerfile.

- **Can also set multiple environment variables with a slight variation in the Dockerfile**:

  - `ENV PS1="\h:\w# " PS2=">> "`
  - specifying the `-e` flag will **_overwrite_** what is set in the Dockerfile

### More on env vars

- list environment variables in docker container: `docker container run alpine:latest`
- passing in environment variables file: `docker container run —env-file <ENV FILENAME> alpine:latest env`
- Pass in existing environment variable: `docker container run —env-file <ENV FILENAME> -e <ENV VARIABLE NAME> alpine:latest env`

### Quiz

- You run a container based on an image that has the following line in its Dockerfile: `ENV MYVAR test`.
  The container is started with the following command: `docker container run <image_name>`.
  The value of the environment variable `MYVAR` inside the container is `test`.
- You run a container based on an image that has the following line in its Dockerfile: `ENV MYVAR test OTHERVAR foobar`.
  The container is started with the following command: `docker container run <image_name>`.
  The environment variable `MYVAR` will have the value `test OTHERVAR foobar` and `OTHERVAR` will not be set.
- You run a container based on an image that has the following line in its Dockerfile: `ENV MYVAR=test OTHERVAR=foobar`.
  The container is started with the following command: `docker container run <image_name>`.
  `MYVAR` will have the value `test` and `OTHERVAR` will have the value `foobar`.
- What happens when you assign an environment variable via the `-e` flag of the `docker container run` command without a value?
  Ans: Docker will look for an environment variable with the same name locally and use the value of that environment variable if it exists.

### Postgres in a nutshell



