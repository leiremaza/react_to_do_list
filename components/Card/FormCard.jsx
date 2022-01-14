import React from 'react'
import styles from "./FormCard.module.scss"
import Link from 'next/link'
import dayjs from 'dayjs'

import MyButton from '../Dsys/MyButton'
import { categories as categories_ } from './../../models/categories'
import { users as users_ } from './../../models/users'
import { attached as attached_ } from './../../models/attached'
import { comments as comments_ } from './../../models/comments'

import CloseIcon from '@material-ui/icons/Close';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import { Field, Form, Formik } from 'formik'
import { TextareaAutosize } from '@material-ui/core'

const FormCard = (props) => {

    const task = props.task;
    console.log(task);

    const categories = task.categories.map(categoryId => categories_.find(category => category.id === categoryId));
    const users = task.users.map(userId => users_.find(user => user.id === userId));
    const attached = task.attached.map(attachedId => attached_.find(a => a.id === attachedId));
    const comments = task.comments.map(commentId => comments_.find(comment => comment.id === commentId));

    const categoriesClass = styles.category + " ";

    const date = dayjs(task.creationDate).locale('es').format('MMM DD YYYY');

    return (
        <Formik
            initialValues={{ title: "", description: task.description }}
            onSubmit={(data) => { setData(data) }}
        >
            <Form className={styles.card}>
                <div className={styles.card_header}>
                    <Link href="/">
                        <MyButton theme="default" content="icon">
                            <CloseIcon fontSize="small" />
                        </MyButton>
                    </Link>
                </div>
                <div className={styles.card_content}>

                    <div className={styles.card_title}>
                        <Field id="title" name="title" type="text" className={styles.title} />
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
                                users.map((user, i_) => (
                                    <div className={styles.user} key={i_}>
                                        <img src={"../" + user.pic} alt={user.name} />
                                    </div>
                                ))
                            }
                            <MyButton theme="default" content="icon">
                                <AddRoundedIcon fontSize="small" />
                            </MyButton>
                        </div>
                        <div className={styles.categories}>
                            {
                                categories.map((category, i_) => (
                                    <div key={i_} className={categoriesClass.concat(styles[category.color])}></div>
                                ))
                            }
                            <MyButton theme="default" content="icon">
                                <AddRoundedIcon fontSize="small" />
                            </MyButton>
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
                                attached.map((attachment, i_) => (
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
                                comments.map((comment, i_) => (
                                    <div className={styles.comment} key={i_}>
                                        <div className={styles.user}>
                                            <img src={"../" + users_[comment.user].pic} alt={users_[comment.user].name} />
                                        </div>
                                        <h5 className={styles.text}>{comment.text}</h5>
                                    </div>
                                ))
                            }
                            <form className={styles.form}>
                                <div className={styles.user}>
                                    <img src={"../" + users_[3].pic} alt={users_[3].name} />
                                </div>
                                <div className={styles.msg_input}>
                                    <input className={styles.input_control} type="text" name="newMsg" placeholder="Add new comment..." />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={styles.card_footer}>
                    <MyButton type="submit" content="text" theme="primary">
                        <h5 className={styles.add}>Add</h5>
                    </MyButton>
                    <MyButton type="reset" content="text" theme="secondary" >
                        <h5 className={styles.delete}>Delete</h5>
                    </MyButton>
                </div>
            </Form>
        </Formik>
    )
}

export default FormCard
