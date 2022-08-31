/*  아래 링크로 스터디
https://react.vlpt.us/basic/13-array-insert.html 
*/

import React, { useEffect } from 'react';


function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log('컴포넌트가 화면에 나타남');
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList() {

  const users = [ { user: {id:'aasd'} } ];
  
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}

        />
      ))}
    </div>
  );
}

export default UserList;