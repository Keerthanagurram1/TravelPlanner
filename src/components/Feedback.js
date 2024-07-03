import { useNavigate } from "react-router-dom";

const Feedback =()=>{
    const navigate = useNavigate()
    const signOutButton = ()=>{
        navigate("/")
    }
    const homePage =()=>{
        navigate("/mainpage")
    }
    return(
        <>
        <div className="fixed -z-10">
        <img className="h-screen w-screen object-cover" src="https://static.toiimg.com/photo/msid-96457229,width-96,height-65.cms" alt="bg-image"/>
        </div>
        <div className="flex justify-end p-4">
        <button onClick={homePage} className="bg-blue-700 text-white px-4 py-2 rounded-lg mr-2">Home Page</button>
        <button onClick={signOutButton} className="bg-red-600 text-white px-4 py-2 rounded-lg">Sign Out</button>
        
        
        </div>

        <div className="flex justify-center items-center ">
            
        <form className="bg-gray-700 w-full md:w-6/12 mx-auto p-4 rounded-lg">
        <h1 className="text-white text-2xl p-3 font-bold">Please Provide Your Valuable Feedback</h1>
                <input className="w-full bg-gray-700 border mb-3 py-2 px-3 text-white " type="text"  placeholder="  Share Your Travel experience"/>
                 <input  className ="bg-gray-700 w-full border mb-3 py-2 px-3 text-white"type="text" placeholder="  Any Suggestions" />
                 <div>
                     <button className="bg-blue-700 text-white mr-5 px-4 py-2 my-5 rounded-lg">Submit</button>
                     <button className="bg-red-600 text-white px-4 py-2 rounded-lg my-5 ">Cancel</button>
                 </div>

         </form>
         </div> 
       
        </>
   
)};
export default Feedback;
