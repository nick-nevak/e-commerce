import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Filter } from "../../types/filters";

type Props = {
  filters: Filter[];
}
const CatalogFilters = (props: Props) => {
  // display filters using material-ui accordion
  // https://mui.com/components/accordion/



  return (
    <div>
      {props.filters.map((filter) => (

        <div key={filter.name}>
          <Accordion expanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>{filter.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {filter.values.map((value) => (
                  <ListItem key={value.name}>
                    <Checkbox
                      checked={value.checked}
                      value={value.name}
                      onChange={() => {
                        console.log('change filter');
                      }}
                    />
                    <ListItemText primary={value.name} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default CatalogFilters;

// create mui accordion component
// https://mui.com/components/accordion/
