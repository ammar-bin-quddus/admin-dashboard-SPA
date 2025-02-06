import React, { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'

const UseAuth = () => {
  return useContext(AuthContext);
}

export default UseAuth