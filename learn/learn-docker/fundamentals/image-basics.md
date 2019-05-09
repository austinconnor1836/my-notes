### Image Basics

#### What is an Image

Container Image is used to package an application into a portable and executable format. Also, it packages everything the application needs to run: system libraries, dependencies, etc.

Container is the runtime construct of the Container Image.

#### Managing images

List all images: `docker image ls`

Downloading images (pulling images): `docker image pull <IMAGE NAME>:[<TAG NAME>]`

#### Repositories and tags

Search repositories: Go to `hub.docker.com` and search for the image package.

An Image Repository can contain multiple images.

`TAGS` reference `IMAGE ID`. The `TAG` can be defined with a user-defined string. There can be multiple tags for a given Image ID.

#### Registries

What is Docker Hub? It is a front-end for a so called image registry.

Other image registries exist, but Docker Hub is the default.

Only `private` repositories are vetted by Docker, Inc.

#### Docker Store

Docker Store has superseded Docker Hub (store.docker.com).

It is more than Docker Hub: has different versions of docker and a marketplace where people can sell images.

#### Docker Login

`docker login`

#### Creating Images

In `Dockerfile`:

- `FROM`: take existing image in repository to build on top of
- `RUN`: executes shell commands in the context of the image
- `CMD`: the default command that runs initially
- `#`: commenting (must be at beginning of line otherwise Docker interprets it as an argument)

To build the image: `docker image build -t <IMAGE NAME>:[<TAG NAME>] <CONTEXT>` where `<CONTEXT>` is the directory where the `Dockerfile` is located.

#### Pushing Images

To share an image on another machine requires pushing an image to a repository.

If we are pushing to Docker Hub, our image must be namespaces. To do this, we have to tag it: `docker image tag myeline:latest aconnor14/myalpine:latest`

Then push to our repository: `docker image push aconnor14/myalpine:latest`

#### Using a 3rd Party Registry

`docker image tag aconnor14/myalpine:latest <DOMAIN NAME>/aconnor14/myalpine:latest`

`docker image pull <DOMAIN NAME>/aconnor14/myalpine:latest`

#### Quiz

Dockerfiles describe how to build an image step by step.

The Docker file instruction `RUN` will execute a shell command in the context of the image while building it.