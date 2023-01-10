import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useAuthContext } from '../../../hooks/useAuthContext';
function Housing({ housing, isLikedAlready }) {
  const { id, name, city, price, housing_type, housing_number, street } =
    housing;
  const [liked, setLiked] = useState(isLikedAlready);
  const linkToPhoto =
    'https://media.istockphoto.com/id/155666671/vector/vector-illustration-of-red-house-icon.jpg?s=612x612&w=0&k=20&c=tBqaabvmjFOBVUibZxbd8oWJqrFR5dy-l2bEDJMtZ40=';

  const { user } = useAuthContext();
  const like = async () => {
    if (!liked) {
      await fetch('http://localhost:5000/api/liked-housing', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ userId: user.id, housingId: id }),
      });
    } else {
      await fetch('http://localhost:5000/api/liked-housing', {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ userId: user.id, housingId: id }),
      });
    }

    setLiked(!liked);
  };
  return (
    <div className="ceil">
      <section className="ceilHead">
        <h3>
          {name}
          {user && (
            <FaHeart className={liked ? 'heart red' : 'heart'} onClick={like} />
          )}
        </h3>
      </section>
      <div className="ceilBody">
        <img src={linkToPhoto} alt="house" className="ceilPicture" />
        <div className="ceilInfo">
          <p>Price: {price}</p>
          <p>Housing type: {housing_type}</p>
          <p>City: {city}</p>
          <p>
            Address: {street} {housing_number}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Housing;
