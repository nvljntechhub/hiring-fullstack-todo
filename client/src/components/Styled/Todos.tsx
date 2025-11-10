import { AddCircleTwoTone, Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Switch,
  SwitchProps,
  TextField
} from '@mui/material';
import React, { useState } from 'react';
import { DoneFilter } from 'src/enum';
import { PureLightTheme } from 'src/theme/schemes/PureLightTheme';

export const TodosContainer = styled(Container)(({ theme }) => ({
  marginTop: 200
}));

export const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#65C466',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45'
        })
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600]
      })
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3
      })
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D'
    })
  }
}));

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontFamily: 'Poppins',
    color: '#555555',
    fontWeight: 400,
    fontSize: '14px'
  }
}));

export const SubmitButton = () => (
  <Button
    type="submit"
    variant="contained"
    sx={{ color: PureLightTheme.colors.alpha.white[100] }}
  >
    Submit
  </Button>
);

export const StyledAddButton = (props: {
  label: string;
  onClick: () => void;
}) => (
  <Button
    variant="contained"
    sx={{ color: PureLightTheme.colors.alpha.white[100] }}
    startIcon={<AddCircleTwoTone />}
    onClick={props.onClick}
    fullWidth
  >
    {props.label}
  </Button>
);

export const StyledSearchField = (props: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <TextField
    fullWidth
    placeholder="Search Todos"
    value={props.value}
    onChange={props.onChange}
    slotProps={{
      input: {
        style: { background: '#ffffff' },
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        )
      }
    }}
  />
);

export const StyledStatusFilter = (props: {
  option: DoneFilter | null;
  handleChange: (event: SelectChangeEvent) => void;
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Status</InputLabel>
      <Select
        value={props.option === null ? '' : String(props.option)}
        label="Done Status"
        onChange={props.handleChange}
        sx={{ background: '#fff' }}
      >
        <MenuItem value={DoneFilter.ALL}>All</MenuItem>
        <MenuItem value={DoneFilter.DONE}>Done</MenuItem>
        <MenuItem value={DoneFilter.UNDONE}>Undone</MenuItem>
      </Select>
    </FormControl>
  );
};
