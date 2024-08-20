import * as React from 'react';
import Box from '@mui/material/Box';


interface LayoutProps {
  children: React.ReactNode;
  progress: number;
}

export default function Layout({ children, progress }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
      }}
    >

      <main>{children}</main>
    </Box>
  );
}

