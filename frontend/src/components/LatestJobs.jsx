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
                    ? <span className='text-gray-500 text-center col-span-full'>Search Job That Suit Your Profile </span>
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
