import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TravelService from "../services/travel";
import UserService from "../services/user";

const TravelList = () => {
  const location = useLocation();
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [tag, setTag] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('user_id');
  const tag_id = searchParams.get('tag_id');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = {};
  
      try {
        if (user_id) {
          params.user_id = user_id;
          const userRes = await UserService.getUserById(user_id);
          setUser(userRes.data);
        } else {
          setUser(null);
        }
  
        if (tag_id) {
          params.tag_id = tag_id;
          const tagRes = await TravelService.getTagById(tag_id);
          setTag(tagRes.data);
        } else {
          setTag(null);
        }
  
        const travelsRes = await TravelService.getTravels(params);
        setTravels(travelsRes.data);
  
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [location.search]);

  const renderH = () => {
    if (user_id) {
      if (!user) {
        return "Такого пользователя нет"
      } else if (travels.length === 0) {
        return `Путешествий пользователя @${user.username} нет`
      } else  {
        return `Путешествия пользователя @${user.username}`
      }
    } else if (tag_id) {
      if (!tag) {
        return "Такого тега нет"
      } else if (travels.length === 0) {
        return `Путешествий с тегом #${tag.name} нет`
      } else  {
        return `Путешествия с тегом #${tag.name}`
      }
    } else {
      return "Путешествия"
    }
  }

  if (loading) return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <h5 className="card-title">Загрузка...</h5>
    </div>
  )

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <h1 className="text-dark">{renderH()}</h1>
      {travels.length !== 0 && (
        <>
          {travels.map((travel) => (
            <div key={travel.id} className="card shadow-sm w-100" style={{ maxWidth: "600px" }}>
              {travel.image && (
                <Link to={`/travels/${travel.id}`} className="text-decoration-none text-dark">
                  <img
                    src={`/media/${travel.image}`}
                    className="card-img-top"
                    alt={travel.title}
                    style={{ objectFit: "cover", height: "400px" }}
                  />
                </Link>
              )}
              <div className="card-body">
              
              <h5 className="card-title">
                <Link to={`/travels/${travel.id}`} className="card-title text-decoration-none text-dark">
                  {travel.title}
                </Link>
              </h5>
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
              <p className="card-text">
                <Link to={`/travels/${travel.id}`} className="card-text text-decoration-none text-dark">
                  {travel.description.substring(0, 20) + '...'}
                </Link>
              </p>
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
          ))}
        </>
      )}
    </div>
  );
};

export default TravelList;
