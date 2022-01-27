import React, { useContext } from "react";
import styles from './Home.module.scss';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TasksContext } from "../../contexts/TasksContext";

import SearchBox from "./SearchBox";
import SectionHeader from "./SectionHeader"
import SectionContent from "./SectionContent"
import SectionFooter from "./SectionFooter"

const Home = () => {

    const { state, onDragEnd, addNewSection } = useContext(TasksContext);

    return (
        <div className={styles.home}>
            <SearchBox addNewSection={addNewSection}/>
            <div className={styles.sections}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {
                        state.map((column, index) => (
                            <Droppable key={index} droppableId={`${index}`}>
                                {(provided) => (
                                    <section className={styles.section} ref={provided.innerRef} {...provided.droppableProps}>
                                        <SectionHeader index={index} />
                                        <SectionContent column={column} />
                                        {provided.placeholder}
                                        <SectionFooter index={index} />
                                    </section>
                                )}
                            </Droppable>
                        ))
                    }
                </DragDropContext>
            </div>
        </div>
    )
}

export default Home
