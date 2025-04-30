import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TravelService from "../services/travel";

const TravelDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [travel, setTravel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState({ description: "" });
  const [editCommentId, setEditCommentId] = useState(null);
  const [editComment, setEditComment] = useState({ description: "" });
  const newCommentTextarea = useRef(null);
  const editCommentTextarea = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    TravelService.getTravelById(id)
      .then((res) => setTravel(res.data))
      .catch((err) => {
        console.error(err);
        setError("Путешествие не найдено.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (newCommentTextarea.current) {
      newCommentTextarea.current.style.height = "auto";
      newCommentTextarea.current.style.height = `${newCommentTextarea.current.scrollHeight}px`;
    }
  }, [newCommentTextarea, newComment.description]);

  useEffect(() => {
    if (editCommentTextarea.current) {
      editCommentTextarea.current.style.height = "auto";
      editCommentTextarea.current.style.height = `${editCommentTextarea.current.scrollHeight}px`;
    }
  }, [editCommentTextarea, editComment.description]);

  const NewCommentChange = (e) => setNewComment({ description: e.target.value });

  const NewCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await TravelService.createComment(id, newComment);
      setTravel({
        ...travel,
        comments: [...travel.comments, res.data],
      });
      setNewComment({ description: "" });
    } catch (err) {
      console.error(err);
      setError("Не удалось добавить комментарий.");
    }
  };

  const EditCommentStart = (comment) => {
    setEditCommentId(comment.id);
    setEditComment({ description: comment.description });
  };

  const EditCommentChange = (e) => setEditComment({ description: e.target.value });

  const EditCommentSubmit = async (commentId) => {
    try {
      const res = await TravelService.updateComment(id, commentId, editComment);
      setTravel({
        ...travel,
        comments: travel.comments.map((c) => (c.id === commentId ? res.data : c)),
      });
      setEditCommentId(null);
      setEditComment({ description: "" });
    } catch (err) {
      console.error(err);
      setError("Не удалось обновить комментарий.");
    }
  };

  const DeleteCommentSubmit = async (commentId) => {
    try {
      await TravelService.removeComment(id, commentId);
      setTravel({
        ...travel,
        comments: travel.comments.filter((c) => c.id !== commentId),
      });
    } catch (err) {
      console.error(err);
      setError("Не удалось удалить комментарий.");
    }
  };

  const DeleteTravelSubmit = async () => {
    try {
      await TravelService.removeTravel(id);
      navigate("/travels");
    } catch (err) {
      console.error(err);
      setError("Не удалось удалить статью.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column gap-3 align-items-center">
        <h5 className="card-title">Загрузка...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column gap-3 align-items-center">
        <p className="text-muted">{error}</p>
        <Link to="/travels" className="btn btn-outline-dark">
          Вернуться к списку путешествий
        </Link>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <div className="card shadow-sm w-100" style={{ maxWidth: "600px" }}>
        {travel.image && (
          <img
            src={`/media/${travel.image}`}
            className="card-img-top"
            alt={travel.title}
            style={{ objectFit: "cover", height: "400px" }}
          />
        )}
        <div className="card-body">
          <div className="d-flex gap-2 justify-content-between">
            <Link to={`/travels/${travel.id}`} className="text-decoration-none text-dark">
              <h5 className="card-title">{travel.title}</h5>
            </Link>
            {user?.id === travel.user.id && (
              <div className="d-flex gap-2 align-self-end">
                <Link to={`/travels/${travel.id}/edit`} className="btn btn-sm btn-outline-dark">
                  ✏️
                </Link>
                <button
                  onClick={DeleteTravelSubmit}
                  className="btn btn-sm btn-outline-danger"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
          <p className="card-text">
          <Link to={`/travels/?user_id=${travel.user.id}`} className="text-decoration-none text-muted">
            {`@${travel.user.username}`}
          </Link>
            {` опубликовал 
            ${new Date(travel.created_at).toLocaleString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}`}
          </p>
          <p className="card-text">
            {`${travel.location} c
            ${new Date(travel.start_date).toLocaleString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
            по 
            ${new Date(travel.end_date).toLocaleString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}`}
          </p>
          <p className="card-text">{travel.description}</p>
          {travel.tags.length !== 0 && (
            <div className="d-flex flex-wrap gap-2">
              {travel.tags?.map((tag) => (
                <Link
                  key={tag.id}
                  to={`/travels/?tag_id=${tag.id}`}
                  className="text-decoration-none"
                >
                  <span className="badge bg-white text-dark border">#{tag.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-100" style={{ maxWidth: "600px" }}>
        <h5>Комментарии</h5>
        <div className="d-flex flex-column gap-3">
          {travel.comments.length === 0 && <p className="text-muted">Комментариев пока нет</p>}

          {travel.comments.map((comment) => (
            <div key={comment.id} className="d-flex align-items-start gap-2 border rounded p-2">
              <Link to={`/travels/?user_id=${comment.user.id}`} className="text-muted text-decoration-none">
                @{comment.user.username}
              </Link>

              {editCommentId === comment.id ? (
                <textarea
                  ref={editCommentTextarea}
                  value={editComment.description}
                  onChange={EditCommentChange}
                  className="form-control form-control-sm"
                  rows="1"
                  style={{ resize: "none", overflow: "hidden" }}
                />
              ) : (
                <span className="text-body flex-grow-1">{comment.description}</span>
              )}

              {user?.id === comment.user.id && (
                <div className="d-flex gap-2 align-self-end">
                  {editCommentId === comment.id ? (
                    <button
                      onClick={() => EditCommentSubmit(comment.id)}
                      className="btn btn-sm btn-outline-success"
                    >
                      ✔️
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => EditCommentStart(comment)}
                        className="btn btn-sm btn-outline-dark"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => DeleteCommentSubmit(comment.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}

          {user && (
            <form onSubmit={NewCommentSubmit} className="d-flex align-items-start gap-2 border rounded p-2">
              <span className="text-muted">@{user.username}</span>
              <textarea
                ref={newCommentTextarea}
                placeholder="Комментарий"
                value={newComment.description}
                onChange={NewCommentChange}
                className="form-control form-control-sm"
                rows="1"
                style={{ resize: "none", overflow: "hidden" }}
                required
              />
              <button type="submit" className="btn btn-sm btn-outline-dark align-self-end">
                ➤
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelDetail;
