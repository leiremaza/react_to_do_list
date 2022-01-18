import React from 'react'
import styles from "./SectionContent.module.scss"

import SingleCard from "./SingleCard"
import { Draggable } from 'react-beautiful-dnd'

const SectionContent = ({column}) => {

    return (
        <div className={styles.section_content}>
            {
                column.map((task, index) => (
                    <Draggable key={index} draggableId={`${task.id}`} index={index}>
                        {(provided) => (
                            <SingleCard index={task.id} provided={provided}/>
                        )}
                    </Draggable>
                ))
            }
        </div>
    )
}

export default SectionContent
