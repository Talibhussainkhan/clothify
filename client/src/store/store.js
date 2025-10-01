import { configureStore } from '@reduxjs/toolkit'
import  adminReducer  from './AuthSlice/adminAuth'

export const store = configureStore({
  reducer: {
    admin : adminReducer
  },
})
