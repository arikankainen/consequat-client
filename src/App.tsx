import React from 'react';
import { useQuery } from '@apollo/client';
import { User } from './utils/types';
import { GET_USERS } from './utils/queries';

function App() {
  const result = useQuery(GET_USERS);

  if (result.loading) {
    return null;
  }

  return (
    <div>
      {result.data.listUsers.map((p: User) => p.username).join(', ')}
    </div>
  );
}

export default App;
