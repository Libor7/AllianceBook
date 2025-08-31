/** LIBRARIES */
import { List, type ListProps } from "@mui/material";
import React from "react";

type GenericListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
} & ListProps;

const GenericList = <T,>({
  items,
  renderItem,
  ...listProps
}: GenericListProps<T>) => (
  <List
    sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    {...listProps}
  >
    {items.map((item, index) => (
      <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
    ))}
  </List>
);

export default GenericList;
