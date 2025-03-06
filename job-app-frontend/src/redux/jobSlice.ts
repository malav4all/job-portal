import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: { jobs: [], applications: [] },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
  },
});

export const { setJobs, setApplications } = jobSlice.actions;
export default jobSlice.reducer;
