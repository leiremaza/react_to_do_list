import React, { createContext, useState } from 'react'
import { sections as sections_} from './../models/sections'
import { tasks as tasks_ } from './../models/tasks'

export const TasksContext = createContext();

const TasksContextProvider = ({ children }) => {

    const [sections, setSections] = useState([sections_[0], sections_[1], sections_[2], sections_[3]]);
    const tasks = sections.map(section => section.tasks.map(taskId => tasks_.find(task => task.id === taskId)));
    const [state, setState] = useState([tasks[0], tasks[1], tasks[2], tasks[3]]);
    //const [state, setState] = useState([sections_[0], sections_[1], sections_[2], sections_[3]]);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result
    };

    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState.filter(group => group.length));
        }
    }

    const addNewSection = () => {
        setState([...state, []]);
    }

    const addNewTask = () => {
        setState([...state, getItems(1)]);
    }

    const deleteTask = (index) => {
        const newState = [...state];
        newState[index].splice(index, 1);
        setState(
            newState.filter(group => group.length)
        );
    }

    const value = {
        sections,
        state,
        onDragEnd, 
        addNewSection,
        addNewTask,
        deleteTask,
    }

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksContextProvider
