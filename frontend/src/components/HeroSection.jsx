import { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { toast } from 'sonner';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        console.log("Dispatching searchedQuer1y:", query)
        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
            toast.warning("Please enter a keyword to search");
            return;
        }
        console.log("Dispatching searchedQuery:", query)
        dispatch(setSearchedQuery(trimmedQuery));
        navigate("/browse");
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    }
    return (
        <div className="text-center hero-section px-4 py-12">
            <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                <span className="inline-block px-5 py-2 rounded-full bg-gray-100 text-[#38c2c2] font-semibold">
                    No. 1 Job Hunt Website
                </span>
                <h1 className="text-4xl md:text-5xl font-bold">
                    Search, Apply & <br />
                    Get Your <span className="text-[#38c2c2]">Dream Jobs</span>
                </h1>
                <p className="text-gray-600 text-base md:text-lg">
                    Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.
                </p>
<div className="flex w-full max-w-xl mx-auto mt-8 border border-gray-300 rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-[#38c2c2] transition">
    <input
        type="text"
         value={query}  
        placeholder="Find your dream jobs"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-6 py-3 mb-0 text-sm md:text-base bg-transparent placeholder-gray-400 outline-none"
    />
    <Button
        onClick={searchJobHandler}
        className="h-50 bg-[#38c2c2] hover:bg-[#2ba8a8] px-6 transition-colors duration-300 rounded-none"//
    >
        <Search className="h-5 w-5 text-white" />
    </Button>
</div>



            </div>
        </div>
    )
}

export default HeroSection;
