import {createBrowserRouter,RouterProvider} from "react-router-dom"

import Signin from "./Signin";
import MainPage from "./MainPage";
import Feedback from "./Feedback";


const Body = ()=>{

    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Signin/>
        },
        {
            path:"/mainpage",
            element:<MainPage/>
        },
        {
            path:"/feedback",
            element:<Feedback/>
        }
    ])

    return(
    <div> 
        <RouterProvider router={appRouter}></RouterProvider>
    </div>
    ) 
};
export default Body;