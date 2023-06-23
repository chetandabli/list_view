import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=2')
      .then(response => response.json())
      .then(data => setUsers(data.data));
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user => {
    const firstName = user.first_name.toLowerCase();
    const search = searchTerm.toLowerCase();
    return firstName.includes(search);
  });  

  return (
    <div className="App">
      <h1>List view</h1>
      <input
        type="text"
        className='searchbox'
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className='list'>
      {filteredUsers.map(user => (
        <div key={user.id} className='box'>
        <div id={user.id} className="items">
          <img src={user.avatar} alt="User Avatar" />
        </div>
        <p className='first_name'>{user.first_name}</p>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;
