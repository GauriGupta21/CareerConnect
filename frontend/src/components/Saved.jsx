import { useSelector, useDispatch } from 'react-redux';
import { removeSavedJob } from '@/redux/jobSlice'; // Import the removeSavedJob action
import { Badge } from 'lucide-react';

const Saved = () => {
    const dispatch = useDispatch();
    const savedJobs = useSelector((state) => state.job.savedJobs || []); // Get saved jobs

    const handleRemoveJob = (jobId) => {
        dispatch(removeSavedJob(jobId)); // Dispatch action to remove job
    };

    return (
        <div className="container mx-auto p-5 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Saved Jobs</h1>
            {savedJobs.length === 0 ? (
                <p className="text-lg text-gray-500 text-center">You have no saved jobs.</p>
            ) : (
                <ul className="space-y-4">
                    {savedJobs.map((job) => (
                        <li key={job._id} className="border rounded-lg shadow-md bg-white p-4 flex justify-between items-start transition-transform hover:scale-104">
                            <div className="flex-1">
                                <h1 className="font-medium text-lg md:text-xl text-gray-900">{job?.company?.name}</h1>
                                <p className="text-sm text-gray-500">Location: India</p>
                                <h1 className="font-bold text-lg my-2 md:text-xl text-gray-800">{job?.title}</h1>
                                <p className="text-sm text-gray-600">{job?.description}</p>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <Badge className="text-blue-700 font-bold" variant="ghost">
                                        {job?.position} Positions
                                    </Badge>
                                    <Badge className="text-[#38c2c2] font-bold" variant="ghost">
                                        {job?.jobType}
                                    </Badge>
                                    <Badge className="text-[#38c2c2] font-bold" variant="ghost">
                                        {job?.salary} LPA
                                    </Badge>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleRemoveJob(job._id)} 
                                className="text-red-500 font-bold hover:underline"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Saved;
