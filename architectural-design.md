
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


