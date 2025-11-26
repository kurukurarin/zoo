import { BrowserRouter, Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import { axiosInstance, setAccessToken } from '../shared/lib/axiosInstance';
import HomePage from '../pages/HomePage/HomePage'

export default function App() {
  const [user, setUser] = useState(null)

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
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}