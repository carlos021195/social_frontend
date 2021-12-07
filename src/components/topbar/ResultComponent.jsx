import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./resultComponent.css"

export default function ResultComponent({ result }) {
    const { user } = useContext(AuthContext);

    const handleFollow = async () => {
        try {
            const res = await axios.put(
                "http://localhost:8800/api/users/" + result._id + "/follow",
                {
                    userId: user._id
                }
            );
            console.log(res)
        } catch (error) {
            
        }
    }

    const handleUnfollow = async () => {
        try {
            const res = await axios.put(
                "http://localhost:8800/api/users/" + result._id + "/unfollow",
                {
                    userId: user._id
                }
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
