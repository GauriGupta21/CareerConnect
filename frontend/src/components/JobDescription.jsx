import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

// static fallback jobs
const staticJobs = [
    {
        title: "Frontend Developer",
        postion: "3",
        jobType: "Full-Time",
        salary: 15,
        location: "Bangalore",
        description: "Work on React, Tailwind and Redux with a dynamic team. Collaborate with designers to create beautiful UIs.",
        experience: 2,
        applications: [{ applicant: "u1" }, { applicant: "u2" }],
        createdAt: "2025-07-05T09:00:00Z"
    },
    {
        title: "Backend Developer",
        postion: "2",
        jobType: "Part-Time",
        salary: 12,
        location: "Hyderabad",
        description: "Develop REST APIs with Node.js and MongoDB. Optimize database performance.",
        experience: 3,
        applications: [{ applicant: "u3" }],
        createdAt: "2025-06-20T09:00:00Z"
    },
    {
        title: "Data Scientist",
        postion: "1",
        jobType: "Remote",
        salary: 25,
        location: "Remote",
        description: "Build ML models to predict customer behavior. Work with big data pipelines.",
        experience: 4,
        applications: [{ applicant: "u4" }],
        createdAt: "2025-07-01T09:00:00Z"
    },
    {
        title: "DevOps Engineer",
        postion: "2",
        jobType: "Contract",
        salary: 18,
        location: "Pune",
        description: "Setup CI/CD with Jenkins and Kubernetes. Maintain infra.",
        experience: 3,
        applications: [],
        createdAt: "2025-07-03T09:00:00Z"
    }
];

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log("Backend failed. Using static job.");
                // fallback: pick a random static job
                const randomStaticJob = staticJobs[Math.floor(Math.random() * staticJobs.length)];
                dispatch(setSingleJob(randomStaticJob));
                setIsApplied(randomStaticJob.applications.some(application => application.applicant === user?._id));
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-5xl mx-auto px-6 py-10'>
            <div 
                className='bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl shadow-xl 
                           transition-transform hover:-translate-y-1 hover:shadow-2xl 
                           p-8 space-y-6'
            >
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                    <div>
                        <h1 className='text-3xl font-extrabold text-gray-800'>{singleJob?.title}</h1>
                        <div className='flex flex-wrap gap-3 mt-4'>
                            <Badge className='text-blue-700 font-medium px-3 py-1' variant="outline">
                                {singleJob?.postion} Positions
                            </Badge>
                            <Badge className='text-[#F83002] font-medium px-3 py-1' variant="outline">
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className='text-[#38c2c2] font-medium px-3 py-1' variant="outline">
                                {singleJob?.salary} LPA
                            </Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-full px-8 py-3 text-base font-semibold shadow-md transition 
                                    ${isApplied 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                                    }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                <div className='pt-4 border-t border-gray-300'>
                    <h2 className='text-2xl font-bold mb-4 text-gray-700'>Job Details</h2>
                    <div className='space-y-3 text-gray-700 text-[1.05rem]'>
                        <p><span className='font-bold'>Role:</span> <span className='ml-2'>{singleJob?.title}</span></p>
                        <p><span className='font-bold'>Location:</span> <span className='ml-2'>{singleJob?.location}</span></p>
                        
                        <div>
                            <p className='font-bold'>Description:</p>
                            <div 
                                className={`ml-4 text-gray-800 transition-all duration-300 ease-in-out 
                                    ${showFullDescription ? 'max-h-full' : 'max-h-24 overflow-hidden'}`}>
                                {singleJob?.description}
                            </div>
                            {singleJob?.description?.length > 100 && (
                                <button 
                                    className='ml-4 mt-1 text-sm text-purple-600 hover:underline'
                                    onClick={() => setShowFullDescription(!showFullDescription)}
                                >
                                    {showFullDescription ? 'Read less' : 'Read more'}
                                </button>
                            )}
                        </div>

                        <p><span className='font-bold'>Experience:</span> <span className='ml-2'>{singleJob?.experience} yrs</span></p>
                        <p><span className='font-bold'>Salary:</span> <span className='ml-2'>{singleJob?.salary} LPA</span></p>
                        <p><span className='font-bold'>Total Applicants:</span> <span className='ml-2'>{singleJob?.applications?.length}</span></p>
                        <p><span className='font-bold'>Posted Date:</span> <span className='ml-2'>{singleJob?.createdAt?.split("T")[0]}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobDescription;
