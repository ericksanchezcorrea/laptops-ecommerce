import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TableBasic = ({height, width, brand, hard_drive_capacity, processor, ram, resolution, type_of_hard_drive, wi_fi}) =>{ 

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300, maxWidth:1200}} align='center' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Especificaciones</TableCell>
            <TableCell align="center">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell align="center">height</TableCell>
                <TableCell align="center">{height}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center">width</TableCell>
                <TableCell align="center">{width}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center">brand</TableCell>
                <TableCell align="center">{brand}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center">hard drive capacity</TableCell>
                <TableCell align="center">{hard_drive_capacity}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center">processor</TableCell>
                <TableCell align="center">{processor}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center">ram</TableCell>
                <TableCell align="center">{ram}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center">resolution</TableCell>
                <TableCell align="center">{resolution}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center">type of hard drive</TableCell>
                <TableCell align="center">{type_of_hard_drive}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center">wi fi</TableCell>
                <TableCell align="center">{wi_fi}</TableCell>
            </TableRow>

         
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableBasic