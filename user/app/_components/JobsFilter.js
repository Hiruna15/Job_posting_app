"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Grid,
  Button,
} from "@mui/material";

const locationOptions = ["Remote", "Hybrid", "On-Site", "All"];
const typeOptions = ["Full time", "Part time", "Internship", "Contract", "All"];

export default function JobsFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    location: "All",
    type: "All",
  });

  const handleLocationChange = (e) => {
    const newFilters = { ...filters, location: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTypeChange = (e) => {
    const newFilters = { ...filters, type: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = { location: "All", type: "All" };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: "#f4f4f4",
        borderRadius: "12px",
        padding: "16px 24px",
        display: "flex",
        gap: "40px",
        maxWidth: "fit-content",
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
        mb: 3,
      }}
    >
      {/* Location Section */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
            marginBottom: "8px",
          }}
        >
          Location
        </Typography>
        <RadioGroup value={filters.location} onChange={handleLocationChange}>
          <Grid container spacing={0.5}>
            {locationOptions.map((loc) => (
              <Grid item xs={6} key={loc}>
                <FormControlLabel
                  value={loc}
                  control={<Radio size="small" />}
                  label={loc}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </Box>

      {/* Type Section */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            borderBottom: "1px solid #ccc",
            paddingBottom: "4px",
            marginBottom: "8px",
          }}
        >
          Type
        </Typography>
        <RadioGroup value={filters.type} onChange={handleTypeChange}>
          <Grid container spacing={0.5}>
            {typeOptions.map((type) => (
              <Grid item xs={6} key={type}>
                <FormControlLabel
                  value={type}
                  control={<Radio size="small" />}
                  label={type}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </Box>

      <Button
        variant="outlined"
        onClick={handleReset}
        sx={{ alignSelf: "flex-end" }}
      >
        Reset
      </Button>
    </Paper>
  );
}
