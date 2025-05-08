"use client";

import styled from "styled-components";
import JobCard from "./JobCard";
import JobsFilter from "./JobsFilter";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";
import { BounceLoader, MoonLoader, PuffLoader } from "react-spinners";

const Main = styled.main`
  min-height: 100%;
  /* padding: 1.5em 4em; */
  padding: 3em 0;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  align-items: center;
  position: relative;
`;

const JobsList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2em;
  justify-content: center;
  min-height: 100%;
`;

export default function JobPageClient() {
  const [filters, setFilters] = useState({
    location: "All",
    type: "All",
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async (filterParams) => {
    try {
      setLoading(true);
      const response = await fetch("/api/jobs/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterParams),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      setJobs(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(filters);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Main>
      {loading ? (
        <PuffLoader
          cssOverride={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <>
          <JobsFilter onFilterChange={handleFilterChange} />

          <JobsList>
            {jobs.length ? (
              jobs.map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <p>no Jobs to be found</p>
            )}
          </JobsList>
        </>
      )}
    </Main>
  );
}
