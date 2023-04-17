import { Icon } from "@iconify/react";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

const loginWithUsername = async (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
    })
    .catch((error) => {
        console.log(error)
    });
}

const signUpWithUsername = (email,password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
    })
    .catch((error) => {
        console.log(error)
    });
}





const SignUp = ({setToggle}) => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    return (
        <div className="w-50 mx-auto my-auto border bg-white rounded position-relative">
            <p className="w-full text-center mx-auto h3">Sign Up</p>

            <div className="p-8">
                <div className="mx-auto">
                    <div className="">
                        <p className="font-lato ">Username</p>
                        <div className="flex border-b p-2">
                            <Icon icon="mdi:user-outline" className="my-auto text-gray-400" width='20'/>
                            <input type="text" className="outline-0 pl-2" placeholder="Type your username" value={username} onChange={((e)=>setUsername(e.target.value))}/>
                        </div>
                    </div>
                    <br/>
                    <div className="">
                        <p className="font-lato ">Password</p>
                        <div className="flex border-b p-2">
                            <Icon icon="mdi:lock" className="my-auto text-gray-400" width='20'/>
                            <input type="password" className="outline-0 pl-2" placeholder="Type your password" value={password} onChange={((e)=>setPassword(e.target.value))}/>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <button onClick={()=> signUpWithUsername(username,password)} className="rounded w-50 mx-auto d-block py-2 border-0">sign up</button>
                    <br/>

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <p className="text-center text-gray-600">already have an account?</p>
                    <p className="text-center text-blue-500 underline cursor-pointer" onClick={()=>setToggle(true)}>log into your account</p>

                </div>
            </div>
        </div>
    )
}

const SignIn = ({setToggle}) => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    return (
        <div className="w-50 mx-auto my-auto border bg-white rounded position-relative">
            <p className="w-full text-center mx-auto h3">Login</p>

            <div className="p-8">
                <div className="mx-aut">
                    <div className="px-4">
                        <p className="">Username</p>
                        <div className="d-flex border-b p-2">
                            <Icon icon="mdi:user-outline" className="my-auto" width='20'/>
                            <input type="text" className="outline-0 pl-2" placeholder="Type your username" value={username} onChange={((e)=>setUsername(e.target.value))}/>
                        </div>
                    </div>
                    <br/>
                    <div className="px-4">
                        <p className="">Password</p>
                        <div className="d-flex border-b p-2">
                            <Icon icon="mdi:lock" className="my-auto" width='20'/>
                            <input type="password" className="outline-0 pl-2" placeholder="Type your password" value={password} onChange={((e)=>setPassword(e.target.value))}/>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <button onClick={()=> loginWithUsername(username,password)} className="rounded w-50 mx-auto d-block py-2 border-0">login</button>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <p className="text-center text-gray-600">don't have an account?</p>
                    <p className="text-center text-blue-500 underline cursor-pointer" onClick={()=>setToggle(false)}>create an account</p>
                </div>
            </div>
        </div>
    )
}

/** File Direrctory Page
 * 
 * @returns the rendered file directory page
 */
const Login = () => {
    const [login,setLogin] = useState(true)

    return (
        <div className="d-flex flex-column w-100 h-100 position-absolute top-0 left-0">
            {
                login?(
                    <SignIn setToggle={setLogin}/>
                ):(
                    <SignUp setToggle={setLogin}/>
                )
            }
        </div>
    )
}

export default Login;