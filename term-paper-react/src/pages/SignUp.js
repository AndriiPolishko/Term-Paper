import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    city: '',
    password: '',
    password2: '',
  });

  const [passwordValid, setPasswordValid] = useState(false);

  const { signUp, error, isLoading } = useSignup();

  const { firstName, secondName, email, city, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // the key(name of the attribute) is in e.target.name, and value that we typed in the e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { firstName, secondName, email, city, password } = formData;
    await signUp(firstName, secondName, email, city, password);
  };

  return (
    <div className="formContainer">
      <section className="heading">
        <h3>Sign up</h3>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
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
              maxLength={20}
            />
          </div>
          {/* <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
              required={true}
              minLength={5}
              maxLength={20}
          
            />
          </div> */}
          <div className="form-group">
            <button
              disabled={isLoading}
              type="submit"
              className="button btn-block widthFull"
            >
              Submit
            </button>
            {error && <div className="error">{error}</div>}
          </div>
        </form>
      </section>
      <div className="toLogIn">
        <p>Do you have an account?</p>
        <Link to="/log-in">
          <p>Then log in!</p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
