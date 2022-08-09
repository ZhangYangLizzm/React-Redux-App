import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {Spinner} from '../../components/Spinner'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectAllPosts, fetchPosts } from './postsSlice'

const PostExcerpt = ({ post }) => {
    return (
        <article className='post-excerpt' key={post.id}>
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.user}></PostAuthor>
                <TimeAgo timestamp={post.date}></TimeAgo>
            </div>
            <p className='post-content'>{post.content.substring(0, 100)}</p>
            <ReactionButtons post={post}></ReactionButtons>
            <Link to={`posts/${post.id}`} className="button muted-button">
                查看帖子
            </Link>

        </article>
    )
}

export const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    const error = useSelector(state => state.posts.error)
    const postStatus = useSelector(state => state.posts.status)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content
    if(postStatus==='loading'){
        content=<Spinner text='Loading...'></Spinner>
    }
    if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => (
            <PostExcerpt post={post} key={post.id}></PostExcerpt>
        ))
    } else if (postStatus === 'error') {
        content = <div>{error}</div>
    }

    return (
        <section className='posts-list'>
            <h2>帖子列表</h2>
            {content}
        </section>
    )
}