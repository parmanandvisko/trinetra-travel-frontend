import { configureStore } from '@reduxjs/toolkit'
import destinationsReducer from './slices/destinationsSlice'
import packagesReducer from './slices/packagesSlice'
import blogsReducer from './slices/blogsSlice'
import themeReducer from './slices/themeSlice'
import settingsReducer from './slices/settingsSlice'

export const store = configureStore({
  reducer: {
    destinations: destinationsReducer,
    packages: packagesReducer,
    blogs: blogsReducer,
    theme: themeReducer,
    settings: settingsReducer,
  },
})
