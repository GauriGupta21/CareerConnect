import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='w-full p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer 
                       transition-transform transform hover:scale-105 flex flex-col h-full'
        >
            <div>
                <h1 className='font-medium text-lg sm:text-xl'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>

            <div className='mt-2 flex-1'>
                <h1 className='font-bold text-lg my-2 sm:text-xl'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-3'>
                    {job?.description}
                </p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className={'text-[#38c2c2] font-bold'} variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className={'text-[#38c2c2] font-bold'} variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};


LatestJobCards.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        company: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        position: PropTypes.string.isRequired,
        jobType: PropTypes.string.isRequired,
        salary: PropTypes.number.isRequired,
    }).isRequired,
};

export default LatestJobCards;
