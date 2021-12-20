import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./resultComponent.css"

export default function ResultComponent({ result }) {
    const { user, token } = useContext(AuthContext);
    const headers = { headers: {"authorization" : `Bearer ${token}`} }

    const handleFollow = async () => {
        try {
            const res = await axios.put(
                "https://comp586api.herokuapp.com/api/users/" + result._id + "/follow",
                {
                    userId: user._id
                },
                headers
            );
            console.log(res)
        } catch (error) {
            
        }
    }

    const handleUnfollow = async () => {
        try {
            const res = await axios.put(
                "https://comp586api.herokuapp.com/api/users/" + result._id + "/unfollow",
                {
                    userId: user._id
                },
                headers
            );
            console.log(res.status)
        } catch (error) {
            
        }
    }

    return (
        <div className='result-component'>
            <div>{result.username}</div>
            <div className="button-container">
                <button onClick={handleFollow}>Follow</button>
                <button onClick={handleUnfollow}>Unfollow</button>
            </div>
        </div>
    );
}
