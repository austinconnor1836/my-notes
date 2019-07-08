import React, { createContext, useState } from 'react'
import './App.css'
import TableOfContents from './components/table-of-contents/TableOfContents'
import Notes from './components/Notes'

export const TableOfContentsContext = createContext(
  [
    {
        id: 1,
        content: {
            section: {
                title: "Section 1.1: What is the Internet",
                isActive: false
            }
        }
    },
    {
        id: 2,
        content: {
            section: {
                title: "Section 1.2: The Network Edge",
                isActive: false
            }
        }
    }
  ]
);

function App() {
  return (
    <div className={'App'}>
      <TableOfContentsProvider>
        <TableOfContents />
        <Notes />
      </TableOfContentsProvider>
    </div>
  )
}

const TableOfContentsProvider = (props) => {
  const [state, setState] = useState(TableOfContentsContext)

  return (
    <TableOfContentsContext.Provider value={[state, setState]}>
      {props.children}
    </TableOfContentsContext.Provider>
  )
}

export default App
