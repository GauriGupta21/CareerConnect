import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux'; // Import useDispatch to connect to Redux
import { addSavedJob } from '@/redux/jobSlice'; // Import the action to save a job

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Create dispatch to use in saving job

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    // Function to handle saving the job
    const handleSaveJob = () => {
        dispatch(addSavedJob(job)); // Dispatch action to add the job to saved jobs
    };

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0
                        ? "Today"
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button 
    variant="outline" 
    className="rounded-full" 
    size="icon" 
    onClick={handleSaveJob} // Connect bookmark action to button
>
    <Bookmark />
</Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className={'text-[#09b4b7] font-bold'} variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
            <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="w-full sm:w-auto"
                >
                    Details
                </Button>
                <Button 
                    className="bg-[#09b4b7] w-full sm:w-auto"
                    onClick={handleSaveJob} // Add onClick event to save job
                >
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

Job.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        company: PropTypes.shape({
            name: PropTypes.string.isRequired,
            logo: PropTypes.string,
        }).isRequired,
        createdAt: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        position: PropTypes.number.isRequired,
        jobType: PropTypes.string.isRequired,
        salary: PropTypes.number.isRequired,
    }).isRequired,
};

export default Job;
