import React, { useContext, useState } from 'react'
import styles from "./NewSection.module.scss"
import MyButton from '../Dsys/MyButton'
import { TasksContext } from '../../contexts/TasksContext'
import { categories as categories_ } from '../../models/categories'


const NewSection = (props) => {

    
    const { sections, setSections } = useContext(TasksContext)

    const addNewSection = () => {
        console.log(category.current.value)
        const nueva = {
            id: (sections.length - 1),
            title: title.current.value,
            category: Number(category.current.value),
            tasks: []
        }
        const newSections = [...sections];
        newSections.push(nueva);
        console.log(newSections);
        setSections(newSections);
    }
    const title = React.createRef("");
    const category = React.createRef();

    return (
        <div>
            <div className={styles.pop_add_categories}>
            
            <div className={styles.add_categories_search}>
                <label className={styles.title}>Nombre de la sección: </label>
                <input className={styles.input_search} type="text" name="newUser" placeholder="Nombre de la sección"
                ref={title}/>
            </div>
            <div className={styles.add_categories}>
                Categoría:
                <select>
                    {categories_.map((cat,i_) => (
                        <option className={styles.name} key={i_} ref={category}>
                            {i_}
                        </option>
                    ))} 
                </select>   
                    
            </div>
            <MyButton theme="secondary" content="text" style="backgroundColor: white" onClick={addNewSection}>
                Añadir sección
            </MyButton>
        </div>
        </div>
    )
}

export default NewSection
