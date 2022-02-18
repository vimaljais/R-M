import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";

const Home = (props) => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("dsds");

  const searchQuery = (q) => {
    navigate(`/show/`, { state: { query: q } });
  };

  return (
    <div>
      <TextField
        id="filled-basic"
        label="Filled"
        variant="filled"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={() => searchQuery(query)}>Search</Button>
    </div>
  );
};

export default Home;
