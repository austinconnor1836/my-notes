
Perry and Wolf defines a software architecture as a set of architectural *elements* that have a particular *form*, explicated by a set of *rationale*.

Architectural elements include processing, data, and connecting elements.

Form is defined by the properties of the elements and the relationships among the elements-that is, the constraints on the elements.

The rationale provides the underlying basis for the architecture by capturing the motivation for the choice of architectural style, the choice of elements, and the form.

Rationale is replaced with architectural properties in this system.

Perry and Wolf model:
- *Processing elements*: those that perform transformations on data
- *Data elements*: those that contain the information that is used and transformed
- *Connecting elements*: the glue that holds the different pieces of the architecture together

#### 1.2.1 Components
**Component**: an abstract unit of software instructions and internal state that provides a transformation fo data via its interface.

Perry and Wolf's processing elements are defined as those components that supply the transformation on the data elements.

A component in our system is defined by its interface and the services it provides to other components, rather than by its implementation behind the interface.

#### 1.2.2 Connectors
**Connector**: an abstract mechanism that mediates communication, coordination, or cooperation among components.

Examples include shared representations, remote procedure calls, message-passing protocols, and data streams.

Connectors enable communication between components by transferring data elements from one interface to another without changing the data. The external behavioral abstraction captured by the architecture ignores those details.

In contrast, a component may, but not always will, transform data from the external perspective.

#### 1.2.3 Data
**Datum**: an element of information that is transferred from a component, or received by a component, via a connector.

Example not included as data is information that is permanently resident or hidden within a component.

Components can also generate data, as in the case of a software encapsulation of a clock or sensor.

### 1.3 Configuration
**Configuration**: the structure of architectural relationships among components, connectors, and data during a period of system run-time.

### 1.4 Properties
Properties are induced by the set of constraints within an architecture.

The goal of architectural design is to create an architecture with a set of architectural properties that form a superset of the system requirements.

### 1.5 Styles
**Architectural Style**: a coordinated set of architectural constraints that restricts the roles/features of architectural elements and the allowed relationships among those elements within any architecture that conforms to that style.

Styles are a mechanism for categorizing architectures and for defining their common characteristics.

Style does not refer to the personalization of the design process.

Since referring to a named set of constraints as a style makes it easier to communicate the characteristics of common constraints, we use architectureal styles as a method of abstraction, rather than as an indicator of personalized design.

### 1.6 Patterns and Pattern Languages
A design patter is defined as an important and recurring system construct.

A pattern language is a system of patterns organized in a structure that guides the patterns' application.

A primary benefit of patterns is that they can describe relatively complex protocols of interactions between objects as a single abstraction, thus including both constraints on behavior and specifics of the implementation.

### 1.7 Views
*An architectural viewpoint is often application-specific and varies widely based on the application domain...*

### 1.8 Related Work
The object-oriented programming community has taken the lead in producing catalogs of design patterns, as exemplified by the "Gang of Four" book and the essays edited by Coplien and Schmidt [33].

Software design patterns tend to be more problem-oriented than architectural styles.

## Chapter 2: Newtwork-based Application Architectures
### 2.1 Scope
This dissertation examines the highest level of abstraction in software architecture, where the interactions among components are capable of being realized in network communication.

#### 2.1.1 Network-based vs. Distributed
The primary distinction between network-based architectures and software architectures in general is that communication between components is restricted to message passing.

#### 2.1.2 Application Software vs. Networking Software
Applications represent the "business-aware" functionality of a system.

Application software architecture is an abstraction level of an overall system, in which the goals of a user action are representable as functional architectural properties.

### 2.2 Evaluating the Design of Application Architectures
One of the goals of this dissertation is to provide design guidance for the task of selecting or creating the most appropriate architecture for a given application domain, keeping in mind that an architecture is the realization of an architectural design and not the design itself.

### 2.3 Architectural Properties of Key Interest
#### 2.3.1 Performance
##### 2.3.1.1 Network Performance
*Throughput* is the rate at which information, including both application data and communication overhead, is transferred between components.

*Overhead* can be separated into initial setup overhead and per-interaction overhead, a distinction which is useful for identifying connectors that can share setup overhead across multiple interactions (*amortization*).

*Bandwidth* is a measure of the maximum available throughput over a given network link.

*Usable bandwidth* refers to that portion of bandwidth which is actually available to the application.

Styles impact network performance by their influence on the number of interactions per user action and the granularity of data elements.

##### 2.3.1.2 User-perceived Performance
*Latency* is the time period between initial stimulus and the first indication of a response.

*Completion* is the amount of time taken to complete an application action.

#### 2.3.2 Scalability
Scalability refers to the ability of the architecture to support large numbers of components, or interactions among components, within an active configuration.

#### 2.3.3 Simplicity
The primary means by which architectural styles induce simplicity is by applying the principle of separation of concerns to the allocation of functionality within components.

#### 2.3.4 Modifiability
Modifiability is about the ease with which a change can be made to an application architecture.

Modifiability can be further broken down into evolvability, extensibility, customizability, configurability, and reusability.

Because the components participating in a network-based application may be distributed across multiple organizational boundaries, the system must be prepared for gradual and fragmented change, where old and new implementations coexist, without preventing the new implementations from making use of their extended capabilities.

##### 2.3.4.1 Evolvability
Evolvability represents the degree to which a component implementation can be changed without negatively impacting other components.

##### 2.3.4.2 Extensibility
Extensibility is defined as the ability to add functionality to a system.

Dynamic extensibility implies that functionality can be added to a deployed system without impacting the rest of the system.

Extensibility is induced within an architectural style by reducing the coupling between components, as exemplified by event-based integration.

##### 2.3.4.3 Customizability
Customizability refers to the ability to temporarily specialize the behavior of an architectural element, such that it can then perform an unusual service.

A componnent is customizable if it can be extended by one client of that component's services without adversely impacting other clients of that component.

##### 2.3.4.4 Configurability
Configurability is related to both extensibility and reusability in that it refers to post-deployment modification of components, or configurations of components, such that they are capable of using a new service or data element type.

##### 2.3.4.5 Reusability
Reusability is a property of an application architecture if its components, connectors, or data elements can be reused, without modification, in other applications.

The primary mechanisms for inducing reusability within architectural styles is reduction of coupling (knowledge of identity) between components and constraining the generality of component interfaces.

#### 2.3.5 Visiblity
Visibility in this case refers to the ability of a component to monitor or mediate the interaction between two other components.
