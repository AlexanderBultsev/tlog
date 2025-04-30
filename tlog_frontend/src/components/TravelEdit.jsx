import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TravelService from "../services/travel";

const TravelEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();  // Получаем ID записи из URL
  const [tags, setTags] = useState([]);
  const [travel, setTravel] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    image: null,
    start_date: "",
    end_date: "",
    is_public: true,
    tag_ids: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const descriptionTextarea = useRef(null);

  useEffect(() => {
    // Загружаем список тегов
    TravelService.getTags()
      .then((res) => setTags(res.data))
      .catch((err) => {
        console.error(err);
        setError("Не удалось загрузить теги.");
      });
    
    // Загружаем данные путешествия по ID для редактирования
    TravelService.getTravelById(id)
      .then((res) => {
        const travel = res.data;
        setTravel(travel);
        setForm({
          title: travel.title,
          description: travel.description,
          location: travel.location,
          image: travel.image, // или base64 строка
          start_date: travel.start_date,
          end_date: travel.end_date,
          is_public: travel.is_public,
          tag_ids: travel.tags.map(tag => tag.id),
        });
        setImagePreview(travel.image); // Если изображение уже есть
      })
      .catch((err) => {
        console.error(err);
        setError("Не удалось загрузить данные путешествия.");
      });
  }, [id]);

  useEffect(() => {
    if (descriptionTextarea.current) {
      descriptionTextarea.current.style.height = "auto";
      descriptionTextarea.current.style.height = `${descriptionTextarea.current.scrollHeight}px`;
    }
  }, [form.description]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "is_public") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTagToggle = (tagId) => {
    setForm((prev) => ({
      ...prev,
      tag_ids: prev.tag_ids.includes(tagId)
        ? prev.tag_ids.filter((id) => id !== tagId)
        : [...prev.tag_ids, tagId],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setForm((prev) => ({ ...prev, image: base64Image }));
        setImagePreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    } else {
      setError("Пожалуйста, выберите корректный файл изображения.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (form.image === travel.image) {
      delete form.image;
    }

    try {
      await TravelService.updateTravel(id, form);  // Отправляем обновленные данные
      navigate(`/travels/${id}`);  // Перенаправляем на страницу с обновленным путешествием
    } catch (err) {
      console.error(err);
      setError("Не удалось обновить путешествие.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <h1 className="text-dark">Редактирование путешествия</h1>
      <div className="card shadow-sm w-100" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="card-body d-flex flex-column">

          <label htmlFor="title" className="form-label">Название</label>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Название"
              className="form-control"
              required
            />
          </div>

          <label htmlFor="description" className="form-label">Описание</label>
          <div className="mb-3">
            <textarea
              ref={descriptionTextarea}
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Описание"
              className="form-control"
              rows="3"
              style={{ resize: "none", overflow: "hidden" }}
              required
            />
          </div>

          <label htmlFor="image" className="form-label">Изображение</label>
          <div className="mb-3">
            {imagePreview && (
              <img
                src={imagePreview}
                className="card-img mb-2"
                alt="Предпросмотр"
                style={{ objectFit: "cover", height: "400px" }}
              />
            )}
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control"
            />
          </div>

          <label htmlFor="location" className="form-label">Локация</label>
          <div className="mb-3">
            <input
              type="text"
              name="location"
              id="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Локация"
              className="form-control"
              required
            />
          </div>

          <label className="form-label">Период</label>
          <div className="input-group d-flex mb-3">
            <span className="input-group-text">c</span>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              className="form-control"
              required
            />
            <span className="input-group-text">по</span>
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="isPublic"
              name="is_public"
              checked={form.is_public}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isPublic">
              Публичное путешествие
            </label>
          </div>

          <div className="mb-3">
            <p className="mb-2">Теги:</p>
            <div className="d-flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag.id}
                  className={`btn btn-sm ${
                    form.tag_ids.includes(tag.id)
                      ? "btn-dark"
                      : "btn-outline-dark"
                  }`}
                  onClick={() => handleTagToggle(tag.id)}
                >
                  #{tag.name}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-dark" disabled={loading}>
            {loading ? "Обновление..." : "Обновить"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TravelEdit;
