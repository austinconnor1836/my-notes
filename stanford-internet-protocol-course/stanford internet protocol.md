## stanford internet protocol

- Bidirectional, reliable byte stream
- Abstracts away entire network - just a pipe between two programs
- Application level controls communication pattern and payloads
  - World Wide Web (HTTP)
  - Skype
  - BitTorrent



### The 4 Layer Internet Model

![4-layer-internet-model](C:\Users\debes\repos\4-layer-internet-model.PNG)



### The network layer is "special"

- We must use the Internet Protocol (IP)
- network layer provides unreliable diagram
- For a guaranteed transmission, then a **Transport** layer is required (TCP)
- TCP: Transmission Control Protocol
- UDP: User Datagram Protocol
  - offers no delivery guarantees

#### Application layer

### Lecture 3: The IP Service Model

#### An Introduction to Computer Networks

##### IP Service Model

| Property           | Behavior                                           |
| ------------------ | -------------------------------------------------- |
| **Datagram**       | Individually routed packets. Hop-by-hop routing.   |
| **Unreliable**     | Packets might be dropped.                          |
| **Best effort**    | ...but only if necessary.                          |
| **Connectionless** | No per-flow state. Packets might be mis-sequenced. |

A lot like the U.S. Postal Service.

- no guarantee that message will be transmitted correctly
- uses routing posts to route mail

The IP service is so simple because:

- it is faster, more streamlined and lower cost to build and maintain
- The end-to-end principle: place as much intelligence at the endpoints
- allows a variety of reliable (or unreliable) services to be built on top.
- works over any link layer: IP makes very few assumptions about the link layer below.

##### The IP Service Model (Details)

1. Tries to prevent packets looping forever.
2. Will fragment packets if they are too long
   1. some routers have smaller data size limits so the connecting router will fragment the data into smaller datagrams.
3. Uses a header checksum to reduce chances of delivering datagram to wrong destination
4. Allows for new versions of IP
   1. Currently IPv4 with 32 bit addresses
   2. And IPv6 with 128 bit addresses
5. Allows for new options to be added to header.



The IP Service doesn't do a lot.

##### Summary

We use IP every time we send and receive datagrams.

IP provides a deliberately simple service:

- Datagram
- Unreliable
- Best-effort
- Connectionless

#### Lecture 4: Life of a Packet

- Application Layer: stream of data
- Transport Layer: segments of data
- Network Layer: packets of data

Almost all web traffic is over TCP, the Transport Control Protocol.

#### TCP Byte Stream

- "3-way handshake"

1. Client to Server: sends a synchronize message, "SYN"
2. Server to Client: sends a synchronize and acknowledge message, "SYN/ACK"
3. Client to Server: sends an acknowledge message, "ACK"

**The Network Layer is responsible for delivering packets to computers.**

**The Transport Layer is responsible for delivering data to applications.**

From the perspective of the network layer, packets sent to different applications on the same computer look the same. This means that to open a TCP stream to another program, we need two addresses. 

- **Application Layer**: The first, an Internet Protocol address, is the address the network layer uses to deliver packets to the computer.
- **Transport Layer**: The second, the TCP port, tells the computer's software which application to deliver data to.

A "**hop**" is a (wired) link connecting two routers.

