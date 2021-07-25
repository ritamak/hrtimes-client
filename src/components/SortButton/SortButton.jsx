import React from "react";
import { FormControl, Select, InputLabel } from "@material-ui/core";

export default function SortButton() {
  const onSort = () => {};
  return (
    <div>
      <FormControl variant="outlined" onSubmit={onSort}>
        <InputLabel htmlFor="outlined-age-native-simple">sort by:</InputLabel>
        <Select
          native
          label="sort"
          inputProps={{
            name: "sort",
          }}
        >
          <option aria-label="None" value="" />
          <option value="section">section</option>
          <option value="subsection">subsection</option>
          <option value="published_date">published date</option>
        </Select>
      </FormControl>
    </div>
  );
}
