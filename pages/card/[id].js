import { useRouter } from 'next/dist/client/router'
import React, { useContext, useEffect, useState } from 'react'

import FormCard from "../../components/Card/FormCard"
import { TasksContext } from '../../contexts/TasksContext'

const id = () => {

    const { state } = useContext(TasksContext);
    const router = useRouter();
    const [queryId, setQueryId] = useState();

    useEffect(() => {
        if (!router.isReady) return;
        {
            console.log(router.query.id);
            state.forEach(section => {
                // console.log(section);
                section.forEach(task_ => {
                    // console.log(task_.id);
                    if (task_.id == router.query.id) {
                        // let uno = [...queryId];
                        // uno.push(task_);
                        // console.log(uno)
                        setQueryId(task_);
                    }
                });
            });
        }
    }, [router.query])

    return (
        <div>
            {
                (typeof queryId !== "undefined") ? <FormCard task={queryId} /> : null
            }
            
        </div>
    )
}

export default id