import React, { useContext, useState } from 'react'
import styles from "./FormCard.module.scss"

import Link from 'next/link'
import dayjs from 'dayjs'
import MyButton from '../Dsys/MyButton'
import FormCardPopAddUsers from './FormCardPopAddUsers'
import FormCardPopAddCategories from './FormCardPopAddCategories'

import { TextareaAutosize } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import { TasksContext } from '../../contexts/TasksContext'

const FormCard = ({ id }) => {

    const { tasks, categories, users, attachments, comments, addTask, editTask, removeTask } = useContext(TasksContext);

    const task = tasks.find(t => t.id == id);

    const taskCategories = task.categories.map(id => categories.find(c => c.id === id));
    const taskUsers = task.users.map(id => users.find(u => u.id === id));
    const taskAttachments = task.attachments.map(id => attachments.find(a => a.id === id));
    const taskComments = task.comments.map(id => comments.find(c => c.id === id));

    const date = dayjs(task.creationDate).locale('es').format('MMM DD YYYY');

    const [popOpened, setPopOpened] = useState(false)
    const [popOpenedCategories, setPopOpenedCategories] = useState(false)
    const menuClasses = [
        "menu",
        popOpened ? "opened" : null,
    ].join("")

    const menuClasses2 = [
        "menu",
        popOpenedCategories ? "openedCategories" : null
    ].join("")

    const togglePop = () => {
        setPopOpened(!popOpened)
    }

    const togglePopCategories = () => {
        setPopOpenedCategories(!popOpenedCategories)
    }

    //   const MyButton = React.forwardRef(({ onClick, href }, ref) => {
    //     return (
    //       <a href={href} onClick={onClick} ref={ref}>
    //         Click Me
    //       </a>
    //     )
    //   })

    /*---AÑADIR USERS---*/

    const [addUsers, setAddUsers] = useState(taskUsers)
    const addUser = (u) => {
        // construimos un array nuevo
        const newUsers = [...addUsers]
        newUsers.push(u)

        // lo seteamos
        setAddUsers(newUsers)
    }

    return (
        <div className={styles.bg_card}>
            <div className={styles.card}>
                <div className={styles.card_header}>
                    <Link href="/" passHref>
                        <MyButton theme="default" content="icon">
                            <CloseIcon fontSize="small" />
                        </MyButton>
                    </Link>
                </div>
                <div className={styles.card_content}>
                    <div className={styles.card_title}>
                        <input id="title" name="title" type="text" className={styles.title}
                                    placeholder="Title" value={task.title} disable="true" />
                    </div>
                    <div className={styles.creation_date}>
                        <div className={styles.clock}>
                            <AccessTimeOutlinedIcon className={styles.icon} />
                        </div>
                        <h4 className={styles.date}>{date}</h4>
                    </div>
                </div>
                <div className={styles.users_and_categories}>
                    <div className={styles.users}>
                        {
                            addUsers.map((user, i_) => (
                                <div className={styles.user} key={i_}>
                                    <img src={"../" + user.pic} alt={user.name} />
                                </div>
                            ))
                        }
                        <div className={styles.pop_add}>
                            <MyButton theme="default" content="icon" onClick={togglePop}>
                                <AddRoundedIcon fontSize="small" />
                            </MyButton>
                            <div className={styles[menuClasses]} >
                                <FormCardPopAddUsers addUser={addUser} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.categories}>
                        {
                            taskCategories.map((category, i_) => (
                                <div key={i_} className={styles.category} style={{background: `${category.color}`}}></div>
                            ))
                        }
                        <div className={styles.pop_add}>
                            <MyButton theme="default" content="icon" onClick={togglePopCategories}>
                                <AddRoundedIcon fontSize="small" />
                            </MyButton>
                            <div className={styles[menuClasses2]}>
                                <FormCardPopAddCategories />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.description}>
                    <h4 className={styles.title}>Description:</h4>
                    <TextareaAutosize id="description" name="description" minRows="3" maxRows="5" className={styles.text} placeholder='Add a comment...' />
                </div>
                {
                    task.pic ?
                        (
                            <div className={styles.picture}>
                                <img src={"../" + task.pic} alt="task_pic" />
                            </div>
                        ) : ""
                }
                <div className={styles.attatched_files}>
                    <div className={styles.attached_header}>
                        <AttachFileOutlinedIcon className={styles.icon} />
                        <h4 className={styles.title}>Attachment:</h4>
                    </div>
                    <div className={styles.attached_content}>
                        {
                            taskAttachments.map((attachment, i_) => (
                                <div className={styles.file} key={i_}>
                                    <h5 className={styles.text}>{attachment.title}</h5>
                                </div>
                            ))
                        }
                        <MyButton theme="default" content="icon">
                            <AddRoundedIcon fontSize="small" />
                        </MyButton>
                    </div>
                </div>
                <div className={styles.comments}>
                    <div className={styles.comments_header}>
                        <ChatBubbleOutlineRoundedIcon className={styles.icon} />
                        <h4 className={styles.title}>Comments:</h4>
                    </div>
                    <div className={styles.comments_content}>
                        {
                            taskComments.map((comment, i_) => (
                                <div className={styles.comment} key={i_}>
                                    <div className={styles.user}>
                                        <img src={"../" + users[comment.user].pic} alt={users[comment.user].name} />
                                    </div>
                                    <h5 className={styles.text}>{comment.text}</h5>
                                </div>
                            ))
                        }
                        <form className={styles.form}>
                            <div className={styles.user}>
                                {/* <img src={"../" + users[3].pic} alt={users[3].name} /> */}
                            </div>
                            <div className={styles.msg_input}>
                                <input className={styles.input_control} type="text" name="newMsg" placeholder="Add new comment..." />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={styles.card_footer}>
                <MyButton type="button" content="text" theme="primary" onClick={() => {editTask(task)}}>
                    <h5 className={styles.add}>Add</h5>
                </MyButton>
                <MyButton type="reset" content="text" theme="secondary" >
                    <h5 className={styles.delete}>Delete</h5>
                </MyButton>
            </div>
        </div>
    )
}
export default FormCard