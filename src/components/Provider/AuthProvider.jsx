import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
// import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
// import { auth } from "../../../firebase.config";
// import axios from "axios";
// import instance from "../../utilis/instance";


// export const instance = axios.create({
//     withCredentials: true,
//     baseURL: "https://cuisine-quest-server.vercel.app"
// })
// instance.get('/todos')

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    // const [user, setUser] = useState(null)
    // const [loading, setLoading] = useState(true)
    // // const { data } = useFetchedData()
    // // console.log(data)

    // const googleProvider = new GoogleAuthProvider()
    // const githubProvider = new GithubAuthProvider()

    // const signUp = (email, password) => {
    //     setLoading(true)
    //     return createUserWithEmailAndPassword(auth, email, password)
    // }

    // const googleSignUp = () => {
    //     setLoading(true)
    //     return signInWithPopup(auth, googleProvider)
    // }
    // const githubSignIn = () => {
    //     setLoading(true)
    //     return signInWithPopup(auth, githubProvider)
    // }

    // const login = (email, password) => {
    //     setLoading(true)
    //     return signInWithEmailAndPassword(auth, email, password)
    // }

    // const logout = async () => {
    //     setLoading(true)
    //     return await signOut(auth).then(() => {
    //         instance.post("/logout").then(() => {
    //             setUser(null);
    //             setLoading(false);
    //         }).then(() => window.location.reload())
    //     });
    // }


    // const handleToken = async (user) => {
    //     setLoading(true);
    //     return await instance.post("/jwt", { email: user.email })
    //         .then(response => {
    //             console.log(response.data)
    //             setUser(user);
    //             setLoading(false);
    //         })
    //         .finally(() => setLoading(false))
    // }

    // useEffect(() => {
    //     const connection = onAuthStateChanged(auth, currentUser => {
    //         // console.log(currentUser);
    //         if (currentUser) {
    //             // Set the user only if a user is logged in
    //             // setUser(currentUser);
    //             handleToken(currentUser)
    //         } else {
    //             // Otherwise, set user to null
    //             setUser(null);
    //             setLoading(false)
    //         }
    //         // setLoading(false)
    //     })
    //     return () => connection();

    // }, [])


    const authinfo = {
        user,
        loading,
        signUp,
        login,
        googleSignUp,
        githubSignIn,
        logout,
        // data

    }
    return (

        <AuthContext.Provider value={authinfo} >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export default AuthProvider;