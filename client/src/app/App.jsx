import { BrowserRouter, Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import { axiosInstance, setAccessToken } from '../shared/lib/axiosInstance';

export default function App() {
  const [user, setUser] = useState(null)

    //   function signOutUserHandler(event) {
    //     event.preventDefault();

    //     axiosInstance.delete('/auth/signOut')
    //     .then(response => {
    //         console.log(response, "<<<<")
    //         setUser(null);
    //         setAccessToken(null)
    //     })
    //     .catch(error => console.log(error));
    //   }

  useEffect(() => {
    axiosInstance.get('/auth/refreshTokens')
      .then(response => {
        setUser(response.data.data.user);
        setAccessToken(response.data.data.accessToken)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <BrowserRouter>
      <Nav user={user} signOut={signOutUserHandler}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}