import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        savedJobs: [], // Added saved jobs array
    },
    reducers: {
        // Actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        addSavedJob: (state, action) => {
            if (!Array.isArray(state.savedJobs)) {
                state.savedJobs = []; // Initialize as an empty array if undefined
            }
            const jobExists = state.savedJobs.find(job => job._id === action.payload._id);
            if (!jobExists) {
                state.savedJobs.push(action.payload);
            }
        },
        removeSavedJob: (state, action) => {
            // Remove a job from savedJobs
            state.savedJobs = state.savedJobs.filter(job => job._id !== action.payload);
        },
    },
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    addSavedJob, // Export the action to add saved jobs
    removeSavedJob, // Export the action to remove saved jobs
} = jobSlice.actions;

export default jobSlice.reducer;
