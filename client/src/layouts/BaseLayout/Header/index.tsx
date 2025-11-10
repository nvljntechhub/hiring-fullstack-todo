import { FC } from 'react';
import { Box, Stack, Divider, IconButton, useTheme, Grid } from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import LogoIcon from 'src/assets/Logo.png';
import { HeaderWrapper, Logo } from 'src/components/Styled/Header';

interface Props {}

const Header: FC<Props> = (props: Props) => {
  const theme = useTheme();

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        backgroundColor: 'white',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.08)',
        backdropFilter: 0,
        zIndex: 10
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      >
        <Grid container alignItems="left">
          <Grid>
            <Logo src={LogoIcon} />
          </Grid>
        </Grid>
      </Stack>
      <Box display="flex" alignItems="center">
        {/* <HeaderUserbox /> */}
      </Box>
    </HeaderWrapper>
  );
};

export default Header;
