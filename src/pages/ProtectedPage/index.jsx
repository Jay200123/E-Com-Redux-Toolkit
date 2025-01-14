import { useSelector } from "react-redux";


export default function(){

    const auth = useSelector((state) => state.auth);        

    return (
        <>
        this is protected routes
        </>
    )
}