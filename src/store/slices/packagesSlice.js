import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const fetchFeaturedPackages = createAsyncThunk(
  'packages/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/packages?isFeature=true&isActive=true&limit=8')
      return res.data.data || []
    } catch (err) {
      console.error('fetchFeaturedPackages error:', err.message)
      return rejectWithValue(err.message)
    }
  }
)

export const fetchDomesticPackages = createAsyncThunk(
  'packages/fetchDomestic',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/packages?type=domestic&isActive=true&limit=50')
      return res.data.data || []
    } catch (err) {
      console.error('fetchDomesticPackages error:', err.message)
      return rejectWithValue(err.message)
    }
  }
)

export const fetchInternationalPackages = createAsyncThunk(
  'packages/fetchInternational',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/packages?type=international&isActive=true&limit=50')
      return res.data.data || []
    } catch (err) {
      console.error('fetchInternationalPackages error:', err.message)
      return rejectWithValue(err.message)
    }
  }
)

export const fetchAllPackages = createAsyncThunk(
  'packages/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/packages?isActive=true&limit=50')
      return res.data.data || []
    } catch (err) {
      console.error('fetchAllPackages error:', err.message)
      return rejectWithValue(err.message)
    }
  }
)

const packagesSlice = createSlice({
  name: 'packages',
  initialState: {
    featured: [],
    domestic: [],
    international: [],
    all: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedPackages.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchFeaturedPackages.fulfilled, (state, action) => { state.loading = false; state.featured = action.payload })
      .addCase(fetchFeaturedPackages.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(fetchDomesticPackages.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchDomesticPackages.fulfilled, (state, action) => { state.loading = false; state.domestic = action.payload })
      .addCase(fetchDomesticPackages.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(fetchInternationalPackages.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchInternationalPackages.fulfilled, (state, action) => { state.loading = false; state.international = action.payload })
      .addCase(fetchInternationalPackages.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(fetchAllPackages.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchAllPackages.fulfilled, (state, action) => { state.loading = false; state.all = action.payload })
      .addCase(fetchAllPackages.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  },
})

export default packagesSlice.reducer
