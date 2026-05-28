import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const fetchRecentBlogs = createAsyncThunk(
  'blogs/fetchRecent',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/blogs?status=published&limit=4')
      return res.data.data
    } catch {
      return rejectWithValue('Failed to load blogs')
    }
  }
)

export const fetchAllBlogs = createAsyncThunk(
  'blogs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/blogs?status=published&limit=50')
      return res.data.data
    } catch {
      return rejectWithValue('Failed to load blogs')
    }
  }
)

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    recent: [],
    all: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentBlogs.pending, (state) => { state.loading = true })
      .addCase(fetchRecentBlogs.fulfilled, (state, action) => { state.loading = false; state.recent = action.payload })
      .addCase(fetchRecentBlogs.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(fetchAllBlogs.pending, (state) => { state.loading = true })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => { state.loading = false; state.all = action.payload })
      .addCase(fetchAllBlogs.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  },
})

export default blogsSlice.reducer
