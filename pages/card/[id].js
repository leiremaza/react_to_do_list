import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/dist/client/router'
import { TasksContext } from '../../contexts/TasksContext'
import FormCard from "../../components/Card/FormCard"

const id = () => {

    const router = useRouter();
    const { dataLoaded } = useContext(TasksContext);
    const [winReady, setwinReady] = useState(false);
    const [id, setId] = useState();

    useEffect(() => {
        if (!router.isReady) return;
        setId(router.query.id);
        setwinReady(true);
    }, [router.query]);

    return (
        <div>
            {
                (winReady & dataLoaded) ? <FormCard id={id} /> : null
            }
        </div>
    )
}

export default id