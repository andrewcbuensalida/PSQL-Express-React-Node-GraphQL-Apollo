import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
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
import Login from './Login'
import { Container } from '@mui/material/'
import Typography from '@mui/material/Typography'
import GET_ALL_USERS from './queries/getAllUsers'
import GET_ALL_PRODUCTS from './queries/getAllProducts'
import MenuTable from './MenuTable'

function App() {
  const { loading, error, data } = useQuery(GET_ALL_USERS)
  const {
    loading: loadingProducts,
    error: errorProducts,
    data: dataProducts,
  } = useQuery(GET_ALL_PRODUCTS)

  const [token, setToken] = useState(sessionStorage.getItem('token') || null)

  if (!token) return <Login token={token} setToken={setToken} />
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <Container>
      <Login token={token} setToken={setToken} />
      <Typography variant="h5" gutterBottom sx={{ m: 2 }}>
        List of Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              {/* Add any other headers for fields you fetched from the User type */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.getAllUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                {/* Render any other fields you fetched from the User type */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loadingProducts ? <p>Loading...</p> : <MenuTable data={dataProducts} />}
    </Container>
  )
}

export default App
