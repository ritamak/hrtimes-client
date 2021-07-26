import React from "react";
import { FormControl, Select, InputLabel } from "@material-ui/core";

export default function SortButton(prop) {
  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">sort by:</InputLabel>
        <Select native label="sort" onChange={prop.param}>
          <option aria-label="None" value="" />
          <option value="section" name="section">
            section
          </option>
          <option value="subsection" name="subsection">
            subsection
          </option>
          <option value="published_date" name="published_date">
            published date
          </option>
        </Select>
      </FormControl>
    </div>
  );
}
