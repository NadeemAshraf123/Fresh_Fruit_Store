import React, { useState, useEffect} from 'react';
import './AdminList.css';

const AuthenticatedUsers = () => {

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch('http://localhost:3000/users')
    .then((res) => res.json())
    .then((data) => {
      setAdmins(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching admin data:' , err);
      setLoading(false);
    });
  }, []);

  console.log("db.json data..." , admins);

  if (loading)  return <p>Loading admins data...</p>;
  return (

    <div className="admin-table-container" >
      <h2>Admin List</h2>
      <table className="admin-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Id</th>
          <th>Email</th>
          <th>Password</th>
          {/* <th>Date</th> */}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {admins.map((admin) => (
          <tr key={admin.id}>
            <td>    {admin.name}     </td>
            <td>    {admin.id}        </td>
            <td>    {admin.email}       </td>
            <td>    {admin.password}      </td>
              <td>
                <button className='action-btn'>⋮</button>
              </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
};

export default AuthenticatedUsers;
