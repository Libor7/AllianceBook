"use client";

/** LIBRARIES */
import {
  Box,
  Drawer,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSearchParams, useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";

/** MISC */
import { searchOptions } from "@/lib/data/searchOptions";
import {
  FILTERS,
  SEARCH_PLACEHOLDER,
  VALID_GENDERS,
} from "@/lib/constants/common";

const drawerWidth = 240;

type SidebarProps = {
  maxHeight: number;
  minHeight: number;
  onClose: () => void;
  open: boolean;
};

const Sidebar = ({ maxHeight, minHeight, open, onClose }: SidebarProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, setSliderValue] = useState(minHeight || 0);

  const genderFilter =
    searchParams.get("gender")?.toLowerCase().split(",") || VALID_GENDERS;
  const searchBy = searchParams.get("searchBy") || "name";
  const heightCompare = searchParams.get("heightCompare") || "greater";

  const genderChangeHandler = (gender: string) => {
    const current = new Set(genderFilter);

    if (current.has(gender)) {
      if (current.size === 1) return;
      current.delete(gender);
    } else {
      current.add(gender);
    }

    const updated = Array.from(current);
    const params = new URLSearchParams(searchParams);

    if (updated.length === 2) {
      params.delete("gender");
    } else {
      params.set("gender", updated.join(","));
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const searchByChangeHandler = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("searchBy", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const heightChangeHandlerDebounced = useMemo(
    () =>
      debounce((value: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("height", value.toString());
        params.set("page", "1");
        router.push(`?${params.toString()}`);
      }, 300),
    [router, searchParams]
  );

  useEffect(() => {
    return () => heightChangeHandlerDebounced.cancel();
  }, [heightChangeHandlerDebounced]);

  const heightCompareChangeHandler = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("heightCompare", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const clearHeightFilter = () => {
    setSliderValue(minHeight);
    const params = new URLSearchParams(searchParams);
    params.delete("height");
    params.delete("heightCompare");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const isChecked = (gender: string) => genderFilter.includes(gender);
  const isDisabled = genderFilter.length === 1;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      sx={{
        flexShrink: 0,
        width: drawerWidth,

        [`& .MuiDrawer-paper`]: {
          width: "100vw",
          maxWidth: drawerWidth,
          boxSizing: "border-box",
          p: 2,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{FILTERS}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Gender
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked("male")}
                onChange={() => genderChangeHandler("male")}
                disabled={isDisabled && isChecked("male")}
              />
            }
            label="Male"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked("female")}
                onChange={() => genderChangeHandler("female")}
                disabled={isDisabled && isChecked("female")}
              />
            }
            label="Female"
          />
        </FormGroup>
        <Divider sx={{ my: 2 }} />
        <InputLabel id="search-by-label" sx={{ mt: 2 }}>
          {SEARCH_PLACEHOLDER}
        </InputLabel>
        <Select
          fullWidth
          value={searchBy}
          onChange={({ target }) => searchByChangeHandler(target.value)}
          size="small"
          sx={{ mt: 1 }}
        >
          {searchOptions.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
        <Divider sx={{ my: 2 }} />
        <FormLabel component="legend" sx={{ mt: 1 }}>
          Height
        </FormLabel>
        <RadioGroup
          row
          value={heightCompare}
          onChange={({ target }) => heightCompareChangeHandler(target.value)}
        >
          <FormControlLabel
            value="greater"
            control={<Radio size="small" />}
            label="Greater"
          />
          <FormControlLabel
            value="less"
            control={<Radio size="small" />}
            label="Less"
          />
        </RadioGroup>
        <Slider
          min={minHeight}
          max={maxHeight}
          onChange={(_e, newValue) => {
            setSliderValue(newValue as number);
            heightChangeHandlerDebounced(newValue as number);
          }}
          valueLabelDisplay="auto"
          sx={{ mt: 2 }}
        />
        <Button
          variant="outlined"
          fullWidth
          onClick={clearHeightFilter}
          sx={{ mt: 2 }}
        >
          Reset Height Filter
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
