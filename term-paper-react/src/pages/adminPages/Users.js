import { useEffect, useState } from 'react';
import UserContainer from '../../components/UserContainer';
import Pagination from '../../components/main/housing/Pagination';

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:5000/api/user');
      const json = await res.json();
      setUsers(json);
    };
    setIsLoading(true);
    fetchUsers();
    setIsLoading(false);
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
  return (
    <main className={'container'}>
      <div className="content">
        <UserContainer loading={isLoading} users={currentUsers} />
        <Pagination
          itemsPerPage={usersPerPage}
          totalItems={users.length}
          paginate={paginate}
        />
      </div>
    </main>
  );
}

export default Users;
