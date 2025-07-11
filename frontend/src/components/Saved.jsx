import { useSelector, useDispatch } from 'react-redux';
import { removeSavedJob } from '@/redux/jobSlice';
import { Badge } from 'lucide-react';

// Static fallback jobs
const staticSavedJobs = [
    {
        _id: 'staticS1',
        company: { name: 'Google' },
        title: 'UI/UX Designer',
        description: 'Design intuitive user interfaces for millions of users.',
        position: '2',
        jobType: 'Full-Time',
        salary: 25,
    },
    {
        _id: 'staticS2',
        company: { name: 'Meta' },
        title: 'Data Engineer',
        description: 'Work on data pipelines and big data technologies.',
        position: '1',
        jobType: 'Contract',
        salary: 30,
    },
    {
        _id: 'staticS3',
        company: { name: 'Spotify' },
        title: 'ML Engineer',
        description: 'Build machine learning models to recommend music.',
        position: '3',
        jobType: 'Remote',
        salary: 28,
    },
    {
        _id: 'staticS4',
        company: { name: 'Netflix' },
        title: 'Product Manager',
        description: 'Drive product strategy for streaming services.',
        position: '1',
        jobType: 'Full-Time',
        salary: 32,
    }
];

const Saved = () => {
    const dispatch = useDispatch();
    const savedJobsFromRedux = useSelector((state) => state.job.savedJobs || []);

    // Show user's saved jobs first, then static fallback jobs
    const savedJobs = [...savedJobsFromRedux, ...staticSavedJobs];

    const handleRemoveJob = (jobId) => {
        dispatch(removeSavedJob(jobId));
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Saved Jobs ({savedJobs.length})
            </h1>

            <ul className="space-y-4">
                {savedJobs.map((job) => (
                    <li
                        key={job._id}
                        className="border rounded-lg shadow-md bg-white p-4 flex justify-between items-start 
                                   transition-transform hover:scale-105 duration-300"
                    >
                        <div className="flex-1">
                            <h1 className="font-medium text-lg md:text-xl text-gray-900">{job?.company?.name}</h1>
                            <p className="text-sm text-gray-500">Location: India</p>
                            <h1 className="font-bold text-lg my-2 md:text-xl text-gray-800">{job?.title}</h1>
                            <p className="text-sm text-gray-600">{job?.description}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                <Badge className="text-blue-700 font-bold" variant="outline">
                                    {job?.position} Positions
                                </Badge>
                                <Badge className="text-[#38c2c2] font-bold" variant="outline">
                                    {job?.jobType}
                                </Badge>
                                <Badge className="text-[#38c2c2] font-bold" variant="outline">
                                    {job?.salary} LPA
                                </Badge>
                            </div>
                        </div>
                        {savedJobsFromRedux.find((j) => j._id === job._id) && (
                            <button
                                onClick={() => handleRemoveJob(job._id)}
                                className="text-red-500 font-bold hover:underline ml-4"
                            >
                                Remove
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Saved;
