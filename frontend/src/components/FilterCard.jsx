import { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

   const changeHandler = (value) => {
    if (selectedValue === value) {
        // same value clicked again -> deselect
        setSelectedValue('');
    } else {
        setSelectedValue(value);
    }
};

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white p-4 sm:p-6 rounded-md shadow-sm'>
            <h1 className='font-bold text-lg sm:text-xl mb-3'>Filter Jobs</h1>
            <hr className='mb-4' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={`filter-type-${index}`} className="mb-4">
                            <h2 className='font-semibold text-base sm:text-lg mb-2'>{data.fitlerType}</h2>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div key={`filter-item-${itemId}`} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId}onClick={() => {
        if (selectedValue === item) {
            setSelectedValue('');
        }
    }} className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <Label htmlFor={itemId} className="text-sm sm:text-base cursor-pointer">{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}


export default FilterCard