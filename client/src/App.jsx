import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import axios from 'axios'
import { setUserData } from './redux/userSlice.js'
import { useDispatch } from "react-redux";
import InterviewPage from './pages/interviewPage';
import InterviewHistory from './pages/interviewHistory'; // FIXED: added missing forward slash
axios.defaults.withCredentials = true;

// FIXED: Added missing imports for these components
import Pricing from './pages/Pricing.jsx'; 
import InterviewReport from './pages/interviewReport.jsx'; 

export const ServerUrl = "https://three-interview.onrender.com"

function App() {
  const dispatch = useDispatch()
  console.log("App component has rendered!");

  useEffect(() => {
    const getUser = async () => {
      console.log("useEffect triggered, fetching user...");
      try {
        const result = await axios.get(
          ServerUrl + "/api/user/current-user",
          {
            withCredentials: true
          }
        );

        console.log("API Success");
        console.log(result);
        console.log(result.data);

        dispatch(setUserData(result.data));

      } catch (error) {
        console.log("API Failed");
        console.log(error.response);
        console.log(error.message);

        dispatch(setUserData(null));
      }
    }
    getUser()
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path='/interview' element={<InterviewPage />} />
      <Route path='/History' element={<InterviewHistory />} />
      {/* FIXED: Added missing forward slashes to paths below */}
      <Route path='/pricing' element={<Pricing />} />
      <Route path='/report' element={<InterviewReport />} />
      <Route path='/report/:id'element={<InterviewReport/>}/>
    </Routes>
  )
}

export default App
