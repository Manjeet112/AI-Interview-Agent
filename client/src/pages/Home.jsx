import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { motion } from "motion/react"; // Change to "framer-motion" if you're using Framer Motion
import Auth from "./Auth.jsx";
import {
  BsRobot,
  BsMic,
  BsClock,
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import evalImg from "../assets/aianswer.png";
import techImg from "../assets/history.png";
import confidenceImg from "../assets/3.png";
import resumeImg from "../assets/resume.png";
import bitcoinImg from "../assets/bitcoin.png"
import Footer from "../components/Footer";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const steps = [
    {
      icon: <BsRobot size={24} />,
      step: "STEP 1",
      title: "Role & Experience Selection",
      desc: "AI adjusts difficulty based on selected job role.",
    },
    {
      icon: <BsMic size={24} />,
      step: "STEP 2",
      title: "Smart Voice Interview",
      desc: "Dynamic follow-up questions based on your answers.",
    },
    {
      icon: <BsClock size={24} />,
      step: "STEP 3",
      title: "Timer Based Simulation",
      desc: "Real interview pressure with time tracking.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <Navbar />

      <div className="flex-1 px-6 py-20">
        <div className='max-w-6xl mx-auto'>
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
            <HiSparkles size={16} className="text-green-600" />
            <span>AI Powered Smart Interview Platform</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-28">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto"
          >
            Practice Interviews with{" "}
            <span className="inline-block whitespace-nowrap bg-green-100 text-green-600 px-5 py-1 rounded-full">
              AI Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg"
          >
            Role-based mock interviews with smart follow-ups, adaptive
            difficulty, and real-time performance evaluation.
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <motion.button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }
                navigate("/interview");
              }}
              whileHover={{ opacity: 0.9, scale: 1.03 }}
              whileTap={{ opacity: 1, scale: 0.98 }}
              className="bg-black text-white px-10 py-3 rounded-full hover:opacity-90 transition shadow-md"
            >
              Start Interview
            </motion.button>

            <motion.button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }
                navigate("/history");
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ opacity: 1, scale: 0.98 }}
              className="border border-gray-300 text-gray-700 px-10 py-3 rounded-full hover:bg-green-600 hover:text-white hover:border-green-600 transition duration-300 shadow-sm"
            >
              View History
            </motion.button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-28">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{opacity :0,y:60}}
              whileInView={{opacity:1,y:0}}
              transition={{duration: 0.6+index*0.2}}
              whileHover={{rotate:0, scale: 1.05 }}
              className={`
                relative
                bg-white
                rounded-3xl
                shadow-md
                p-8
                w-80
                transition-all
                duration-300
                ${
                  index === 0
                    ? "rotate-[-4deg]"
                    : index === 1
                    ? "rotate-[3deg] md:-mt-6 shadow-xl"
                    : "rotate-[-3deg]"
                }
              `}
            >
              <div className='absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-green-500 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg' >
              {item.icon}</div>
              <div className='pt-20 text-center'>
            
                <div className='text-xs text-green-600 font-semibold mb-2 tracking-wider'>{item.step}</div>
                <h3 className='font-semibold mb-3 text-lg'>{item.title}</h3>
                <p className='text-sm text-gray-500 leading-relaxed'>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className='mb-32'>
          <motion.h2
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.6}}
           className='text-4xl font-semibold text-center mb-16'>
            Advanced AI{" "}
            <span className="text-green-600">Capabilities</span>

          </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
  {[
    {
      img: evalImg,
      title: "AI Evaluation",
      desc: "Scores communication, technical accuracy and confidence.",
    },
    {
      img: techImg,
      title: "History & Analytics",
      desc: "Track projects with performance graphs and topic analysis",
    },
    {
      img: confidenceImg,
      title: "Downloadable Pdf Report",
      desc: "Detailed Strengths,Weakness and Improvements Insights",
    },
    {
      img: resumeImg,
      title: "Resume Based Interview",
      desc: "Optimize your resume for better interview success.",
    },
  ].map((item, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      viewport={{ once: true }}
      className="bg-white border border-gray-200 rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all flex items-center gap-6"
    >
      {/* Image */}
      <div className="w-36 h-28 flex-shrink-0">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-2xl font-semibold mb-2">
          {item.title}
        </h3>

        <p className="text-gray-500 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  ))}


          </div>
        </div>

        <div className='mb-32'>
          <motion.h2
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.6}}
           className='text-4xl font-semibold text-center mb-16'>
            Multiple Interview{" "}
            <span className="text-green-600">Modes</span>

          </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
  {[
    {
      img: confidenceImg,
      title: "HR Interview Mode",
      desc: "Behavioral and communication based evaluation.",
      isCredit: false,
    },
    {
      img: techImg,
      title: "Technical Mode",
      desc: "Deep technical questioning based on selected role.",
      isCredit: false,
    },
    {
      img: resumeImg,
      title: "Confidence Detection",
      desc: "Basic tone and voice analysis.",
      isCredit: false,
    },
    {
      img: bitcoinImg,
      title: "Credit System",
      desc: "Unlock premium interview sessions.",
      isCredit: true,
    },
  ].map((mode, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      viewport={{ once: true }}
      className={`border rounded-3xl p-10 shadow-sm hover:shadow-xl flex items-center gap-6 transition-all duration-300 group ${
        mode.isCredit 
          ? "bg-white border-gray-200 hover:bg-green-600 hover:border-green-600" 
          : "bg-white border border-gray-200"
      }`}
    >
      {/* Text */}
      <div>
        <h3 className={`text-2xl font-semibold mb-2 transition-colors duration-300 ${
          mode.isCredit ? "group-hover:text-white" : ""
        }`}>
          {mode.title}
        </h3>

        <p className={`leading-relaxed transition-colors duration-300 ${
          mode.isCredit ? "text-gray-500 group-hover:text-green-100" : "text-gray-500"
        }`}>
          {mode.desc}
        </p>
        
      </div>
    
      {/* Image */}
      <div className="w-1/2 flex justify-end">
        <img
          src={mode.img}
          alt={mode.title}
          className="w-28 h-28 object-contain"
        />
      </div>
    </motion.div>
  ))}


          </div>
        </div>
      </div>
      </div>

      {showAuth && ( 
        <Auth
          isModel={true}
          onClose={() => setShowAuth(false)}
        />
      
      )}
      <Footer/>

    </div>
  );
}

export default Home;