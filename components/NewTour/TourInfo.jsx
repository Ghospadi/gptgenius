const TourInfo = ({tour}) => {
  const {title, description, stops} = tour;
  return (
    <div className="card bordered">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-base">{description}</p>
        <div className="divider">Stops</div>
        <ul>
          {stops.map((stop, index) => (
            <li className="mb-4 bg-base-100 p-4 rounded-xl" key={index}>
              <p>{stop}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TourInfo;
