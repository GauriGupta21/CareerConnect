import { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Make sure to import your CSS file

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center hero-section'> {/* Added hero-section class for animation */}
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#38c2c2] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#38c2c2]'>Dream Jobs</span></h1>
                <p>Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full transition-all duration-300' // Added transition for smooth effect
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#38c2c2] transition-transform duration-300"> {/* Added transition for button */}
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;
