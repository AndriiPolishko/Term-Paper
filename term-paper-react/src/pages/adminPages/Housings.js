import { useEffect, useState } from 'react';
import HousingContainer from '../../components/main/housing/HousingContainer';
import Pagination from '../../components/main/housing/Pagination';

function Housings() {
  const [housings, setHousings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    street: '',
    housingNumber: '',
    housingType: '',
    price: '',
    ownerEmail: '',
  });

  const { name, city, street, housingNumber, housingType, price, ownerEmail } =
    formData;

  const [error, setError] = useState();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // the key(name of the attribute) is in e.target.name, and value that we typed in the e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      city,
      street,
      housingNumber,
      housingType,
      price,
      ownerEmail,
    } = formData;
    const createRes = await fetch('http://localhost:5000/api/housing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        city,
        street,
        housingNumber,
        housingType,
        price,
        ownerEmail,
      }),
    });

    if (!createRes.ok) {
      const json = await createRes.json();
      setError(json.message);
    } else {
      setError(undefined);
    }

    const res = await fetch('http://localhost:5000/api/housing');
    const json = await res.json();
    setHousings(json);

    setFormData({
      name: '',
      city: '',
      street: '',
      housingNumber: '',
      housingType: '',
      price: '',
      ownerEmail: '',
    });
  };

  useEffect(() => {
    const fetchHousings = async () => {
      const res = await fetch('http://localhost:5000/api/housing');
      const json = await res.json();
      setHousings(json);
    };
    setIsLoading(true);
    fetchHousings();
    setIsLoading(false);
  }, []);

  let indexOfLastHousing, indexOfFirstHousing, currentHousing;
  if (housings) {
    indexOfLastHousing = currentPage * itemsPerPage;
    indexOfFirstHousing = indexOfLastHousing - itemsPerPage;
    currentHousing = housings.slice(indexOfFirstHousing, indexOfLastHousing);
  }
  const paginate = (page) => {
    setCurrentPage(page);
  };

  return (
    <main className={'container'}>
      <div className="content">
        <HousingContainer
          loading={isLoading}
          housings={currentHousing}
          likeOfCross={true}
          passChildParam={setHousings}
        />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={housings.length}
          paginate={paginate}
        />
      </div>
      <section className="adminForm">
        <form onSubmit={onSubmit}>
          <h2>Add new housing</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              required={true}
              minLength={5}
              maxLength={64}
              id="name"
              value={name}
              placeholder="Enter the name"
              autoComplete="off"
              name="name"
            />

            <input
              type="text"
              className="form-control"
              onChange={onChange}
              required={true}
              minLength={4}
              maxLength={64}
              id="city"
              value={city}
              placeholder="Enter the city"
              name="city"
            />
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              required={true}
              minLength={4}
              maxLength={64}
              id="street"
              value={street}
              placeholder="Enter the street"
              name="street"
            />
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              required={true}
              minLength={1}
              maxLength={10}
              id="housingNumber"
              value={housingNumber}
              placeholder="Enter the housing number"
              name="housingNumber"
            />
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              required={true}
              minLength={4}
              maxLength={64}
              id="housingType"
              value={housingType}
              placeholder="Enter the housing type"
              name="housingType"
            />
            <input
              type="number"
              className="form-control"
              onChange={onChange}
              required={true}
              minLength={1}
              maxLength={64}
              id="price"
              value={price}
              placeholder="Enter the price"
              name="price"
            />
            <input
              type="email"
              className="form-control"
              onChange={onChange}
              required={true}
              minLength={5}
              maxLength={64}
              id="ownerEmail"
              value={ownerEmail}
              placeholder="Enter the owners email"
              name="ownerEmail"
            />

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

export default Housings;
