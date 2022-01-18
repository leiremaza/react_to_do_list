import React, { useContext }  from 'react';
import styles from "./SingleCard.module.scss";

import dayjs from 'dayjs';
import Link from 'next/link';
import { TasksContext } from '../../contexts/TasksContext';
import MyButton from '../Dsys/MyButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';

const SingleCard = (props) => {

    const { tasks, categories, users, attachments, comments, removeTask } = useContext(TasksContext);

    const task = tasks.find(t => t.id === props.index);

    const taskCategories    = task.categories.map(id => categories.find(c => c.id === id));
    const taskUsers         = task.users.map(id => users.find(u => u.id === id));
    const taskAttachments   = task.attachments.map(id => attachments.find(a => a.id === id));
    const taskComments      = task.comments.map(id => comments.find(c => c.id === id));
    
    const date = dayjs(task.creationDate).locale('es').format('MMM DD YYYY');

    return (
        <Link href={'/card/' + task.id} className={styles.link}>
            <article className={styles.card} ref={props.provided.innerRef}{...props.provided.draggableProps}{...props.provided.dragHandleProps} style={props.provided.draggableProps.style}>
                <div className={styles.card_header}>
                    <div className={styles.creation_date}>
                        <div className={styles.time_icon}>
                            <AccessTimeOutlinedIcon className={styles.icon} />
                        </div>
                        <h4 className={styles.date}>{date}</h4>
                    </div>
                    <div className={styles.remove_button} onClick={(e) => {e.stopPropagation(); removeTask(task.id)}}>
                        <MyButton theme="secondary" content="icon">
                            <DeleteOutlinedIcon className={styles.icon} />
                        </MyButton>
                    </div>
                </div>
                <div className={styles.card_title}>
                    <h4 className={styles.title}>{task.title}</h4>
                </div>
                <div className={styles.categories}>
                    {
                        taskCategories.map((category, i_) => (
                            <div key={i_} className={styles.category.concat(styles[category.color])}></div>
                        ))
                    }
                </div>
                {
                    task.pic ?
                        (
                            <div className={styles.picture}>
                                <img src={task.pic} alt="task_pic" />
                            </div>
                        ) : ""
                }
                <div className={styles.card_footer}>
                    <div className={styles.notifications}>
                        <div className={styles.attatched_files}>
                            <AttachFileOutlinedIcon className={styles.icon} />
                            <h4 className={styles.text}>{taskAttachments.length}</h4>
                        </div>
                        <div className={styles.comments}>
                            <ChatBubbleOutlineRoundedIcon className={styles.icon} />
                            <h4 className={styles.text}>{taskComments.length}</h4>
                        </div>
                    </div>
                    <div className={styles.users}>
                        {
                            taskUsers.map((user, i_) => (
                                <div className={styles.user} key={i_}>
                                    <img src={user.pic} alt={user.name} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </article>
       </Link>
    )
}

export default SingleCard
