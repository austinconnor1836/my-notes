# Chapter 1: Introduction to the Basics of RESTful Architecture

## Learning about Web 3.0

Web 3.0 is generally referred to as executing semantic web, or read-write-execute web.

The semantic web layers are **Static Web**, **Translations**, and **Rich Internet Applications (RIA)** or **Rich Web**.

![semantic layers](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/semantic-layers.png)

## Learning about web service architecture

Standardized communication protocols:

- **XML/JSON**: provides metadata for the data that it contains
- **SOAP (Simple Object Access Protocol)**: used to transfer data
- **WSDL**: used for defining available services to be consumed
- **UDDI**: has the list of services available

**Web services architecture (WSA)** has three significant roles:

- **Service Provider**
- **Service Consumer**
- **Service Broker**

![WSA](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/wsa.png)

The **Service Requestor** finds the **Service Provider** through **UDDI**, and contacts the provider using the **Simple Object Access Protocol (SOAP)**. The **Service Provider** then validates the service request and responds to the requestor with XML/JSON as a service response.

## Discussing the web API

We have yet to touch upon REST-based communication.

RESTful APIs do not use/require XML-based web service protocols, such as SOAP or WSDL, to support their interfaces, but they use simplified representations instead.