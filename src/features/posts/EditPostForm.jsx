import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postUpdated, selectPostId } from './postsSlice'

const EditPostForm = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state) => selectPostId(state, postId))
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChanged = (e) => {
    setTitle(e.target.value)
  }

  const onContentChanged = (e) => {
    setContent(e.target.value)
  }

  const onUpdatePostClicked = () => {
    if (title && content) {
      dispatch(
        postUpdated({
          postId,
          title,
          content,
        })
      )
      history.push(`posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>编辑帖子</h2>
      <form>
        <label htmlFor="postsTitle">帖子标题</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postsTitle">帖子内容</label>
        <textarea
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onUpdatePostClicked}>
          保存帖子
        </button>
      </form>
    </section>
  )
}

export default EditPostForm
