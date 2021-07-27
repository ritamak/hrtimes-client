import React from "react";
import { FormControl, Select, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

export default function SortButton({ sortBy }) {
  const [name, setName] = React.useState("");

  const handleChange = (event) => {
    setName(event.target.value);
    sortBy(event);
  };
  return (
    <FormControl style={{ width: "200px" }}>
      <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={name}
        onChange={handleChange}
      >
        <MenuItem value="section">Section</MenuItem>
        <MenuItem value="updated_date">Updated Date</MenuItem>
        <MenuItem value="published_date">Published Date</MenuItem>
      </Select>
    </FormControl>
  );
}
