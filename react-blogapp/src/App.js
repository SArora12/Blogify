import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './webPages/Home';
import Add from './webPages/Add';
import RootLayout from './webPages/RootLayout';
import BlogDetails from './webPages/BlogDetails';
import EditBlog from './webPages/EditBlog';

const router = createBrowserRouter([
  {
    path:'/',
    element: <RootLayout />,
    children: [

      {path:'/', element:<Home/>},
      {path:'/blog-details/:id', element:<BlogDetails/>},
      {path:'/addblog', element:<Add />},
      {path:'/edit-blog/:id', element:<EditBlog/>},

    ]
  }
]);
function App() {
  return (  
    <>
      <RouterProvider router={router} />
    </>  
         
  );
}

export default App;
