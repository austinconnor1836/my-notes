
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
