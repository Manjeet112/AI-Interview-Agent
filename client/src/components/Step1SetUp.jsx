import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
    FaUserTie,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
    FaBriefcase,
} from "react-icons/fa";
import axios from "axios";

const ServerUrl = "https://three-interview.onrender.com";

// --- Global Page Particle Background Effect Component ---
function PageParticles() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        // 60 particles drifting across the entire layout
        const particleCount = 60; 
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2.5 + 0.5,
                vx: Math.random() * 0.4 + 0.1, // Smooth drift rightward
                vy: (Math.random() - 0.5) * 0.2,
                alpha: Math.random() * 0.4 + 0.1,
                wobbleSpeed: Math.random() * 0.01,
                wobbleRange: Math.random() * 0.4
            });
        }

        let time = 0;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 1;

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy + Math.sin(time * p.wobbleSpeed) * p.wobbleRange;

                // Loop edges gracefully
                if (p.x > canvas.width) {
                    p.x = -5;
                    p.y = Math.random() * canvas.height;
                }
                if (p.y > canvas.height) p.y = 0;
                if (p.y < 0) p.y = canvas.height;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
                ctx.shadowBlur = 4;
                ctx.shadowColor = 'rgb(52, 211, 153)';
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        window.addEventListener('resize', resizeCanvas);
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="fixed inset-0 w-full h-full pointer-events-none mix-blend-multiply opacity-60 z-0"
        />
    );
}

function Step1SetUp({ onStart }) {
    const { userData } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true);
        
        const formdata = new FormData();
        formdata.append("resume", resumeFile);
        
        try {
            const result = await axios.post(
                `${ServerUrl}/api/interview/resume`,
                formdata,
                { withCredentials: true }
            );
            
            console.log("Backend Response:", result.data);
            
            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);
            setAnalyzing(false);
        } catch (error) {
            console.error("Upload Error:", error);
            setAnalyzing(false);
        }
    };

    const handleStart = async () => {
        setLoading(true);
        try {
            const result = await axios.post(
                `${ServerUrl}/api/interview/generate-questions`,
                { role, experience, mode, resumeText, projects, skills },
                { withCredentials: true }
            );
            console.log(result.data);
            
            setLoading(false);
            onStart(result.data);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    
    const features = [
        { icon: <FaUserTie className="text-green-600 text-xl" />, text: "Choose Role & Experience" },
        { icon: <FaMicrophoneAlt className="text-green-600 text-xl" />, text: "Smart Voice Interview" },
        { icon: <FaChartLine className="text-green-600 text-xl" />, text: "Performance Analytics" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 px-4 relative overflow-hidden'
        >
            {/* Ambient Background Sprinkles Layer */}
            <PageParticles />

            <div className='w-full max-w-6xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden relative z-10 border border-white/20'>
                <motion.div className='relative bg-gradient-to-br from-green-50/70 to-green-100/70 p-12 flex flex-col justify-center'>
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">Start Your AI Interview</h2>
                    <p className="text-gray-600 mb-10">
                        Practice real interview scenarios powered by AI. Improve communication, technical skills, and confidence.
                    </p>
                    
                    <div className='space-y-5'>
                        {features.map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ x: -150, opacity: 0 }} 
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 + index * 0.25, duration: 0.65, ease: "easeOut" }} 
                                whileHover={{ scale: 1.03 }}
                                className='flex items-center space-x-4 bg-white/80 p-4 rounded-xl shadow-sm cursor-pointer border border-gray-100'
                            >
                                {item.icon}
                                <span className='text-gray-700 font-medium'>{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="p-12 bg-white/60"
                >
                    <h2 className='text-3xl font-bold text-gray-800 mb-8'>Interview Setup</h2>
                    <div className='space-y-6'>
                        <div className='relative'>
                            <FaUserTie className='absolute top-4 left-4 text-gray-400'/>
                            <input 
                                type='text' 
                                placeholder='Enter role'
                                className='w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition'
                                onChange={(e) => setRole(e.target.value)} 
                                value={role}
                            />
                        </div>
                        
                        <div className='relative'>
                            <FaBriefcase className='absolute top-4 left-4 text-gray-400'/>
                            <input 
                                type='text' 
                                placeholder='Experience (e.g. 2 years)'
                                className='w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition'
                                onChange={(e) => setExperience(e.target.value)} 
                                value={experience}
                            />
                        </div>

                        <select 
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className='w-full py-3 px-4 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition'
                        >
                            <option value="Technical">Technical Interview</option>
                            <option value="HR">HR Interview</option>
                        </select>

                        {!analysisDone && (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className='border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50/50 bg-white/40 transition'
                            >
                                <FaFileUpload className='text-4xl mx-auto text-green-600 mb-3'/>
                                <input 
                                    type="file"
                                    accept="application/pdf"
                                    id="resumeUpload"
                                    className='hidden'
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />
                                <p className='text-gray-600 font-medium'>
                                    {resumeFile ? resumeFile.name : "Click to upload resume (Optional)"}
                                </p>
                                {resumeFile && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        onClick={(e) => { e.stopPropagation(); handleUploadResume(); }}
                                        className='mt-4 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition'
                                    >
                                        {analyzing ? "Analyzing..." : "Analyze Resume"}
                                    </motion.button>
                                )}
                            </motion.div>
                        )}
                        
                        {analysisDone && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4'
                            >
                                <h3 className='text-lg font-semibold text-gray-800'>Resume Analysis Result</h3> 
                                
                                {projects.length > 0 ? (
                                    <div>
                                        <p className='font-medium text-gray-700 mb-1'>Projects:</p>
                                        <ul className='list-disc list-inside text-gray-600 space-y-1'>
                                            {projects.map((p, i) => (<li key={i}>{p}</li>))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p className='text-sm italic text-gray-500'>No projects identified by the AI.</p>
                                )}

                                {skills.length > 0 ? (
                                    <div>
                                        <p className='font-medium text-gray-700 mb-1'>Skills:</p>
                                        <div className='flex flex-wrap gap-2 text-gray-600 mt-2'>
                                            {skills.map((s, i) => (
                                                <span key={i} className='bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap'>
                                                    {s}
                                                </span>
                                            ))}
                                        </div> 
                                    </div>
                                ) : (
                                    <p className='text-sm italic text-gray-500'>No skills identified by the AI.</p>
                                )}
                            </motion.div>
                        )}

                        <motion.button
                            onClick={handleStart}
                            disabled={!role || !experience || loading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className='w-full disabled:bg-gray-400 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md'
                        >
                            {loading ? "Starting..." : "Start Interview"}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Step1SetUp;
