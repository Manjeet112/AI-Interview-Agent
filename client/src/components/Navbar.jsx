import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux'; 
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Auth from '../pages/Auth.jsx'; // 👈 Imported as Auth
import { setUserData } from '../redux/userSlice';

const ServerUrl = "http://localhost:8000"; 

function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get(`${ServerUrl}/api/auth/logout`, { withCredentials: true });
      dispatch(setUserData(null));
      setShowCreditPopup(false);
      setShowUserPopup(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-[#f3f3f3] flex justify-center px-4 pt-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}  
        className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative'
      >
        {/* === LEFT SIDE LOGO === */}
        <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate("/")}>
          <div className='bg-black text-white p-2 rounded-lg'>
            <BsRobot size={18} />
          </div>
          <h1 className='font-semibold text-lg text-black'>InterviewIQ.AI</h1>
        </div>

        {/* === RIGHT SIDE CONTROLS GROUP === */}
        <div className='flex items-center gap-4 relative'>
          
          {/* 1. Coin Button & Popup Wrapper */}
          <div className='relative'>
            <button 
              onClick={() => {
                if (!userData) {
                  setShowAuth(true); 
                  setShowUserPopup(false);
                  setShowCreditPopup(false);
                  return;
                }
                setShowCreditPopup(!showCreditPopup);
                setShowUserPopup(false); 
              }} 
              className='flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition cursor-pointer'
            >
              <BsCoin size={20} />
              {userData?.credits || 0}
            </button>
            
            {showCreditPopup && (
              <div className='absolute right-0 mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50'>
                <div className='text-sm text-gray-600 mb-4'>
                  Need more credits to continue interviews?
                  <button 
                    onClick={() => {
                      setShowCreditPopup(false);
                      navigate("/pricing");
                    }} 
                    className='w-full bg-black text-white py-2 rounded-lg text-sm mt-2 font-medium cursor-pointer'
                  >
                    Buy Credits
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. User Profile Button & Popup Wrapper */}
          <div className='relative'>
            <button 
              onClick={() => {
                setShowUserPopup(!showUserPopup);
                setShowCreditPopup(false);
              }} 
              className='w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold overflow-hidden transition hover:opacity-90 cursor-pointer'
            >
              {userData?.name ? userData.name[0].toUpperCase() : <FaUserAstronaut size={16} />}
            </button>
            
            {showUserPopup && (
              <div className='absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'>
                <p className='text-md text-blue-500 font-medium mb-1 px-2 truncate'>
                  {userData?.name || "Guest"}
                </p>
                
                {userData ? (
                  <>
                    <button 
                      onClick={() => {
                        setShowUserPopup(false);
                        navigate("/history");
                      }}
                      className='w-full text-left text-sm py-2 px-2 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-black transition cursor-pointer'
                    >
                      Interview History
                    </button>
                    
                    <button 
                      onClick={handleLogout}
                      className='w-full text-left text-sm py-2 px-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-red-500 transition cursor-pointer'
                    >
                      <HiOutlineLogout size={16} />
                      Logout
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => {
                      setShowUserPopup(false);
                      setShowAuth(true);
                    }}
                    className='w-full text-center text-sm py-2 px-2 mt-2 bg-black text-white rounded-lg font-medium transition hover:bg-gray-800 cursor-pointer'
                  >
                    Sign In
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </motion.div>

      {/* 👇 FIXED: Changed AuthModel to Auth, and added isModel={true} */}
      {showAuth && <Auth isModel={true} onClose={() => setShowAuth(false)} />}
    </div>
  );
}

export default Navbar;