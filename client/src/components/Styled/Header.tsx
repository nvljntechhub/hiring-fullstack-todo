import { Box, styled } from '@mui/material';

export const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 10;
        background-color: ${theme.colors.alpha.trueWhite[100]};
        backdrop-filter: 0;
        position: fixed;
        justify-content: space-between;
        width: 100%;
        display: flex;
        align-items: center;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);

`
);

export const Logo = styled('img')(({ theme }) => ({
  alt: 'Logo Image',
  cursor: 'pointer',
  [theme.breakpoints.up('xs')]: {
    width: '80px',
    height: 'auto'
  },
  [theme.breakpoints.up('md')]: {
    width: '40px',
    height: 'auto'
  }
}));
