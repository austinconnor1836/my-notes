# Full Stack for Frontend Engineers

**DNS**: Domain Name System

- "Phone book"
- maps `austinconnor.info` to 192.xxx.xxx.xxx
- Local cache
  - Netflix, Hulu, etc.
- LAN DNS server
- ISP DNS server
- LAN: Local Area Network
- ISP: Internet Service Provider



### Cache Poisoning

- What if someone copies my site completely? How would they know they are on the real server?
- Use HTTPS: a handshake that says you are who you say you are

ICMP: Internet Control Message Packet



## Vim

What is VIM? **VIM - VI Improved**

Why use it? **Servers don't have GUI's**

VIM has three main modes:

1. command mode
2. insert mode
3. last-line mode

Most UNIX servers come with VIM



## SSH

Authentication (2 ways):

1. username/password
2. SSH key

### SSH Key

Your computer: private key

Server: public key

**Public key always lives on the server. Everyone can know that.**



## Setting up a VPS

- Web server
- Database server
- Storage server

**VPS**: Virtual Private Server

Two main types of servers:

1. Dedicated server (own entire machine $$$$)
2. VPS (purchases a portion of a server)



`top`: task manager on Ubuntu

`htop`: will be installed on most Linux distributions

Add user to `sudo` group: `usermod -aG sudo $USERNAME`

Login into `$USERNAME`: `su aconnor`

Execute last command using `sudo` "Bang Bang": `sudo !!`



## Getting a Domain Name

