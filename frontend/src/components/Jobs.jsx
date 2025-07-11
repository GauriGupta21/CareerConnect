import { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// static fallback jobs
const staticJobs = [
    {
        _id: 'static1',
        title: "Frontend Developer",
        description: "Work on React, Tailwind and Redux with a dynamic team.",
        location: "Bangalore",
        salary: 15,
        jobType: "Full-Time",
        postion: "3",
    },
    {
        _id: 'static2',
        title: "Backend Developer",
        description: "Build Node.js REST APIs and work with MongoDB.",
        location: "Hyderabad",
        salary: 12,
        jobType: "Part-Time",
        postion: "2",
    },
    {
        _id: 'static3',
        title: "Data Scientist",
        description: "Develop ML models to predict business metrics.",
        location: "Remote",
        salary: 25,
        jobType: "Remote",
        postion: "1",
    },
    {
        _id: 'static4',
        title: "DevOps Engineer",
        description: "Setup CI/CD pipelines and manage infra.",
        location: "Pune",
        salary: 18,
        jobType: "Contract",
        postion: "2",
    },
    {
        _id: 'static5',
        title: "UI/UX Designer",
        description: "Design intuitive user interfaces.",
        location: "Delhi",
        salary: 10,
        jobType: "Full-Time",
        postion: "1",
    },
    {
        _id: 'static6',
        title: "Cloud Engineer",
        description: "Deploy and manage apps on AWS.",
        location: "Chennai",
        salary: 22,
        jobType: "Full-Time",
        postion: "2",
    }
];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);

    // if backend didn't load, fallback to static jobs
    const jobsData = allJobs.length > 0 ? allJobs : staticJobs;

    const [filterJobs, setFilterJobs] = useState(jobsData);

    useEffect(() => {
        let filteredJobs = jobsData;
        if (searchedQuery) {
            filteredJobs = jobsData.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
        }
        setFilterJobs(filteredJobs);
    }, [jobsData, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4'>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='w-full lg:w-1/4'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[80vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs
