import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const staticAppliedJobs = [
    {
        _id: 'staticA1',
        createdAt: '2025-07-01T10:00:00Z',
        job: {
            title: 'Frontend Developer',
            company: { name: 'Google' }
        },
        status: 'pending'
    },
    {
        _id: 'staticA2',
        createdAt: '2025-06-25T10:00:00Z',
        job: {
            title: 'Backend Engineer',
            company: { name: 'Microsoft' }
        },
        status: 'accepted'
    },
    {
        _id: 'staticA3',
        createdAt: '2025-06-15T10:00:00Z',
        job: {
            title: 'Data Analyst',
            company: { name: 'Amazon' }
        },
        status: 'rejected'
    },
    {
        _id: 'staticA4',
        createdAt: '2025-06-10T09:00:00Z',
        job: {
            title: 'DevOps Engineer',
            company: { name: 'Netflix' }
        },
        status: 'pending'
    },
    {
        _id: 'staticA5',
        createdAt: '2025-06-05T11:30:00Z',
        job: {
            title: 'iOS Developer',
            company: { name: 'Apple' }
        },
        status: 'accepted'
    },
    {
        _id: 'staticA6',
        createdAt: '2025-05-28T13:20:00Z',
        job: {
            title: 'Machine Learning Engineer',
            company: { name: 'Spotify' }
        },
        status: 'rejected'
    },
    {
        _id: 'staticA7',
        createdAt: '2025-05-22T14:45:00Z',
        job: {
            title: 'Full Stack Developer',
            company: { name: 'Uber' }
        },
        status: 'pending'
    },
    {
        _id: 'staticA8',
        createdAt: '2025-05-15T10:05:00Z',
        job: {
            title: 'React Developer',
            company: { name: 'Facebook' }
        },
        status: 'accepted'
    },
    {
        _id: 'staticA9',
        createdAt: '2025-05-08T08:50:00Z',
        job: {
            title: 'Security Analyst',
            company: { name: 'PayPal' }
        },
        status: 'pending'
    },
    {
        _id: 'staticA10',
        createdAt: '2025-05-01T15:15:00Z',
        job: {
            title: 'Database Administrator',
            company: { name: 'Oracle' }
        },
        status: 'rejected'
    },
];


const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    // Combine static + dynamic
    const combinedAppliedJobs = [...staticAppliedJobs, ...allAppliedJobs];

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        combinedAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan="4" className="text-center text-gray-500">
                                    You have not applied to any job yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            combinedAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id}>
                                    <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{appliedJob.job?.title}</TableCell>
                                    <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge className={`text-white ${appliedJob?.status === "rejected"
                                            ? 'bg-red-400'
                                            : appliedJob.status === 'pending'
                                                ? 'bg-gray-400'
                                                : 'bg-green-400'}`}>
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
