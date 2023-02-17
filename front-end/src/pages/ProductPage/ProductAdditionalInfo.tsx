
// create component ProductAdditionalInfo
// use ProductDetails as props type
// use material ui tabs
// display the description in the first tab
// display the additional info in the second tab

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { ProductDetails } from "../../types/product-details";

const ProductAdditionalInfo = ({ description, deliveryTime }: ProductDetails) => {
  const [value, setValue] = useState('1');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Description" value="1" />
            <Tab label="Delivery" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {description}
        </TabPanel>
        <TabPanel value="2">
          {deliveryTime.toString()}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ProductAdditionalInfo;

