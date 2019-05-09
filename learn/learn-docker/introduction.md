### Learn Docker

#### Introduction

Docker helps **developing**, **deploying**, and **running the application**.

Imagine making an application a **_package_**. You can take the application package and move it around different environments. It will always run the same using software container technology.

What are **containers**?

Portable and executable packages that contain an application and all of its application dependencies. Those packages are called **container images**.

In the end, containers are just **processes** on an operating system. Docker handles isolating it. It still shares the kernel with other processes.

**Differences between Containers and Virtual Machines**

**VM**:

- Heavyweight
- separates on the hardware level
- ==has its own operating system and kernel, so it has to go through a costly boot process==
- the operating system will consume resources that were assigned to the VM
- a lot of cases, ships libraries, system utilities and services whether you want them or not

**Containers**: 

- ==are just processes on an operating system, no boot process, just run==
- lightweight
- packages/images that power the container only ship with exactly what is needed for the application

#### A Developer's Perspective

Dependency Hell

Often multiple applications are developed on the same system, each with their own dependencies. Sometimes the dependencies interfere with each other (different versions of a system library).

Docker can solve version problems. You can run one version for a certain application inside its own container image and another version inside another docker container.

##### Onboarding For New Developers

Very easy now. They don't have to instlal many tools like a Database Management System, system libraries, runtime for a language. All they will need is Docker.

They will be able to build a new version of the application and release it.

##### Documentation

Easy to understand file formats to describe steps necessary to get the application up and running. Free documentation for every step in the process.

##### Identical Environments

The common problem "It works fine on my machine."

Docker solves this by including the same dependencies and libraries wherever it is instantiated.

#### Unified Systems

Container Image contains everything the application needs to run, including dependencies and language frameworks.

We don't have to care about languages or dependencies any more.

##### Statelessness

In an ideal world, containers are stateless. There will be nothing in the container that you care about. It becomes disposable. This allows you to build **fault-tolerant** systems.

Also makes scaling way easier. All you have to do is stop and start containers.

##### Identical Environments

The container image contains all the necessary system libraries and dependencies so it can be run anywhere on any machine.

#### Why Docker?

Docker gives us the tools to work with containers easily.

### 2 Types of Containers

**Windows** and **Linux Containers**

Windows containers has to run on Windows and Linux Containers on Linux.

You don't have to run Linux natively on your system.

Docker provides installers for Windows and MacOS that can automatically setup a virtual machine for you that runs Linux.

Docker itself is a client-server application. Docker client will always be installed natively on your system. All the commands will be exactly the same no matter where you run the server part of Docker.

### Docker Community Edition vs. Enterprise Edition

Docker CE uses open-source components.

Docker is built using <a href="https://mobyproject.org">Moby</a>.

**Moby**: open-source project around Docker. Moby is not a software container platform itself but a system to assemble those platforms. It is a framework that contains many components that modern container-based systems use.

### Docker Engine

3 Main parts:

- A server which is a type of long-running program called a daemon process (the `dockerd` command).
- A REST API which specifies interfaces that programs can use to talk to the daemon and instruct it what to do.
- A command line interface (CLI) client (the `docker` command).