import { useEffect, useState } from "react";
import { useParams, useHistory, withRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import axios from "axios";

function AppRenderer() {
    let { gid } = useParams();
    let history = useHistory();

    let [guilds, setGuilds] = useState({});

    useEffect(() => {
        var b = document.cookie.match("(^|;)\\s*cableAuth\\s*=\\s*([^;]+)");

        if (b)
        {
            axios({
                url: "https://api.cablejs.emeraldsys.xyz/v1/users/@me/guilds",
                headers: {
                    Authorization: `Bearer ${b.pop()}`
                }
            }).then(res => {
                res.data.forEach(guild => {
                    var guildElement = document.createElement("div");
                    guildElement.className = "sidebarItem guild-9a7A4c";
                    document.querySelector(".guilds-8f20ea").appendChild(guildElement);

                    var guildElementClick = document.createElement("a");
                    guildElementClick.className = "sidebarItem";
                    guildElementClick.href = `https://${window.location.hostname}/channels/${guild.gid}`;
                    guildElement.appendChild(guildElementClick);

                    var guildElementImg = document.createElement("img");
                    guildElementImg.className = "guildIcon";
                    guildElementImg.src = `https://cdn2.emeraldsys.xyz/cablejs/guilds/${guild.gid}/icons/${guild.iconHash}.png`;
                    guildElementClick.appendChild(guildElementImg);
                });
            }).catch(err => {
                history.push("/login");
            });
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