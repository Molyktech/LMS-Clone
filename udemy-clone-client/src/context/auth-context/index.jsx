import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from '@/config'
import { registerService, loginService, checkAuthService } from '@/services'
import React, {createContext, useState} from 'react'

export const AuthContext = createContext(null)
export default function AuthProvider({children}) {
//   const [user, setUser] = useState(null)
const [signInFormData, setSignInFormData] = useState(initialSignInFormData)
const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)

async function handleRegisterUser(event) {
  event.preventDefault();
  const data = await registerService(signUpFormData);
  console.log(data, "datadatadatadatadata");
}

async function handleLoginUser(event) {
  event.preventDefault();
  const data = await loginService(signInFormData);
  console.log(data, "datadatadatadatadata");

  if (data.success) {
    sessionStorage.setItem(
      "accessToken",
      JSON.stringify(data.data.accessToken)
    );
    setAuth({
      authenticate: true,
      user: data.data.user,
    });
  } else {
    setAuth({
      authenticate: false,
      user: null,
    });
  }
}

//check auth user

async function checkAuthUser() {
  try {
    const data = await checkAuthService();
    if (data.success) {
      setAuth({
        authenticate: true,
        user: data.data.user,
      });
      setLoading(false);
    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    if (!error?.response?.data?.success) {
      setAuth({
        authenticate: false,
        user: null,
      });
      setLoading(false);
    }
  }
}

function resetCredentials() {
  setAuth({
    authenticate: false,
    user: null,
  });
}

// useEffect(() => {
//   checkAuthUser();
// }, []);

// console.log(auth, "gf");

  return (
   
    <AuthContext.Provider value={{signInFormData, setSignInFormData, signUpFormData, setSignUpFormData, handleRegisterUser}}>
      {children}
    </AuthContext.Provider>
  )
}