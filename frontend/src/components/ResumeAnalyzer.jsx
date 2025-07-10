import { useState } from 'react';

const ResumeAnalyzer = () => {
    const [resumeText, setResumeText] = useState('');
    const [analysis, setAnalysis] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/v1/resume/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resumeText }), // Sending resumeText in body
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setAnalysis(result.analysis); // Store analysis result
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Resume Analyzer</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume text here"
                    required
                />
                <button type="submit">Analyze Resume</button>
            </form>
            {analysis && (
                <div>
                    <h2>Analysis:</h2>
                    <p>{analysis}</p>
                </div>
            )}
        </div>
    );
};

export default ResumeAnalyzer;
