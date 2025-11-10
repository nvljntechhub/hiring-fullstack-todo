import {
  CheckCircleTwoTone,
  CancelTwoTone,
  MoreHorizRounded,
  HighlightOff,
  ErrorOutlineOutlined,
  RadioButtonChecked,
  RadioButtonUnchecked
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  styled,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { ModalAction } from 'src/enum';
import { PureLightTheme } from 'src/theme/schemes/PureLightTheme';
import NothingToShowImage from 'src/assets/nothing-to-show.png';

export const TableContainerBox = (props: any) => (
  <Paper
    {...props}
    sx={{
      width: '100%',
      overflow: 'hidden',
      padding: 2,
      borderRadius: '8px',
      border: '1px solid #D9F1FF',
      boxShadow:
        '0px 9px 16px rgba(159, 162, 191, .1), 0px 2px 2px rgba(159, 162, 191, 0.1)'
    }}
  />
);

export const StyledTableContainer = (props) => {
  return (
    <TableContainer
      {...props}
      sx={{
        maxHeight: '400px'
      }}
    />
  );
};

export const StyledStatusChip = (props: {
  status: boolean;
  handleClick: () => void;
}) => (
  <Chip
    icon={props.status ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
    label={props.status ? 'Done' : 'Not Done'}
    color={props.status ? 'success' : 'primary'}
    variant="outlined"
    onClick={props.handleClick}
  />
);

export const MoreActionButton = (props) => (
  <IconButton {...props}>
    <MoreHorizRounded />
  </IconButton>
);

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  padding: 1,
  borderRadius: 1
};

export const ModalTitle = styled(Typography)(({ theme }) => ({
  color: '#0B2330',
  fontFamily: 'Poppins',
  fontWeight: 500,
  fontSize: '24px'
}));

export const LabelText = styled(InputLabel)(({ theme }) => ({
  color: '#555555',
  fontWeight: 400,
  fontSize: '14px',
  marginBottom: '5px'
}));

export const StyledErrorAlert = (props: { title: string }) => (
  <Alert variant="filled" severity="error">
    {props.title}
  </Alert>
);

export const StyledDeleteConfirmDialogBox = (props) => {
  const theme = useTheme();
  return (
    <Box
      {...props}
      sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        borderRadius: '16px',
        boxShadow: 24,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.up('xs')]: {
          minWidth: '90%'
        },
        [theme.breakpoints.up('md')]: {
          minWidth: '30%'
        },
        [theme.breakpoints.up('xl')]: {
          maxWidth: '20%'
        }
      }}
    ></Box>
  );
};

export const DeleteConfirmTitleGridItem = (props) => {
  return (
    <Grid>
      <Grid container>
        <Grid sx={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
          <ErrorOutlineOutlined sx={{ color: '#E74C3C', fontSize: '28px' }} />
          <Title1>{props.title}</Title1>
        </Grid>
        <Grid>
          <Divider sx={{ marginTop: '20px' }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export const MessageTextGridItem = (props) => {
  return (
    <Grid sx={{ padding: '0 14px 0 14px' }}>
      <Typography>{props.message}</Typography>
    </Grid>
  );
};

export const ConfirmationButton = (props) => {
  return (
    <Button
      {...props}
      type="button"
      variant="contained"
      sx={{
        borderRadius: '8px',
        backgroundColor: '#E74C3C',
        color: '#fff',
        height: '40px'
      }}
    />
  );
};

export const CancelButton = (props) => {
  return (
    <Button
      {...props}
      type="button"
      sx={{
        borderRadius: '8px',
        border: '1px solid #DFDFDF',
        backgroundColor: '1px solid #F1F7FF',
        color: '#75838A',
        height: '40px'
      }}
    >
      Cancel
    </Button>
  );
};

export const NothingToShowBoxTableRow = (props: { columnsCount: number }) => {
  const { columnsCount } = props;
  const theme = useTheme();
  return (
    <TableRow
      sx={{
        [theme.breakpoints.down('md')]: {
          display: 'none'
        }
      }}
    >
      <TableCell colSpan={columnsCount}>
        <Box
          {...props}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            textAlign: 'center'
          }}
        >
          <Grid container justifyContent="center" rowSpacing={4}>
            <Grid size={12}>
              <img
                src={NothingToShowImage}
                style={{
                  objectFit: 'cover',
                  width: '120px',
                  height: '120px',
                  objectPosition: 'center'
                }}
              />
            </Grid>
            <Grid size={12}>
              <InfoText>No Todos to show. Please add new todos.</InfoText>
            </Grid>
          </Grid>
        </Box>
      </TableCell>
    </TableRow>
  );
};

const Title1 = styled(Typography)(({ theme }) => ({
  color: '#343434',
  fontFamily: 'Poppins',
  fontWeight: 600,
  [theme.breakpoints.up('xs')]: {
    fontSize: '16px'
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '24px'
  }
}));

const InfoText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins',
  color: '#7E7E7E',
  fontWeight: 600,
  fontSize: '14px',
  textAlign: 'center'
}));
