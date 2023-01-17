import { AiFillStar } from 'react-icons/ai';
import { useState } from 'react';

function Realtor({ realtor }) {
  const { id, first_name, second_name, city, email, score } = realtor;
  const [color, setColor] = useState(0);
  const leaveAScore = async (e) => {
    let value;
    if (e.target.id) {
      value = e.target.id;
    } else {
      value = e.target.parentNode.id;
    }

    if (value) {
      setColor(+value);
      await fetch('http://localhost:5000/api/realtor/' + id, {
        method: 'PUT',
        body: JSON.stringify({ newScore: +value }),
        headers: { 'Content-type': 'application/json' },
      });
    }
  };

  const lightUp = (e) => {};
  return (
    <div className="ceil">
      <section className="ceilHead">
        <h3>{`${first_name} ${second_name}`}</h3>
      </section>
      <div className="ceilBody">
        <div className="ceilInfo">
          <p>Email: {email}</p>
          <p>City: {city}</p>
          <p>Score: {score}</p>
        </div>
        <div
          class="scores pointer"
          onMouseEnter={lightUp}
          onClick={leaveAScore}
        >
          <AiFillStar className={color === 1 ? 'star yellow' : 'star'} id="1" />
          <AiFillStar className={color === 2 ? 'star yellow' : 'star'} id="2" />
          <AiFillStar className={color === 3 ? 'star yellow' : 'star'} id="3" />
          <AiFillStar className={color === 4 ? 'star yellow' : 'star'} id="4" />
          <AiFillStar className={color === 5 ? 'star yellow' : 'star'} id="5" />
        </div>
      </div>
    </div>
  );
}

export default Realtor;
