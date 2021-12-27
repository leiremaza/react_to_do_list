import { useRouter } from 'next/dist/client/router'
import React, { useContext, useEffect } from 'react'

import FormCard from "../../components/Card/FormCard"
import { TasksContext } from '../../contexts/TasksContext'

const id = () => {

    let task;

    const { state } = useContext(TasksContext);
    const { query } = useRouter();

    useEffect(() => {
        if(typeof query.id !== "undefined")
        {
            console.log(query.id);
            state.forEach(section => {
                // console.log(section);
                section.forEach(task_ => {
                    // console.log(task_.id);
                    if (task_.id == query.id) {
                        task = task_;
                        console.log(task);
                    }
                });
            });
        }
    }, [query])

    return (
        <div>
            { 
                (typeof task !== "undefined") ? <FormCard task={task} /> : null
            }
        </div>
    )
}

export default id