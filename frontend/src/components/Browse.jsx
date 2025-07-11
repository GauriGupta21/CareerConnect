import { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

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

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <h1 className='font-bold text-xl my-10'>
                    Search Results ({allJobs.length + staticJobs.length})
                </h1>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {staticJobs.map(job => (
                        <Job key={job._id} job={job} />
                    ))}
                    {allJobs.length <= 0 ? (
                        <span className='text-gray-500 text-center col-span-full'>No Job Available</span>
                    ) : (
                        allJobs.map(job => (
                            <Job key={job._id} job={job} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Browse
