import { useEffect, useState } from 'react';
import UserContainer from '../../components/UserContainer';
import Pagination from '../../components/main/housing/Pagination';

function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:5000/api/user');
      const json = await res.json();
      setUsers(json);
    };
    fetchUsers();
  }, []);

  let indexOfLastHousing, indexOfFirstHousing, currentUsers;
  if (users) {
    indexOfLastHousing = currentPage * usersPerPage;
    indexOfFirstHousing = indexOfLastHousing - usersPerPage;
    currentUsers = users.slice(indexOfFirstHousing, indexOfLastHousing);
  }
  const paginate = (page) => {
    setCurrentPage(page);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    city: '',
    password: '',
  });

  const [error, setError] = useState();

  const { firstName, secondName, email, city, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // the key(name of the attribute) is in e.target.name, and value that we typed in the e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { firstName, secondName, email, city, password } = formData;
    await fetch('http://localhost:5000/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        secondName,
        email,
        city,
        password,
      }),
    });
    setFormData({
      firstName: '',
      secondName: '',
      email: '',
      city: '',
      password: '',
    });
  };

  return (
    <main className={'container'}>
      <div className="content">
        <UserContainer
          users={currentUsers}
          type={'user'}
          passChildParam={setUsers}
        />
        <Pagination
          itemsPerPage={usersPerPage}
          totalItems={users.length}
          paginate={paginate}
        />
      </div>
      <section className="adminForm">
        <form onSubmit={onSubmit}>
          <h2>Add new user</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={firstName}
              placeholder="Enter your firs name"
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
              placeholder="Enter your second name"
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
              placeholder="Enter your email"
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
              placeholder="Enter your city"
              onChange={onChange}
              required={true}
              minLength={3}
              maxLength={20}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
              required={true}
              minLength={5}
              maxLength={64}
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

export default Users;
