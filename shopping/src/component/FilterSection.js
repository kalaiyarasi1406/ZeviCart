import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./FilterSection.css";

function FilterComponent({ filterChecking, onFilterChecking }) {
  return (
    <Box class="box">
      <h4 style={{ color: "#5c918a", fontStyle: "italic" }}>Search Results:</h4>
      ;
      <FormControl>
        <FormGroup>
          <h4 style={{ color: "#5c918a", fontStyle: "italic" }}>Brands</h4>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterChecking.type.Polo}
                onChange={() => onFilterChecking("type", "Polo")}
              />
            }
            label="Polo"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterChecking.type.Hoodies}
                onChange={() => onFilterChecking("type", "Hoodie")}
              />
            }
            label="Hoodie"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterChecking.type.Basic}
                onChange={() => onFilterChecking("type", "Basic")}
              />
            }
            label="Basic"
          />
        </FormGroup>
        <FormGroup>
          <h4 style={{ color: "#5c918a", fontStyle: "italic" }}>Prize Range</h4>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterChecking.price.range1}
                onChange={() => onFilterChecking("price", "range1")}
              />
            }
            label="0 - RS250"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterChecking.price.range2}
                onChange={() => onFilterChecking("price", "range2")}
              />
            }
            label="RS250 - Rs450"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterChecking.price.range3}
                onChange={() => onFilterChecking("price", "range3")}
              />
            }
            label="RS450+"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}
export default FilterComponent;
