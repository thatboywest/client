import { MdPending } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { TfiAgenda } from "react-icons/tfi";
import './Driver.css'


function Driver(params) {
    return (
        <>
            <div className="driver-page">
                <h1>Welcome back</h1>
                <div className="dash">
                    <div className="dash">
                        <div className="card orders">
                            <p><TfiAgenda /> Orders Assigned</p>
                            <p className="info"></p>
                        </div>

                        <div className="card completed">
                            <p><IoCheckmarkDoneSharp /> Completed</p>
                            <p className="info"></p>
                        </div>

                        <div className="card pending">
                            <p><MdPending /> Pending</p>
                            <p className="info"></p>
                        </div>
                    </div>
                </div>
                </div>
            </>
            )
}
            export default Driver