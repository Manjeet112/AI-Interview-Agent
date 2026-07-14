import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ResponsiveContainer, Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function StepReport({ report }) {
    const navigate = useNavigate();

    if (!report) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Loading Report...</p>
            </div>
        );
    }

    const {
        finalScore = 0,
        confidence = 0,
        communication = 0,
        correctness = 0,
        questionWiseScore = [],
    } = report;

    const questionScoreData = questionWiseScore.map((score, index) => ({
        name: `Q${index + 1}`,
        score: score.score || 0
    }));

    const skills = [
        { label: "Confidence", value: confidence },
        { label: "Communication", value: communication },
        { label: "Correctness", value: correctness },
    ];

    let performanceText = "";
    let shortTagline = "";
    if (finalScore >= 8) {
        performanceText = "Ready for job opportunities.";
        shortTagline = "Excellent clarity and structured responses.";
    } else if (finalScore >= 5) {
        performanceText = "Needs minor improvement before interviews";
        shortTagline = "Good foundation, refine articulation.";
    } else {
        performanceText = "Significant improvement required.";
        shortTagline = "Work on clarity and Confidence.";
    }

    const score = finalScore;
    const percentage = (score / 10) * 100;

    const downloadPdf = () => {
        const doc = new jsPDF("p", "mm", "a4");
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        const contentWidth = pageWidth - margin * 2;
        let currentY = 25;

        // ========= TITLE =========
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(34, 197, 94);
        doc.text("AI Interview Performance Report", pageWidth / 2, currentY, { align: "center" });
        currentY += 5;
        
        doc.setDrawColor(34, 197, 94);
        doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);
        currentY += 15;

        // ========= SCORE BOX =========
        doc.setFillColor(240, 253, 244);
        doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(`Final Score: ${finalScore}/10`, pageWidth / 2, currentY + 13, { align: "center" });
        currentY += 30;

        // ========= SKILLS BOX =========
        doc.setFillColor(249, 250, 251);
        doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Confidence: ${confidence}/10`, margin + 10, currentY + 10);
        doc.text(`Communication: ${communication}/10`, margin + 10, currentY + 18);
        doc.text(`Correctness: ${correctness}/10`, margin + 10, currentY + 26);
        currentY += 45;

        // ========= ADVICE BOX =========
        let advice = "";
        if (finalScore >= 8) {
            advice = "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
        } else if (finalScore >= 5) {
            advice = "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
        } else {
            advice = "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud.";
        }

        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(220);
        doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);
        
        doc.setFont("helvetica", "bold");
        doc.text("Professional Advice", margin + 10, currentY + 10);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
        doc.text(splitAdvice, margin + 10, currentY + 20);
        currentY += 50;

        // ========= QUESTION TABLE =========
        autoTable(doc, {
            startY: currentY,
            margin: { left: margin, right: margin },
            head: [["#", "Question", "Score", "Feedback"]],
            body: questionWiseScore.map((q, i) => [
                `${i + 1}`,
                q.question || "N/A",
                `${q.score ?? 0}/10`,
                q.feedback || "No feedback available.",
            ]),
            styles: {
                fontSize: 9,
                cellPadding: 5,
                valign: "top",
            },
            headStyles: {
                fillColor: [34, 197, 94],
                textColor: 255,
                halign: "center",
            },
            columnStyles: {
                0: { cellWidth: 10, halign: "center" },
                1: { cellWidth: 55 },
                2: { cellWidth: 20, halign: "center" },
                3: { cellWidth: "auto" },
            },
            alternateRowStyles: {
                fillColor: [249, 250, 251],
            },
        });

        doc.save("AI_Interview_Report.pdf");
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50 px-4 sm:px-6 lg:px-10 py-8">
            
            {/* Header section */}
            <div className='mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                <div className='flex items-start gap-4 flex-1 min-w-0'>
                    <button
                        onClick={() => navigate("/history")}
                        className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition shrink-0'
                    >
                        <FaArrowLeft className='text-gray-600'/>
                    </button>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-800 break-words'>Interview Analytics Dashboard</h1>
                        <p className='text-gray-500 mt-2'>AI-powered performance insights</p>
                    </div>
                </div>

                <button 
                    onClick={downloadPdf}
                    className='md:self-center self-start bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 font-semibold text-sm sm:text-base text-nowrap shrink-0'
                >
                    Download PDF
                </button>               
            </div>

            {/* Layout Grid container */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
                
                {/* Left side Column */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    
                    {/* Overall Performance Card */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 text-center flex flex-col justify-center items-center h-[280px]"
                    >
                        <h3 className="text-gray-500 mb-3 text-sm sm:text-base font-medium">
                            Overall Performance
                        </h3>
                        <div className='w-24 h-24 sm:w-28 sm:h-28 mx-auto'>
                            <CircularProgressbar 
                                value={percentage}
                                text={`${score}/10`}
                                styles={buildStyles({
                                    textSize: "18px",
                                    pathColor: "#10b981",
                                    textColor: "#10b981",
                                    trailColor: "#e5e7eb"
                                })}
                            />
                        </div>
               
                        <div className="mt-4">
                            <p className="font-semibold text-gray-800 text-sm">
                                {performanceText}
                            </p>
                            <p className="text-gray-500 text-xs mt-0.5">
                                {shortTagline}
                            </p>
                        </div>
                    </motion.div>

                    {/* Skill Evaluation Card */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 h-[280px] flex flex-col justify-center'
                    >
                        <h3 className='text-base sm:text-lg font-semibold text-gray-700 mb-4'>
                            Skill Evaluation
                        </h3>
                        <div className='space-y-4'>
                            {skills.map((s, i) => (
                                <div key={i} className="space-y-1">
                                    <div className='flex justify-between text-sm'>
                                        <span className="text-gray-600 font-medium">{s.label}</span>
                                        <span className='font-bold text-emerald-600'>{s.value}/10</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2 rounded-full">
                                        <div 
                                            className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                                            style={{ width: `${(s.value / 10) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right side Space */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Performance Trend Chart */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8'
                    >
                        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
                            Performance Trend
                        </h3>
                        <div className='h-64 sm:h-72'>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={questionScoreData}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis domain={[0, 10]}/>
                                    <Tooltip/>
                                    <Area 
                                        type='monotone'
                                        dataKey="score"
                                        stroke="#22c55e"
                                        fill="#bbf7d0"
                                        strokeWidth={3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Question Breakdown Listing */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8'
                    >
                        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
                            Question Breakdown
                        </h3>
                        <div className='space-y-6'>
                            {questionWiseScore.map((q, i) => (
                                <div key={i} className="bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200">
                                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4'>
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Question {i + 1}
                                            </p>
                                            <p className='font-semibold text-gray-800 text-sm sm:text-base leading-relaxed mb-2'>
                                                {q.question || "Question not available"}
                                            </p>
                                            <div className='bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium text-xs sm:text-sm w-fit'>
                                                {q.score ?? 0}/10
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-green-50 border border-green-200 p-4 rounded-lg'>
                                        <p className='text-xs text-green-600 font-semibold mb-1'>
                                            AI Feedback
                                        </p>
                                        <p className='text-sm text-gray-700 leading-relaxed'>
                                            {q.feedback && q.feedback.trim() !== ""
                                                ? q.feedback 
                                                : "No feedback available for this question"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default StepReport;