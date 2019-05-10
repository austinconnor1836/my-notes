## Data in images

### Copying data

This is to persist local files into the directory inside the container image using the `COPY` command in the `Dockerfile`.

Dockerfile:

```dockerfile
FROM debian:buster-slim

RUN apt-get update
RUN apt-get install -y nginx
RUN rm /var/log/nginx/access.log && ln -s /dev/stdout /var/log/nginx/access.log
RUN rm /var/log/nginx/error.log && ln -s /dev/stderr /var/log/nginx/error.log
<<<< ADD
COPY ./html /var/www/html
>>>> END
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
```

Then to build the image: `docker image build -t jfahrer/nginx:latest .`

### Using wildcards

```dockerfile
FROM debian:buster-slim

RUN apt-get update
RUN apt-get install -y nginx
RUN rm /var/log/nginx/access.log && ln -s /dev/stdout /var/log/nginx/access.log
RUN rm /var/log/nginx/error.log && ln -s /dev/stderr /var/log/nginx/error.log

<<<< ADD
COPY ./html/*.html /var/www/html/
>>>> END
COPY ./html /var/www/html

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
```

Docker is written in the `Go` language.

The wildcards will be matched with the `Go` language syntax: https://golang.org/pkg/path/filepath/#Match

**Adding multiple sources**: change line to `COPY ./html/*.html ./html/assets/ ./html/css/ /var/www/html/`. This copies only the **_contents_** of the subdirectories, not the directories themselves.

### The magic of ADD

Replace `COPY` with `ADD`:

```dockerfile
FROM debian:buster-slim

RUN apt-get update
RUN apt-get install -y nginx
RUN rm /var/log/nginx/access.log && ln -s /dev/stdout /var/log/nginx/access.log
RUN rm /var/log/nginx/error.log && ln -s /dev/stderr /var/log/nginx/error.log

<<<< CHANGE
ADD ./html/*.html /var/www/html/
>>>> END
COPY ./html /var/www/html

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
```

Creating a **tar** archive replacing the `html` directory:

- `tar zcvf html.tar.gz html/`: creates a **tar** archive of the `html` directory

- Now we can replace the html directory in the `ADD` command with the tar archive:

  - ```dockerfile
    FROM debian:buster-slim
    
    RUN apt-get update
    RUN apt-get install -y nginx
    RUN rm /var/log/nginx/access.log && ln -s /dev/stdout /var/log/nginx/access.log
    RUN rm /var/log/nginx/error.log && ln -s /dev/stderr /var/log/nginx/error.log
    
    <<<< CHANGE
    ADD ./html.tar.gz /var/www/
    >>>> END
    COPY ./html /var/www/html
    
    CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
    ```

`ADD` command automatically unpacks tar archives by default.

**Adding a remote url**:

- `ADD http://example.com/index.html /var/www/html/example.html`: this downloads `html` file from remote url
- ==It is strongly recommended to use `ADD` only when you want to either:==
  - ==extract a tar archive==
  - ==or download from a remote url==
- All other situations, use the `COPY` command

### Ignoring files

The build context that is being sent to the Docker daemon when we build an image:

- `docker image build .`	
  - sends about 50 MB of data in his example
  - upon visual inspection of Dockerfile, we can conclude not much is happening. **So why is it transmitting so much data?**
  - after finding the cause of the size due to a large `temp` file, we can use a `.dockerignore` file to exclude the file:
    - excluding the `data/tmp/` directory in `.dockerignore` file:
      - `data/tmp/`

- building again: `docker image build .` does not include the `data/tmp/` directory
- If local files/directories are excluded from the build using a `.dockerignore` file, those files/directories are not accessible by commands in the Dockerfile since the files/directories have been excluded from the build.
- `.dockerignore` documentation: https://docs.docker.com/engine/reference/builder/#dockerignore-file

### Quiz

- the `COPY` instruction does not require an absolute path for the source as the source is relative to the `docker image build` command.
- The docker client sends files and folders beneath the build context to the Docker daemon so you can include them in your image at build time.
- You can specify multiple files to copy with the `COPY` instruction only if the destination is a directory and ends with a `/`.
- The only files that the `COPY` and `ADD` instructions can copy into an image are all the files that are sent with the build context.