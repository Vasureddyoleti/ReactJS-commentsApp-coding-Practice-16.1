import {Component} from 'react'

import {formatDistanceToNow} from 'date-fns'

import {v4 as uIdv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {name: '', comment: '', commentsList: [], commentsCount: 0}

  onChangeInputName = event => {
    this.setState({name: event.target.value})
  }

  onChangeUserComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()

    const {name, comment} = this.state

    const number = Math.ceil(
      Math.random() * initialContainerBackgroundClassNames.length - 1,
    )

    const initialBgColor = initialContainerBackgroundClassNames[number]

    const newComment = {
      id: uIdv4(),
      name,
      comment,
      time: formatDistanceToNow(new Date()),
      isLiked: false,
      bgColor: initialBgColor,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
      commentsCount: prevState.commentsCount + 1,
    }))
  }

  onClickCommentLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return {eachComment}
      }),
    }))
  }

  onClickDeleteComment = id => {
    const {commentsList} = this.state

    this.setState(prevState => ({
      commentsList: commentsList.filter(eachComment => eachComment.id !== id),
      commentsCount: prevState.commentsCount - 1,
    }))
  }

  render() {
    const {commentsCount, name, comment, commentsList} = this.state

    return (
      <div className="bg-container">
        <div className="top-container">
          <div className="commentInputContainer">
            <h1 className="heading">Comments</h1>
            <p className="description">Say something about 4.0 Technologies</p>
            <form className="formEl">
              <input
                value={name}
                className="input-box"
                type="text"
                placeholder="Your Name"
                onChange={this.onChangeInputName}
              />
              <textarea
                value={comment}
                onChange={this.onChangeUserComment}
                className="textarea-box"
                type="text"
                rows="7"
                placeholder="Your Comment"
              />
              <button
                type="submit"
                className="button"
                onClick={this.onAddComment}
              >
                Add Comment
              </button>
            </form>
          </div>
          <div className="image-container">
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
        </div>
        <hr className="hr-line" />
        <div>
          <p className="comments-count-text">
            <span className="comments-count">{commentsCount}</span> Comments
          </p>
          <ul className="comments-container">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                commentLiked={this.onClickCommentLiked}
                commentDelete={this.onClickDeleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
