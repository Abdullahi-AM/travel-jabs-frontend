import "./Card.scss";

export default function Card({ title, imageUrl, children }) {
  return (
    <div className="card">
      {imageUrl ? <img className="card__image" src={imageUrl} alt={title} /> : null}
      <div className="card__body">
        {title ? <h3 className="card__title">{title}</h3> : null}
        {children}
      </div>
    </div>
  );
}