import React from 'react'
import styles from "./SingleCard.module.scss"
import dayjs from 'dayjs'

import MyButton from '../Dsys/MyButton'
import { categories as categories_ } from './../../models/categories'
import { users as users_ } from './../../models/users'
import { attached as attached_ } from './../../models/attached'
import { comments as comments_ } from './../../models/comments'

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import { TasksContext } from '../../contexts/TasksContext'
import { useContext } from 'react'
import Link from 'next/link'

const SingleCard = (props) => {

    const categories = props.task.categories.map(categoryId => categories_.find(category => category.id === categoryId));
    const users = props.task.users.map(userId => users_.find(user => user.id === userId));
    const attached = props.task.attached.map(attachedId => attached_.find(a => a.id === attachedId));
    const comments = props.task.comments.map(commentId => comments_.find(comment => comment.id === commentId));

    const categoryClass = styles.category + " ";
    const date = dayjs(props.task.creationDate).locale('es').format('MMM DD YYYY');

    const { removeTask } = useContext(TasksContext);

    return (
        <Link href={'/card/' + props.task.id} className={styles.link}>
            <article className={styles.card} ref={props.provided.innerRef}{...props.provided.draggableProps}{...props.provided.dragHandleProps} style={props.provided.draggableProps.style}>
                <div className={styles.card_header}>
                    <div className={styles.creation_date}>
                        <div className={styles.time_icon}>
                            <AccessTimeOutlinedIcon className={styles.icon} />
                        </div>
                        <h4 className={styles.date}>{date}</h4>
                    </div>
                    <div className={styles.remove_button} onClick={() => removeTask(props.task.id)}>
                        <MyButton theme="secondary" content="icon">
                            <DeleteOutlinedIcon className={styles.icon} />
                        </MyButton>
                    </div>
                </div>
                <div className={styles.card_title}>
                    <h4 className={styles.title}>{props.task.title}</h4>
                </div>
                <div className={styles.categories}>
                    {
                        categories.map((category, i_) => (
                            <div key={i_} className={categoryClass.concat(styles[category.color])}></div>
                        ))
                    }
                </div>
                {
                    props.task.pic ?
                        (
                            <div className={styles.picture}>
                                <img src={props.task.pic} alt="task_pic" />
                            </div>
                        ) : ""
                }
                <div className={styles.card_footer}>
                    <div className={styles.notifications}>
                        <div className={styles.attatched_files}>
                            <AttachFileOutlinedIcon className={styles.icon} />
                            <h4 className={styles.text}>{attached.length}</h4>
                        </div>
                        <div className={styles.comments}>
                            <ChatBubbleOutlineRoundedIcon className={styles.icon} />
                            <h4 className={styles.text}>{comments.length}</h4>
                        </div>
                    </div>
                    <div className={styles.users}>
                        {
                            users.map((user, i_) => (
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
