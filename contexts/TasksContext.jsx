import React, { createContext, useEffect, useState } from 'react'

export const TasksContext = createContext();

const TasksContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [state, setState] = useState([]);
   
    const groupTasksBySections = (array) => array.reduce(function (r, a) {
        r[a.section] = r[a.section] || [];
        r[a.section].push(a);
        return r;
    }, []);

    useEffect(async () => {
        /*let url = "http://localhost:3000/tasks";
        let param = {
            headers: {
                "Content-type":"application/json; charset= UTF-8"
            },
            method: "GET"
        }
        try {
            let data = await fetch(url, param);
            let result = await data.json;
            console.log(result);
        }
        catch(error) {
            console.log(error);
        }*/
        const todos = await fetch("http://localhost:3000/tasks").then(d => d.json()).then(d => d.todos);
        console.log(todos);
        /*setTasks(todos);
        setState(groupTasksBySections(todos));*/
    }, [])

    /***********************************/
    /*              Tasks              */
    /***********************************/

   /*const addTask = (task) => {
        const newTasks = [...tasks];
        newTasks.push(task);
        setTasks(newTasks);
        setState(groupTasksBySections(newTasks));
    }

    const editTask = (task) => {
        const newTasks = [...tasks];
        const index = newTasks.findIndex(task => task.id == id);
        newTasks.splice(index - 1, 1, task);
        setTasks(newTasks);
        setState(groupTasksBySections(newTasks));
    }

    const deleteTask = (id) => {
        const newTasks = [...tasks];
        const index = newTasks.findIndex(task => task.id == id);
        newTasks.splice(index, 1);
        setTasks(newTasks);
        setState(groupTasksBySections(newTasks));
    }*/

    const removeTask = async (id) => {
        console.log(id);
        await fetch({
            url: "http://localhost:3000/tasks/" + id,
            method: "DELETE"
        });
        const todos = await fetch("http://localhost:3000/tasks").then(d => d.json()).then(d => d.todos);
        setTasks(todos);
        setState(groupTasksBySections(todos));
    }

    /***********************************/
    /*              State              */
    /***********************************/

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

    const value = {
        tasks,
        state,
        onDragEnd,
        removeTask
    }

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksContextProvider
