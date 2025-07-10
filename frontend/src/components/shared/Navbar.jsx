import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white px-4'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <h1 className='text-2xl font-bold'>Career<span className='text-[#38c2c2]'>Connect</span></h1>

                {/* Hamburger menu icon for mobile */}
                <div className="sm:hidden">
                    <Menu className='cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
                </div>

                {/* Desktop Menu */}
                <div className='hidden sm:flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                    <li><Link to="/saved">Saved</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#38c2c2] hover:bg-[#38c2ab]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-5 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-3 cursor-pointer mb-5'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }
                                            <div className='flex w-fit items-center gap-3 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>

            {/* Mobile Slide Menu */}
            {isOpen && (
                <div className="sm:hidden mt-4 flex flex-col gap-4 transition-all duration-300">
                    <ul className='flex flex-col font-medium gap-4'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" onClick={() => setIsOpen(false)}>Companies</Link></li>
                                    <li><Link to="/admin/jobs" onClick={() => setIsOpen(false)}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                                    <li><Link to="/jobs" onClick={() => setIsOpen(false)}>Jobs</Link></li>
                                    <li><Link to="/browse" onClick={() => setIsOpen(false)}>Browse</Link></li>
                                    <li><Link to="/saved" onClick={() => setIsOpen(false)}>Saved</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex flex-col gap-2'>
                                <Link to="/login" onClick={() => setIsOpen(false)}><Button variant="outline" className='w-full'>Login</Button></Link>
                                <Link to="/signup" onClick={() => setIsOpen(false)}><Button className="bg-[#38c2c2] hover:bg-[#38c2ab] w-full">Signup</Button></Link>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-4'>
                                {user?.role === 'student' && (
                                    <div className='flex items-center gap-3'>
                                        <User2 />
                                        <Button variant="link" onClick={() => setIsOpen(false)}> <Link to="/profile">View Profile</Link></Button>
                                    </div>
                                )}
                                <div className='flex items-center gap-3'>
                                    <LogOut />
                                    <Button variant="link" onClick={() => { logoutHandler(); setIsOpen(false); }}>Logout</Button>
                                </div>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    )
}

export default Navbar
