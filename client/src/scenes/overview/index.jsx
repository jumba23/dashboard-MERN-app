import React from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";

import Header from "../../components/Header";
import OverviewChart from "../../components/OverviewChart";
import { useState } from "react";

const Overview = () => {
  const [view, setView] = useState("units");
  return (
    <Box>
      <Header
        title="OVERVIEW"
        subtitle="Overview of general revenue and profits"
      />
      <Box>
        <FormControl sx={{ mt: 1 }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;
