import { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
const LogIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { email, password } = formData;
  const { logIn, error, isLoading } = useLogin();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    await logIn(email, password);
  };

  return (
    <>
      <section className="heading">
        <p>Please enter your login info</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
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
            />
          </div>
          <div className="form-group">
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-block"
            >
              Submit
            </button>
          </div>
          {error && <div className="error">{error}</div>}
        </form>
      </section>
    </>
  );
};

export default LogIn;
