import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {db} from "../utils/firebase";
import {doc, addDoc, collection, updateDoc, deleteDoc, getDoc, getDocs} from "firebase/firestore";

const MainPage =()=>{
    const navigate = useNavigate()

    const[start, setStart] = useState('')
    const[destination, setDestination] = useState('')
    const[startdate, setStartDate]=useState('')
    const[returndate, setReturnDate] = useState('')
    const[activites, setActivities] = useState('')
    const[transportation,setTransportation]=useState('')
    const[fetchData, setFetchData] = useState([])
    const[id,setId]=useState()
    const dbref = collection(db, "CRUD");
    const feedback = () => {
        navigate('/feedback'); 
    };
    const add =async()=>{
        const adddata = await addDoc(dbref, 
            {StartFrom : start, 
                Destination : destination, 
                StartDate : startdate, 
                ReturnDate : returndate, 
                Activities : activites ,
                Transportation : transportation})
        if(adddata){
            alert("Data Added Successfully")
            window.location.reload()
        }
        else{
            alert("Error Occured To add the data")
        }
    }
    //fetchind the data from database
    const fetch =async()=>{
        const snapshot = await getDocs(dbref)
        const fetchdata = snapshot.docs.map((doc => ({id: doc.id, ...doc.data()})))
        setFetchData(fetchdata)
        console.log(fetchdata)
    }
    useEffect(()=>{
        fetch()
    },[])

    //pass update data to form
    const passData = async(id)=>{
        const matchId =fetchData.find((data)=>{
            return data.id === id
        })
        setStart(matchId.StartFrom)
        setDestination(matchId.Destination)
        setStartDate(matchId.StartDate)
        setReturnDate(matchId.ReturnDate)
        setActivities(matchId.Activities)
        setTransportation(matchId.Transportation)
        setId(matchId.id)
    }

    //update the data 
    const update = async()=>{
        const updateref = doc(dbref, id)
        try{
            const updatedata = await updateDoc(updateref,{StartFrom : start, 
                Destination : destination, 
                StartDate : startdate, 
                ReturnDate : returndate, 
                Activities : activites,
                Transportation : transportation })
            alert("update successfully")
            window.location.reload()
            
        }
        catch{
            alert("Update Error Occured")
        }
                
        
    }
    // delete the data 
    const del = async (id)=>{
        const delref = doc(dbref, id)
        try{
            await deleteDoc(delref)
            alert("deleted Successfully")
            window.location.reload()
        }
        catch(error){
            alert(error)
        }
    }

return(
<>
    <div className="fixed -z-10">
        <img className="h-screen w-screen object-cover" src="https://static.toiimg.com/photo/msid-96457229,width-96,height-65.cms" alt="bg-image"/>
    </div>
    <div className="bg-gray-700 w-3/12  mx-auto p-4 rounded-lg ">
    <h1 className="text-center text-white text-2xl font-bold mb-6">Make My Trip</h1>
    <div className="flex flex-col space-y-4">
    <div>
        <input
            className="border-b-2 border-transparent focus:border-white px-3 py-2 w-full bg-gray-800 text-white focus:outline-none"
            type="text"
            placeholder="Start From"
            autoComplete="off"
            value={start}
            onChange={(e) => setStart(e.target.value)}
        />
    </div>
    <div>
        <input
            className="border-b-2 border-transparent focus:border-white px-3 py-2 w-full bg-gray-800 text-white focus:outline-none"

            type="text"
            placeholder="Destination"
            autoComplete="off"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
        />
    </div>
    <div>
        <input
            className="border-b-2 border-transparent focus:border-white px-3 py-2 w-full bg-gray-800 text-white focus:outline-none"
            type="date"
            placeholder="Start Date"
            autoComplete="off"
            value={startdate}
            onChange={(e) => setStartDate(e.target.value)}
        />
    </div>
    <div>
        <input
            className="border-b-2 border-transparent focus:border-white px-3 py-2 w-full bg-gray-800 text-white focus:outline-none"
            type="date"
            placeholder="Return Date"
            autoComplete="off"
            value={returndate}
            onChange={(e) => setReturnDate(e.target.value)}
        />
    </div>
    <div>
                            
        <select
        className="border-b-2 border-transparent focus:border-white px-3 py-2 w-full bg-gray-800 text-white focus:outline-none"
        value={transportation}
        autoComplete="off"
        onChange={(e) => setTransportation(e.target.value)}
        >
        <option value="">Select Transportation</option>
        <option value="road">Road</option>
        <option value="train">Train</option>
        <option value="plane">Plane</option>
        <option value="cruise">Cruise</option>
        </select>
        </div>
    
    <div>
        <input
            className="border-b-2 border-transparent focus:border-white px-3 py-2 w-full bg-gray-800 text-white focus:outline-none"
            type="text"
            placeholder="Activities"
            autoComplete="off"
            value={activites}
            onChange={(e) => setActivities(e.target.value)}
        />
    </div>
    <div className="flex justify-center space-x-4">
        <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={add} >
                Add
            </button>
            <button
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={update}>
                Update
            </button>
        </div>
    </div>
</div>
        

<div className="m-12">
    <h2 className="text-2xl font-bold mb-4 text-white">Trip Details</h2>
    <div className=" grid grid-cols-3 gap-4">
        {fetchData.map((data) => (
            <div key={data.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-white text-lg font-semibold mb-2">Start From: {data.StartFrom}</h2>
                <h2 className="text-white text-lg font-semibold mb-2">Destination: {data.Destination}</h2>
                <h2 className="text-white text-lg font-semibold mb-2">Start Date: {data.StartDate}</h2>
                <h2 className="text-white text-lg font-semibold mb-2">Return Date: {data.ReturnDate}</h2>
                <h2 className="text-white text-lg font-semibold mb-2">Transportation: {data.Transportation}</h2>
                <h2 className="text-white text-lg font-semibold mb-2">Activities: {data.Activities}</h2>
                
                <div className="flex space-x-4">
                    <button
                        onClick={() => passData(data.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => del(data.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ))}
    </div>
</div>

<button onClick={feedback} className="text-white font-bold border bg-black text-lg px-6 py-4 flex justify-center mx-auto">
    Your feedback matters to us! Share your thoughts and help us improve.</button>
 </>
)
};
export default MainPage;