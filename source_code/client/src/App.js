import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { AdditionCalculator } from "./components/AdditionCalculator.component";
import { InventoryPage } from "./components/Inventory.components";
import { UserCard } from "./components/UserCard.component";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./Login";
import { Icon } from "@iconify/react";

const firebaseConfig = {
  apiKey: "AIzaSyB9cxbqdAAlgm9VpRowLMR1V90GymZQoZ4",
  authDomain: "csi518-access.firebaseapp.com",
  projectId: "csi518-access",
  storageBucket: "csi518-access.appspot.com",
  messagingSenderId: "463549916971",
  appId: "1:463549916971:web:2c962bd9bdcbf5ac8d476e",
  measurementId: "G-0SWCRHVFV3"
};
const app = initializeApp(firebaseConfig);

const Assign3 = () => {
  const auth = getAuth()
  return (
    <div>
      <button onClick={()=> signOut(auth)}>Sign Out</button>
    </div>
  )
}

const MainPage = () => {
  const [page,setPage] = useState("assign1")

  return (
    <div className="w-75 mx-auto mt-4">
      <ul className="nav nav-tabs nav-justified">
        <li className="nav-item">
          <p className={`nav-link ${page==="assign1"?"active":""}`} onClick={()=>setPage("assign1")}>Assignment 1</p>
        </li>
        <li className="nav-item">
          <p className={`nav-link ${page==="assign2"?"active":""}`} onClick={()=>setPage("assign2")}>Assignment 2</p>
        </li>
        <li className="nav-item">
          <p className={`nav-link ${page==="assign3"?"active":""}`} onClick={()=>setPage("assign3")}>Assignment 3</p>
        </li>
      </ul>
      {
        page==="assign1"?(
          <>
            <UserCard />
            <AdditionCalculator />
          </>
        ):(
          <>
            {
              page==="assign2"?(
                <InventoryPage />
              ):(
                <Assign3/>
              )
            }
          </>
        )
      }
    </div>
  )
}

/** Main App Component
 * @returns the rendered application
 */
const App = () => {
  const auth = getAuth(app);
  const [loggedIn,setLoggedIn] = useState(false)
  const [loading,setLoading] = useState(true)

  onAuthStateChanged(auth, user => {
    setLoading(true)
    if (user) {
      setLoggedIn(true)
      setLoading(false)
    } 
    else {
      setLoggedIn(false)
      setLoading(false)
    }
  })

  return (
    <>
      {
        loading?(
          <>
            <div className='w-full h-full absolute top-0 left-0 flex flex-col'>
              <Icon icon="line-md:loading-twotone-loop" className='mx-auto my-auto' width="100"/>
            </div>
          </>
        ):(
          <>
            {
              loggedIn?(
                <MainPage />
              ):(
                <Login />
              )
            }
          </>
        )
      }
    </>
  );
}
export default App;

