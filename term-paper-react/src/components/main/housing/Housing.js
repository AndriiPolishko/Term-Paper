import { useEffect } from 'react';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useAuthContext } from '../../../hooks/useAuthContext';
function Housing({ housing, isLikedAlready, likeOrCross, passChildParam }) {
  const { user } = useAuthContext();
  const {
    id,
    name,
    city,
    price,
    housing_type,
    housing_number,
    street,
    owner_id,
  } = housing;
  const [liked, setLiked] = useState(isLikedAlready);
  const linkToPhoto =
    'https://media.istockphoto.com/id/155666671/vector/vector-illustration-of-red-house-icon.jpg?s=612x612&w=0&k=20&c=tBqaabvmjFOBVUibZxbd8oWJqrFR5dy-l2bEDJMtZ40=';

  const [realtor, setRealtor] = useState();

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

  const deletion = async () => {
    await fetch('http://localhost:5000/api/housing/' + id, {
      method: 'DELETE',
    });
    const res = await fetch('http://localhost:5000/api/housing');
    const json = await res.json();
    passChildParam(json);
  };

  useEffect(() => {
    const getRealtor = async () => {
      const res = await fetch('http://localhost:5000/api/realtor/' + owner_id);
      const json = await res.json();
      if (res.ok) {
        setRealtor(json);
      }
    };
    getRealtor();
    console.log(realtor);
  }, []);

  return (
    <div className="ceil">
      <section className="ceilHead">
        <h3>
          {name}
          {likeOrCross && user && (
            <FaHeart className={liked ? 'heart red' : 'heart'} onClick={like} />
          )}
          {!likeOrCross && <ImCross className="cross" onClick={deletion} />}
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
          {realtor && <p>Realtors email: {realtor.email}</p>}
        </div>
      </div>
    </div>
  );
}

export default Housing;
