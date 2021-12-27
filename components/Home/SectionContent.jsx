import React from 'react'
import styles from "./SectionContent.module.scss"

import SingleCard from "./SingleCard"
import { Draggable } from 'react-beautiful-dnd'

const SectionContent = ({section}) => {

    return (
        <div className={styles.section_content}>
            {
                section.map((task, index) => (
                    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                        {(provided) => (
                            <SingleCard task={task} provided={provided}/>
                        )}
                    </Draggable>
                ))
            }
        </div>
    )
}

export default SectionContent
