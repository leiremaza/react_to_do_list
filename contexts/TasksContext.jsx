import React, { createContext, useEffect, useState } from 'react'

export const TasksContext = createContext();

const TasksContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [state, setState] = useState([]);
    const [sections, setSections] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [comments, setComments] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    const groupTasksBySections = (array) => array.reduce(function (r, a) {
        r[a.section] = r[a.section] || [];
        r[a.section].push(a);
        return r;
    }, []);

    useEffect(async () => {
        const data = await fetch("http://localhost:3000/tasks").then(d => d.json()).then(d => d.data);
        setTasks(data);
        setState(groupTasksBySections(data));
        data = await fetch("http://localhost:3000/sections").then(d => d.json()).then(d => d.data);
        setSections(data);
        data = await fetch("http://localhost:3000/users").then(d => d.json()).then(d => d.data);
        setUsers(data);
        data = await fetch("http://localhost:3000/categories").then(d => d.json()).then(d => d.data);
        setCategories(data);
        data = await fetch("http://localhost:3000/attachments").then(d => d.json()).then(d => d.data);
        setAttachments(data);
        data = await fetch("http://localhost:3000/comments").then(d => d.json()).then(d => d.data);
        setComments(data);
        setDataLoaded(true);
    }, [])

    /***********************************/
    /*              Tasks              */
    /***********************************/

    const addTask = async (task) => {

        const url = "http://localhost:3000/tasks";
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: "Holaaaaaa",
                description: "Hacer la compra",
                creationDate: "2022-01-17T13:28:53.782Z",
                users: [0, 3, 4],
                categories: [0, 2],
                attachments: [1, 2],
                comments: [2, 4],
                pic: "",
                section: 2
            })
        };

        setDataLoaded(false);

        await fetch(url, requestOptions).then(d => d.json()).then(d => d.data);
        const data = await fetch("http://localhost:3000/tasks").then(d => d.json()).then(d => d.data);
        setTasks(data);
        setState(groupTasksBySections(data));

        setDataLoaded(true);
    }

    const editTask = async (task) => {

        const url = "http://localhost:3000/tasks/" + task.id;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: "Adios",
                description: "Hacer la compra",
                creationDate: "2022-01-17T13:28:53.782Z",
                users: [0, 3, 4],
                categories: [0, 2],
                attachments: [1, 2],
                comments: [2, 4],
                pic: "",
                section: 3
            })
        };

        setDataLoaded(false);

        await fetch(url, requestOptions).then(d => d.json()).then(d => d.data);
        const data = await fetch("http://localhost:3000/tasks").then(d => d.json()).then(d => d.data);
        setTasks(data);
        setState(groupTasksBySections(data));

        setDataLoaded(true);
    }

    const removeTask = async (id) => {

        const url = "http://localhost:3000/tasks/" + id;
        const requestOptions = {
            method: 'DELETE'
        };

        setDataLoaded(false);

        await fetch(url, requestOptions).then(d => d.json()).then(d => d.data);
        const data = await fetch("http://localhost:3000/tasks").then(d => d.json()).then(d => d.data);
        setTasks(data);
        setState(groupTasksBySections(data));

        setDataLoaded(true);
    }

    /***********************************/
    /*             Sections            */
    /***********************************/


    /***********************************/
    /*              Users              */
    /***********************************/


    /***********************************/
    /*           Categories            */
    /***********************************/


    /***********************************/
    /*           Attachments           */
    /***********************************/


    /***********************************/
    /*            Comments             */
    /***********************************/


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
        dataLoaded,
        tasks, addTask, editTask, removeTask,
        sections,
        users,
        categories,
        attachments,
        comments,
        state, onDragEnd,
    }

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksContextProvider
