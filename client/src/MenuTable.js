import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
} from '@mui/material/'
import Typography from '@mui/material/Typography'

function MenuTable({ data }) {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ m: 2 }}>
        List of Menu Items
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              {/* Add any other headers for fields you fetched from the User type */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getAllProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default MenuTable
