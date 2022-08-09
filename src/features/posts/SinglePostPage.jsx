import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { selectPostId } from './postsSlice'

const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state) => selectPostId(state, postId))

  if (!post) {
    return (
      <section>
        <h2>页面未找到！</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="Post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user}></PostAuthor>
          <TimeAgo timestamp={post.date}></TimeAgo>
        </div>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          编辑帖子
        </Link>
      </article>
    </section>
  )
}

export default SinglePostPage
