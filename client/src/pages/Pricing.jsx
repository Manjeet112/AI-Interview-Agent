import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'motion/react';

// --- Particle Background Effect Component ---
function CardParticles({ active }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Fit canvas to parent element size
        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };
        resizeCanvas();

        // Create particles array
        const particleCount = active ? 45 : 15; // More intense when active
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5,
                // Moves rightward and slightly up/down like blowing dust
                vx: Math.random() * 0.8 + 0.2,
                vy: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.5 + 0.1,
                // Slight waver to look airy
                wobbleSpeed: Math.random() * 0.02,
                wobbleRange: Math.random() * 0.5
            });
        }

        let time = 0;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 1;

            particles.forEach((p) => {
                // Update physics
                p.x += p.vx;
                p.y += p.vy + Math.sin(time * p.wobbleSpeed) * p.wobbleRange;

                // Loop particles back to the left side if they exit right side
                if (p.x > canvas.width) {
                    p.x = -5;
                    p.y = Math.random() * canvas.height;
                }
                if (p.y > canvas.height) p.y = 0;
                if (p.y < 0) p.y = canvas.height;

                // Draw powdery blurred circles
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                // Soft glow emerald color
                ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
                ctx.shadowBlur = active ? 6 : 2;
                ctx.shadowColor = 'rgb(52, 211, 153)';
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        // Handle window resizing safely
        window.addEventListener('resize', resizeCanvas);
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [active]);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply opacity-70"
        />
    );
}

// --- Main Pricing Component ---
function Pricing() {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState("free");
    const [showPopup, setShowPopup] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    
    const plans = [
        {
            id: "free",
            name: "Free",
            price: "₹0",
            credits: 100,
            description: "Perfect for beginners starting interview preparation.",
            features: [
                "100 AI Interview Credits",
                "Basic Performance Report",
                "Voice Interview Access",
                "Limited History Tracking",
            ],
            default: true,
        },
        {
            id: "basic",
            name: "Starter Pack",
            price: "₹100",
            credits: 150,
            description: "Great for focused practice and skill improvement.",
            features: [
                "150 AI Interview Credits",
                "Detailed Feedback",
                "Performance Analytics",
                "Full Interview History",
            ],
            default: false,
        },
        {
            id: "pro",
            name: "Pro Premium",
            price: "₹499",
            credits: 1000,
            description: "Ideal for active job seekers needing deep analytics.",
            features: [
                "1000 AI Interview Credits",
                "Advanced PDF Performance Reports",
                "Voice & Video Interview Access",
                "Unlimited History Tracking",
                "Priority AI Feedback Generation",
            ],
            default: false,
        }
    ];

    const handleUpgradeClick = (planId) => {
        setSelectedPlan(planId);
        setShowPopup(true);
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-16 px-6 relative overflow-x-hidden'>
            {/* Header section */}
            <div className='max-w-6xl mx-auto mb-14 flex items-center relative'>
                <button 
                    onClick={() => navigate(-1)} 
                    className='absolute left-0 p-3 rounded-full bg-white shadow hover:shadow-md transition z-10'
                >
                    <FaArrowLeft className='text-gray-600'/>
                </button>
                
                <div className='text-center w-full'>
                    <h1 className="text-4xl font-bold text-gray-800">
                        Choose Your Plan
                    </h1>
                    <p className="text-gray-500 mt-3 text-lg">
                        Flexible pricing to match your interview preparation goals.
                    </p>
                </div>
            </div>

            {/* Unified Plans Grid container */}
            <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-6'>
                {plans.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    const isHovered = hoveredCard === plan.id;
                    
                    return (
                        <motion.div 
                            key={plan.id}
                            whileHover={!plan.default ? { scale: 1.03 } : {}}
                            onMouseEnter={() => setHoveredCard(plan.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className={`bg-white rounded-3xl shadow-xl p-8 border-2 flex flex-col justify-between relative transition-all duration-300 ${
                                plan.id === "basic" ? 'border-emerald-500' : 'border-gray-100'
                            }`}
                        >
                            {/* The Airy Powder Effect Container (safely isolates overflow hidden here) */}
                            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                                <CardParticles active={isHovered || isSelected || plan.id === 'basic'} />
                            </div>

                            {plan.id === "basic" && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-semibold tracking-wide shadow-md z-20 whitespace-nowrap">
                                    Most Popular
                                </span>
                            )}

                            {/* Relative wrapper ensures content sits above the particle canvas */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{plan.description}</p>
                                
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-500 text-sm">/ month</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                                            <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button 
                                onClick={() => !plan.default && handleUpgradeClick(plan.id)}
                                className={`w-full py-3 px-6 rounded-xl font-semibold text-sm relative z-10 transition-all duration-300 ${
                                    plan.default 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : isSelected 
                                            ? 'bg-emerald-700 text-white shadow-md shadow-emerald-200'
                                            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-100'
                                }`}
                                disabled={plan.default}
                            >
                                {plan.default ? 'Active Plan' : isSelected ? 'Selected' : 'Upgrade Now'}
                            </button>
                        </motion.div>
                    );
                })}
            </div>

            {/* Popup Modal */}
            <AnimatePresence>
                {showPopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center border border-gray-100"
                        >
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-50 mb-4">
                                <FaExclamationCircle className="h-6 w-6 text-amber-500" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Action Not Required
                            </h3>
                            
                            <p className="text-gray-500 text-sm mb-6">
                                You already have enough credits to continue your preparation.
                            </p>
                            
                            <button
                                onClick={() => setShowPopup(false)}
                                className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2.5 bg-slate-800 text-base font-medium text-white hover:bg-slate-700 transition focus:outline-none text-sm"
                            >
                                Got it, thanks!
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Pricing;