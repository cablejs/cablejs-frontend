import { useEffect } from "react";
import { useParams, useHistory, withRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import axios from "axios";

function AppRenderer() {
    let { gid, id } = useParams();
    let history = useHistory();

    useEffect(() => {
        var b = document.cookie.match("(^|;)\\s*cableAuth\\s*=\\s*([^;]+)");

        if (b)
        {
            if (gid === "@me")
            {
                axios({
                    url: "https://api.cablejs.emeraldsys.xyz/v1/users/@me",
                    headers: {
                        Authorization: `Bearer ${b.pop()}`
                    }
                }).then(res => console.log(res.status)).catch(err => {
                    history.push("/login");
                });
            }
        }
        else
        {
            history.push("/login");
        }
    });

    return (
        <div className="sidebar-container">
            <Sidebar />
        </div>
    );
}

export default withRouter(AppRenderer);