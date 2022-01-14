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
            state.forEach(section => {
                section.forEach(task_ => {
                    if (task_.id == router.query.id) {
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