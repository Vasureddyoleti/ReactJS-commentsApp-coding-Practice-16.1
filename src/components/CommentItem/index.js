// Write your code here
import './index.css'

const CommentItem = props => {
  const {commentDetails, commentLiked, commentDelete} = props

  const {id, name, comment, time, isLiked, bgColor} = commentDetails

  const firstLetter = name[0]

  const onClickCommentLike = () => {
    commentLiked(id)
  }

  const onClickDelete = () => {
    commentDelete(id)
  }

  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeText = isLiked ? 'isliked-icon ' : ''

  return (
    <li className="comment-card">
      <div className="first-letter-container">
        <p className={`first-letter-bg ${bgColor}`}>{firstLetter}</p>
        <div className="comment-details-container">
          <div className="name-time-container">
            <p className="name">{name}</p>
            <p className="time">{time}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete-button-container">
        <button
          type="button"
          className={`like-button ${likeText}`}
          onClick={onClickCommentLike}
        >
          <img src={likeImage} alt="like" className="like-icon" /> Like
        </button>
        <button
          type="button"
          className="delete-button"
          data-testid="delete"
          onClick={onClickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="hr-line" />
    </li>
  )
}

export default CommentItem
