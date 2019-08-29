# Cloud Computing Concepts, Part 1

## Week 1, Lesson 2: Clouds are Distributed Systems

### 2.1 A cloud IS a distributed system

#### A Cloud...

- A cloud consists of
  - Hundreds to thousands of machines in a datacenter (server side)
  - Thousands to millions of machines accessing these services (client side)
- Servers communicate amongst one another
- Clients communicate with servers
- Clients also communicate with each other

#### A Cloud... IS a Distributed System

- Servers communicate amongst one another => a Distributed System
  - Essentially a cluster!
- Clients communicate with servers
  - Also a distributed system!
- Clients may also communicate with each other
  - In peer-to-peer systems like BitTorrent
  - Also a distributed system!



Cloud is a new nickname for distributed systems.



### 2.2 What is a distributed system?

#### What is an Operating System?

- User interface to hardware (device drivers)
- Provides abstractions (processes, file system)
- Resource manager (scheduler)
- Means of communication (networking)
- ...

#### Examples of Distributed Systems

- Client communicating with a server
- BitTorrent (peer to peer overlay)
- The Internet
- The Web (servers and clients)
- Hadoop
- Datacenters

#### A Working (good enough for this course) Definition of "Distributed System"

*A distributed system is a collection of entities, each of which is **autonomous**, **programmable**, **asynchronous**, and **failure-prone**, and which communicate through an **unreliable** communication medium*.

#### Distributed System = Many Processes Sending and Receiving Messages

#### In Solving These Problems, Many Challenges Abound...

- **Failures**: no longer the exception, but rather a norm
- **Scalability**: 1000s of machines, Terabytes of data
- **Asynchrony**: clock skew and clock drift
- **Concurrency**: 1000s of machines interacting with each other accessing the same data





