import React, { createRef } from 'react'
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
    const labelComment = React.createRef("");

    const labelTitle = React.createRef("");
    const labelDescription = React.createRef("");
    const labelAttached = React.createRef("");
    const labelPic = React.createRef("");



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

    /*---AÑADIR CATEGORY---*/

    const [addCategories, setAddCategories] = useState(categories)
    const addCategory = (cat) => {
        console.log(cat)
        // construimos un array nuevo
        const newCategories = [...addCategories]
        newCategories.push(cat)

        // lo seteamos
        setAddCategories(newCategories)
    }

    /*---AÑADIR COMENTARIO---*/
    const [addComments, setAddComments] = useState(comments)
    const addComment = () => {

        if (labelComment.current.value !== "") {
            const newComments = [...addComments];
            newComments.push({
                id: (comments.length),
                text: labelComment.current.value,
                user: 3
            }
            );
            setAddComments(newComments);
            labelComment.current.value = ""
            console.log(newComments)
        }


    }
    /*--EDITAR TASKS--*/
    const editTask = () => {
        console.log(task)
        const newTask =
        {
            id: task.id,
            title: (labelTitle.current.value == "" ? task.title : labelTitle.current.value),
            description: labelDescription.current.value,
            users: addUsers,
            categories: addCategories,
            attached: attached,
            comments: addComments,
            pic: ""
        }
        console.log(newTask)

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
                            placeholder={task.title} ref={labelTitle} />
                    </div>
                    <div className={styles.creation_date}>
                        <div className={styles.clock}>
                            <AccessTimeOutlinedIcon className={styles.icon} />
                        </div>
                        <h4 className={styles.date}>{date}</h4>
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
                                    <FormCardPopAddUsers addUser={addUser} addUsers={addUsers} />
                                </div>


                                <div className={styles.pop_add}>
                                    <MyButton theme="default" content="icon" onClick={togglePop}>
                                        <AddRoundedIcon fontSize="small" />
                                    </MyButton>
                                    <div className={styles[menuClasses]} >
                                        <FormCardPopAddUsers addUser={addUser} />
                                    </div>
                                </div>
                                <div className={styles.categories}>
                                    {
                                        addCategories.map((category, i_) => (
                                            <div key={i_} className={categoriesClass.concat(styles[category.color])}></div>
                                        ))
                                    }
                                    <div className={styles.pop_add}>
                                        <MyButton theme="default" content="icon" onClick={togglePopCategories}>
                                            <AddRoundedIcon fontSize="small" />
                                        </MyButton>
                                        <div className={styles[menuClasses2]}>
                                            <FormCardPopAddCategories addCategory={addCategory} addCategories={addCategories} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.description}>
                                <h4 className={styles.title}>Description:</h4>
                                <TextareaAutosize id="description" name="description" minRows="3" maxRows="5" className={styles.text} placeholder='Add a comment...' ref={labelDescription} />
                            </div>
                            {
                                task.pic ?
                                    (
                                        <div className={styles.picture}>
                                            <img src={"../" + task.pic} alt="task_pic" />
                                        </div>
                                    ) : ""
                            }
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
                            <div className={styles.comments}>
                                <div className={styles.comments_header}>
                                    <ChatBubbleOutlineRoundedIcon className={styles.icon} />
                                    <h4 className={styles.title}>Comments:</h4>
                                </div>

                                <div className={styles.comments_content}>
                                    {
                                        addComments.map((comment, i_) => (
                                            <div className={styles.comment} key={i_}>
                                                <div className={styles.user}>
                                                    <img src={"../" + users_[comment.user].pic} alt={users_[comment.user].name} />
                                                </div>
                                                <h5 className={styles.text}>{comment.text}</h5>
                                            </div>
                                        ))
                                    }

                                    <div className={styles.form}>
                                        <div className={styles.user}>
                                            <img src={"../" + users_[3].pic} alt={users_[3].name} />
                                        </div>
                                        <div className={styles.msg_input}>
                                            <input className={styles.input_control} type="text" placeholder="Add new comment..." ref={labelComment} />
                                        </div>
                                        <MyButton content="text" theme="primary" onClick={addComment}>
                                            <h5 className={styles.add}>Send</h5>
                                        </MyButton>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={styles.card_footer}>
                            <Link href="/" passHref>
                                <MyButton type="button" content="text" theme="primary" onClick={editTask}>
                                    <h5 className={styles.add}>Save</h5>
                                </MyButton>
                            </Link>
                            <Link href="/" passHref>
                                <MyButton type="reset" content="text" theme="secondary" >
                                    <h5 className={styles.delete}>Cancel</h5>
                                </MyButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormCard