import { Circle, Delete, NoteAdd } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';

const ActionMenu: FC<{
  anchorEl: null | HTMLElement;
  status: boolean;
  isActionMenuOpen: boolean;
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>;
  onUpdateClick: () => void;
  onDeleteClick: () => void;
}> = ({
  anchorEl,
  status,
  isActionMenuOpen,
  setAnchorEl,
  onUpdateClick,
  onDeleteClick
}) => {
  const onMenuClose = () => setAnchorEl(null);
  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={isActionMenuOpen}
      onClose={onMenuClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
    >
      <MenuItem onClick={() => onUpdateClick()}>
        <ListItemIcon>
          <NoteAdd fontSize="small" color="info" />
        </ListItemIcon>
        Update
      </MenuItem>
      <MenuItem onClick={() => onDeleteClick()}>
        <ListItemIcon>
          <Delete fontSize="small" color="error" />
        </ListItemIcon>
        Delete
      </MenuItem>
    </Menu>
  );
};

export default ActionMenu;
