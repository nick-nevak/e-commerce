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
    <>
      {props.filters.map((filter) => (
        <Accordion
          key={filter.id}
          expanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            children={<Typography>{filter.name}</Typography>}
          />
          <AccordionDetails
            children={
              <List>
                {filter.values.map((value) => (
                  <ListItem key={value.id}>
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
              </List>}
          />
        </Accordion>
      ))
      }
    </>
  );
};

export default CatalogFilters;

// create mui accordion component
// https://mui.com/components/accordion/
