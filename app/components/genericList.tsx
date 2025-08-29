import { List, type ListProps } from "@mui/material";
import React from "react";

type GenericListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
} & ListProps;

export function GenericList<T>({
  items,
  renderItem,
  ...listProps
}: GenericListProps<T>) {
  return (
    <List {...listProps}>
      {items.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
      ))}
    </List>
  );
}
