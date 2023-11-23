import { createSlice } from "@reduxjs/toolkit";

const loadBlogsFromLocalStorage = () => {
  try {
    const serializedBlogs = localStorage.getItem("blogs");
    if (serializedBlogs === null) {
      return [];
    }
    return JSON.parse(serializedBlogs);
  } catch (err) {
    return [];
  }
};

const initialState = {
  blogs: loadBlogsFromLocalStorage(),
};

const saveBlogsToLocalStorage = (blogs) => {
  try {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  } catch (err) {
    console.error("Error saving blogs to local storage:", err);
  }
};

const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
      saveBlogsToLocalStorage(state.blogs);
    },
    updateBlog: (state, action) => {
      const { id, title, category, description } = action.payload;
      const blogIndex = state.blogs.findIndex((blog) => blog.id === id);
      
  if (blogIndex !== -1) {
    // Check if the blog object exists before updating its properties
    if (title !== undefined) {
      state.blogs[blogIndex].title = title;
    }
    if (category !== undefined) {
      state.blogs[blogIndex].category = category;
    }
    if (description !== undefined) {
      state.blogs[blogIndex].description = description;
    }
    
    saveBlogsToLocalStorage(state.blogs);
  }
    },
    deleteBlog: (state, action) => {
      const id = action.payload;
      state.blogs = state.blogs.filter((blog) => blog.id !== id);
      saveBlogsToLocalStorage(state.blogs);
    },
    toggleLike: (state, action) => {
      const id = action.payload;
      const blogIndex = state.blogs.findIndex((blog) => blog.id === id);
      if (blogIndex !== -1) {
        state.blogs[blogIndex].isLiked = !state.blogs[blogIndex].isLiked;
        saveBlogsToLocalStorage(state.blogs);
      }
    },
  },
});

export const selectBlogById = (state, blogID) => {
  return state.blogs.blogs.find((blog) => blog.id === blogID);
};

export const { addBlog, updateBlog, deleteBlog, toggleLike } = blogSlice.actions;
export default blogSlice.reducer;
