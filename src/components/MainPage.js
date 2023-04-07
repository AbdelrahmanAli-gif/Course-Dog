import Login from "./Login";
import { useState } from "react";


function MainPage(){
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <>
            {
                loggedIn ? (
                            <h1>Homepage</h1>
                ) : (
                            <>
                                <Login />
                            </>
                )
            }
        </>
    )
}

export default MainPage;