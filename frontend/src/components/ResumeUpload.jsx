// ResumeUpload.jsx
import { useState } from 'react';

const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const [feedback, setFeedback] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await fetch('/api/analyze-resume', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setFeedback(data.feedback); // Assuming the API returns feedback
        } catch (error) {
            console.error('Error uploading resume:', error);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl font-bold mb-4">Upload Your Resume</h1>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            <button 
                onClick={handleUpload} 
                className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
                Analyze Resume
            </button>
            {feedback && (
                <div className="mt-4 p-4 border border-gray-300 rounded">
                    <h2 className="font-bold text-lg">Analysis Feedback:</h2>
                    <p>{feedback}</p>
                </div>
            )}
        </div>
    );
};

export default ResumeUpload;
