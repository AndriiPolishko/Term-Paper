import { useEffect, useState } from 'react';
import UserContainer from '../../components/UserContainer';
import Pagination from '../../components/main/housing/Pagination';

function Realtors() {
  const [realtors, setRealtors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:5000/api/realtor');
      const json = await res.json();
      setRealtors(json);
    };
    fetchUsers();
  }, []);

  let indexOfLastHousing, indexOfFirstHousing, currentUsers;
  if (realtors) {
    indexOfLastHousing = currentPage * usersPerPage;
    indexOfFirstHousing = indexOfLastHousing - usersPerPage;
    currentUsers = realtors.slice(indexOfFirstHousing, indexOfLastHousing);
  }
  const paginate = (page) => {
    setCurrentPage(page);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    city: '',
    score: '',
  });

  const [error, setError] = useState();

  const { firstName, secondName, email, city, score } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // the key(name of the attribute) is in e.target.name, and value that we typed in the e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { firstName, secondName, email, city, score } = formData;
    await fetch('http://localhost:5000/api/realtor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        secondName,
        email,
        city,
        score,
      }),
    });

    const res = await fetch('http://localhost:5000/api/realtor');
    const json = await res.json();
    setRealtors(json);

    setFormData({
      firstName: '',
      secondName: '',
      email: '',
      city: '',
      score: '',
    });
  };

  return (
    <main className={'container'}>
      <div className="content">
        <UserContainer
          users={currentUsers}
          type={'realtor'}
          passChildParam={setRealtors}
        />
        <Pagination
          itemsPerPage={usersPerPage}
          totalItems={realtors.length}
          paginate={paginate}
        />
      </div>
      <section className="adminForm">
        <form onSubmit={onSubmit}>
          <h2>Add new realtor</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={firstName}
              placeholder="Enter the firs name"
              onChange={onChange}
              required={true}
              minLength={2}
              maxLength={20}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="secondName"
              name="secondName"
              value={secondName}
              placeholder="Enter the second name"
              onChange={onChange}
              required={true}
              minLength={2}
              maxLength={20}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter thr email"
              onChange={onChange}
              required={true}
              minLength={5}
              maxLength={30}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={city}
              placeholder="Enter the city"
              onChange={onChange}
              required={true}
              minLength={3}
              maxLength={20}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              id="score"
              name="score"
              value={score}
              placeholder="Enter the score"
              onChange={onChange}
              required={true}
              minLength={1}
              maxLength={1}
              max={5}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="button btn-block widthFull">
              Submit
            </button>
            {error && <div className="error">{error}</div>}
          </div>
        </form>
      </section>
    </main>
  );
}

export default Realtors;
