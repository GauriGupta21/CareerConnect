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
    {
        _id: 'static5',
        company: { name: 'Apple' },
        title: 'iOS Developer',
        description: 'Develop innovative mobile apps for iPhone and iPad.',
        position: '2',
        jobType: 'Full-Time',
        salary: 32,
    },
    {
        _id: 'static6',
        company: { name: 'Tesla' },
        title: 'AI Researcher',
        description: 'Research autonomous driving algorithms.',
        position: '1',
        jobType: 'Contract',
        salary: 45,
    },
    {
        _id: 'static7',
        company: { name: 'Spotify' },
        title: 'Machine Learning Engineer',
        description: 'Work on personalized music recommendations.',
        position: '2',
        jobType: 'Full-Time',
        salary: 33,
    },
    {
        _id: 'static8',
        company: { name: 'Uber' },
        title: 'Full Stack Developer',
        description: 'Build tools for dynamic pricing and driver matching.',
        position: '3',
        jobType: 'Remote',
        salary: 29,
    },
    {
        _id: 'static9',
        company: { name: 'Facebook' },
        title: 'React Developer',
        description: 'Improve UI experiences across Facebook apps.',
        position: '4',
        jobType: 'Full-Time',
        salary: 31,
    },
    {
        _id: 'static10',
        company: { name: 'Twitter' },
        title: 'Backend Node.js Engineer',
        description: 'Scale APIs for millions of users.',
        position: '2',
        jobType: 'Full-Time',
        salary: 27,
    },
    {
        _id: 'static11',
        company: { name: 'Airbnb' },
        title: 'UI/UX Designer',
        description: 'Design intuitive booking experiences.',
        position: '1',
        jobType: 'Contract',
        salary: 25,
    },
    {
        _id: 'static12',
        company: { name: 'Slack' },
        title: 'Site Reliability Engineer',
        description: 'Ensure high availability and performance.',
        position: '2',
        jobType: 'Full-Time',
        salary: 34,
    },
    {
        _id: 'static13',
        company: { name: 'Shopify' },
        title: 'Ruby on Rails Developer',
        description: 'Work on e-commerce platform improvements.',
        position: '3',
        jobType: 'Remote',
        salary: 30,
    },
    {
        _id: 'static14',
        company: { name: 'Stripe' },
        title: 'Payments API Developer',
        description: 'Build secure payment solutions.',
        position: '1',
        jobType: 'Full-Time',
        salary: 36,
    },
    {
        _id: 'static15',
        company: { name: 'Adobe' },
        title: 'Cloud Infrastructure Engineer',
        description: 'Manage Adobe cloud services.',
        position: '2',
        jobType: 'Full-Time',
        salary: 29,
    },
    {
        _id: 'static16',
        company: { name: 'Intel' },
        title: 'Embedded Systems Engineer',
        description: 'Develop microprocessor solutions.',
        position: '3',
        jobType: 'Contract',
        salary: 28,
    },
    {
        _id: 'static17',
        company: { name: 'LinkedIn' },
        title: 'Data Engineer',
        description: 'Optimize data pipelines for analytics.',
        position: '2',
        jobType: 'Full-Time',
        salary: 34,
    },
    {
        _id: 'static18',
        company: { name: 'PayPal' },
        title: 'Security Analyst',
        description: 'Monitor systems for fraud and breaches.',
        position: '1',
        jobType: 'Full-Time',
        salary: 31,
    },
    {
        _id: 'static19',
        company: { name: 'Oracle' },
        title: 'Database Administrator',
        description: 'Manage large-scale databases.',
        position: '2',
        jobType: 'Full-Time',
        salary: 33,
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
                        <span className='text-gray-500 text-center col-span-full'>More Jobs Are Available</span>
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
