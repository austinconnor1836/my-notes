import React, { useContext } from 'react'
import { TableOfContentsContext } from '../../App'

const List = () => {
    const listItems = useContext(TableOfContentsContext)
    
    return (
        <div className={'list'}>
            {listItems.map((item) => {
                return (
                    <a key={item.id} className={'listItem'}>{item.content.section.title}</a>
                )
            })}
        </div>
    )
}

export default List