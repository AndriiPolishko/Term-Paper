import { ImCross } from 'react-icons/im';

function UserBlock({ user, type, passChildParam }) {
  const { first_name, second_name, city, email, is_admin } = user;
  const { score } = user;

  const deletion = async () => {
    if (type === 'user') {
      await fetch('http://localhost:5000/api/user?email=' + email, {
        method: 'DELETE',
      });
      const res = await fetch('http://localhost:5000/api/user');
      const json = await res.json();
      passChildParam(json);
    } else if (type === 'realtor') {
      console.log(email);
      await fetch('http://localhost:5000/api/realtor?email=' + email, {
        method: 'DELETE',
      });
      const res = await fetch('http://localhost:5000/api/realtor');
      const json = await res.json();
      passChildParam(json);
    }
  };
  return (
    <div className="ceil">
      <section className="ceilHead">
        <h3>
          {`${first_name} ${second_name}`}
          {!is_admin && <ImCross className="cross" onClick={deletion} />}
        </h3>
      </section>
      <div className="ceilBody">
        <div className="ceilInfo">
          <p>Email: {email}</p>
          <p>City: {city}</p>
          {score && <p>City: {score}</p>}
        </div>
      </div>
    </div>
  );
}

export default UserBlock;
