import { gql } from '@apollo/client'

const GET_ALL_PRODUCTS = gql`
  query {
    getAllProducts {
      id
      name
      description
      price
      imageUrl
    }
  }
`

export default GET_ALL_PRODUCTS
