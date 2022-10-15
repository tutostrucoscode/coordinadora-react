import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { margin } from '@mui/system';

export default function CircularIndeterminate() {
    return (
        <div style={{
            // do your styles depending on your needs.
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "100px"
        }}>
            <CircularProgress />
        </div >
    );
}