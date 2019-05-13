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



