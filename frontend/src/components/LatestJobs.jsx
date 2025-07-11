import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const staticJobs = [
    {
        _id: 'static1',
        company: { name: 'Google' },
        title: 'Frontend Developer',
        description: 'Work on cutting edge tech with Google teams.',
        position: '3',
        jobType: 'Full-Time',
        salary: 30,
    },
    {
        _id: 'static2',
        company: { name: 'Microsoft' },
        title: 'Backend Engineer',
        description: 'Build scalable backend systems.',
        position: '2',
        jobType: 'Full-Time',
        salary: 28,
    },
    {
        _id: 'static3',
        company: { name: 'Amazon' },
        title: 'DevOps Engineer',
        description: 'Manage CI/CD pipelines and cloud infrastructure.',
        position: '4',
        jobType: 'Contract',
        salary: 35,
    },
    {
        _id: 'static4',
        company: { name: 'Netflix' },
        title: 'Data Scientist',
        description: 'Analyze viewer data to improve recommendations.',
        position: '1',
        jobType: 'Remote',
        salary: 40,
    },
];

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-7xl mx-auto px-4 my-20'>
            <div className='text-center mb-12'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-gray-800 relative inline-block'>
                    <span className='relative z-10'>
                        <span className='text-[#38c2c2]'>Latest & Top </span> Job Openings
                    </span>
                    <span className='absolute bottom-0 left-0 w-full h-2 bg-[#38c2c2]/20 rounded-full'></span>
                </h1>
                <p className='mt-4 text-gray-600 max-w-xl mx-auto'>
                    Explore top opportunities that fit your skills and interests.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {/* static jobs first */}
                {staticJobs.map(job => (
                    <div
                        key={job._id}
                        className='h-80 flex flex-col transform hover:-translate-y-1 
                        transition duration-300 ease-in-out hover:shadow-xl 
                        rounded-2xl overflow-hidden bg-white'>
                        <LatestJobCards job={{ ...job, position: String(job.position) }} />
                    </div>
                ))}

                {/* dynamic jobs */}
                {allJobs.length <= 0
                    ? <span className='text-gray-500 text-center col-span-full'>No Job Available</span>
                    : allJobs.slice(0, 6).map((job) => (
                        <div
                            key={job._id}
                            className='h-80 flex flex-col transform hover:-translate-y-1 
                            transition duration-300 ease-in-out hover:shadow-xl 
                            rounded-2xl overflow-hidden bg-white'>
                           <LatestJobCards job={{ ...job, position: String(job.position) }} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default LatestJobs;
