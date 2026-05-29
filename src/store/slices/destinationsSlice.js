import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const fetchFeaturedDestinations = createAsyncThunk(
  'destinations/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/destinations?isFeature=true&limit=8')
      return res.data.data || []
    } catch (err) {
      console.error('fetchFeaturedDestinations error:', err.message)
      return rejectWithValue(err.message)
    }
  }
)

export const fetchAllDestinations = createAsyncThunk(
  'destinations/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/destinations?limit=50')
      return res.data.data || []
    } catch (err) {
      console.error('fetchAllDestinations error:', err.message)
      return rejectWithValue(err.message)
    }
  }
)

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState: {
    featured: [],
    all: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedDestinations.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchFeaturedDestinations.fulfilled, (state, action) => { state.loading = false; state.featured = action.payload })
      .addCase(fetchFeaturedDestinations.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(fetchAllDestinations.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchAllDestinations.fulfilled, (state, action) => { state.loading = false; state.all = action.payload })
      .addCase(fetchAllDestinations.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  },
})

export default destinationsSlice.reducer
