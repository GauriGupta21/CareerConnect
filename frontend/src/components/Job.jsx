import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addSavedJob } from '@/redux/jobSlice';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return 0; // fallback for static / missing date
        const createdAt = new Date(mongodbTime);
        if (isNaN(createdAt)) return 0;
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    const handleSaveJob = () => {
        dispatch(addSavedJob(job));
    };

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 
                        flex flex-col justify-between h-full'>
            <div>
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
                        onClick={handleSaveJob}
                    >
                        <Bookmark />
                    </Button>
                </div>

                <div className='flex items-center gap-2 my-2'>
                    <Button className="p-6" variant="outline" size="icon">
                        <Avatar>
                            <AvatarImage src={job?.company?.logo || ''} />
                        </Avatar>
                    </Button>
                    <div>
                        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                        <p className='text-sm text-gray-500'>India</p>
                    </div>
                </div>

                <div>
                    <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                    <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
                </div>

                <div className='flex flex-wrap items-center gap-2 mt-4'>
                    <Badge className={'text-blue-700 font-bold'} variant="outline">
                        {job?.position} Positions
                    </Badge>
                    <Badge className={'text-[#F83002] font-bold'} variant="outline">
                        {job?.jobType}
                    </Badge>
                    <Badge className={'text-[#09b4b7] font-bold'} variant="outline">
                        {job?.salary} LPA
                    </Badge>
                </div>
            </div>

            <div className='flex flex-col sm:flex-row items-center gap-4 mt-6'>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="w-full sm:w-auto"
                >
                    Details
                </Button>
                <Button 
                    className="bg-[#09b4b7] w-full sm:w-auto"
                    onClick={handleSaveJob}
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
        createdAt: PropTypes.string, // not required anymore, fallback handles it
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        position: PropTypes.number.isRequired,
        jobType: PropTypes.string.isRequired,
        salary: PropTypes.number.isRequired,
    }).isRequired,
};

export default Job;
