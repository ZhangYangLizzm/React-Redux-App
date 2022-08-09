import React, { useState } from 'react'
import { addNewPost } from './postsSlice'
import { useDispatch, useSelector } from 'react-redux'
export const AddPostFrom = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const users = useSelector((state) => state.users)

  const dispatch = useDispatch()

  const onTitleChanged = (e) => {
    setTitle(e.target.value)
  }
  const onContentChanged = (e) => {
    setContent(e.target.value)
  }
  const onAuthorChanged = (e) => {
    setUserId(e.target.value)
  }
  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to Save the post:', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>添加新帖子</h2>
      <form>
        <label htmlFor="postsTitle">帖子标题</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postsTitle">帖子内容</label>
        <textarea
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          保存帖子
        </button>
      </form>
    </section>
  )
}
