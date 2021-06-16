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
            axios({
                url: `https://api.cablejs.emeraldsys.xyz/v1/channels/${id}`,
                headers: {
                    Authorization: `Bearer ${b.pop()}`
                }
            }).then(res => console.log(res.status)).catch(err => console.error(err))
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