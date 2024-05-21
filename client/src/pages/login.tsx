import { useState } from "react"
import { Link } from "react-router-dom"
import { authorizeUser } from "../../utils/authFunctions"
import { useLocation } from "react-router-dom"

const Login = () => {
  const [enteredUsername,setEnteredUsername] = useState("")
  const [enteredPassword,setEnteredPassword] = useState("")
  const [signinMessage, setSigninMessage] = useState("");
  const location = useLocation();
  const {state} = location;
  const [registeredMessage,setRegisteredMessage] = useState(state?.message || "");
  // setRegisteredMessage(state?.message);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  dark:bg-gray-900">
        {registeredMessage &&
          <div className={` opacity-90 bg-red-400 w-1/2 absolute top-12 right-3 flex flex-row text-center justify-evenly rounded-md place-items-center tracking-wide md:w-1/4`}>
            {registeredMessage}
            <svg onClick={() => setRegisteredMessage('')} className="p-1 hover:scale-125 mr-1" xmlns="http://www.w3.org/2000/svg"  
              viewBox="0 0 50 50" 
              width="30px"
              height="30px">
              <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/>
            </svg> 
          </div>
        }
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={e => e.preventDefault()} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required autoFocus
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={e => setEnteredUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required autoFocus
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={e => setEnteredPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                onClick={async () => {
                  const message = await authorizeUser(enteredUsername,enteredPassword);
                  if(message){
                    setSigninMessage(message);
                  }
                }}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <span className="text-red-400 pt-5"> {signinMessage} </span>
            </div>
            
            {/* Register Propmpt  */}
            {/* <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="absolute px-3 text-gray-900 -translate-x-1/2 left-1/2 border-2 rounded-lg border-black  dark:text-white dark:border-white">OR</span>
            </div> */}
            <span className=" text-center block text-sm font-medium leading-6 text-gray-900 dark:text-white p-3"> Not registered yet? <Link to="/register"> Sign Up </Link></span>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
