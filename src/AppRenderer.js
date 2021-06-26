import { useEffect } from "react";
import { useParams, useHistory, withRouter } from "react-router-dom";

import Cookies from "universal-cookie";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

function AppRenderer() {
    let { gid } = useParams();
    let history = useHistory();

    let cookies = new Cookies();

    useEffect(() => {
        document.title = "CableJS";
        let cookie = cookies.get("cableAuth");

        if (cookie)
        {
            axios({
                url: "https://api.cablejs.emeraldsys.xyz/v1/users/@me/guilds",
                headers: {
                    Authorization: `Bearer ${cookie}`
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

                    if (gid === "@me")
                    {
                        var contentIntroText = document.createElement("span");
                        contentIntroText.className = "contentIntroText";
                        contentIntroText.style.fontWeight = "bold";
                        contentIntroText.style.fontSize = "20px";
                        contentIntroText.innerText = "Welcome to CableJS, still in early development.";

                        document.querySelector(".contentMain").appendChild(contentIntroText);
                    }
                });
            }).catch(err => {
                cookies.remove("cableAuth");
                if (err.response) alert(`An error occurred while fetching some info - API responded with status ${err.response.status}.`);
                history.push("/login");
            });
        }
        else
        {
            history.push("/login");
        }
    });

    return (
        <div className="baseContainer">
            <Sidebar />
            <Content />
        </div>
    );
}

export default withRouter(AppRenderer);