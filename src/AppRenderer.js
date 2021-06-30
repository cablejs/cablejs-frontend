import { useEffect } from "react";
import { useParams, useHistory, withRouter } from "react-router-dom";

import Cookies from "universal-cookie";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

function AppRenderer() {
    let { gid, cid } = useParams();
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
                    guildElementImg.src = `https://static.emeraldsys.xyz/cablejs/guilds/${guild.gid}/icons/${guild.iconHash}.png`;
                    guildElementClick.appendChild(guildElementImg);
                });
                if (gid === "@me")
                {
                    var contentIntroText = document.createElement("span");
                    contentIntroText.className = "contentIntroText";
                    contentIntroText.style.fontWeight = "bold";
                    contentIntroText.style.fontSize = "20px";
                    contentIntroText.innerText = "Welcome to CableJS, still in early development.";

                    document.querySelector(".contentMain").appendChild(contentIntroText);
                }
                else
                {
                    if (cid === undefined)
                    {
                        axios({
                            url: `https://api.cablejs.emeraldsys.xyz/v1/guilds/${gid}/channels`,
                            headers: {
                                Authorization: `Bearer ${cookie}`
                            }
                        }).then(res2 => {
                            var defaultChannel = res2.data.find(guildChannel => guildChannel.default === true);
                            if (!defaultChannel) history.push("/channels/@me");

                            history.push(`/channels/${gid}/${defaultChannel.id}`);
                        }).catch(err2 => {
                            cookies.remove("cableAuth");
                            if (err2.response) alert(`An error occurred while fetching some info - API responded with status ${err2.response.status}.`);
                            history.push("/login");
                        });
                    }
                    else
                    {
                        axios({
                            url: `https://api.cablejs.emeraldsys.xyz/v1/guilds/${gid}`,
                            headers: {
                                Authorization: `Bearer ${cookie}`
                            }
                        }).then(res2 => {
                            axios({
                                url: `https://api.cablejs.emeraldsys.xyz/v1/guilds/${gid}/channels`,
                                headers: {
                                    Authorization: `Bearer ${cookie}`
                                }
                            }).then(res3 => {
                                // var requestedChannel = res3.data.find(guildChannel => guildChannel.id === parseInt(cid));
                                // if (!requestedChannel) history.push("/channels/@me");

                                
                                var container = document.querySelector(".contentContainer-3ef014");
                                if (!container) history.push("/channels/@me");

                                var contentSidebar = document.createElement("div");
                                contentSidebar.className = "contentSidebar";

                                container.appendChild(contentSidebar);
    
                                var contentSidebarChannels = document.createElement("nav");
                                contentSidebarChannels.className = "contentSidebarChannels";

                                contentSidebar.appendChild(contentSidebarChannels);
    
                                var contentSidebarTop = document.createElement("div");
                                contentSidebarTop.className = "contentSidebarTop";

                                contentSidebarChannels.appendChild(contentSidebarTop);
    
                                var contentSidebarTopGName = document.createElement("span");
                                contentSidebarTopGName.style.fontSize = "14px";
                                contentSidebarTopGName.style.fontWeight = "bold";
                                contentSidebarTopGName.innerText = res2.data.name;

                                contentSidebarTop.appendChild(contentSidebarTopGName);

                                var contentSidebarSpacing = document.createElement("div");
                                contentSidebarSpacing.style.height = "16px";

                                contentSidebarChannels.appendChild(contentSidebarSpacing);

                                res3.data.forEach(guildChannel => {
                                    var contentSidebarChannel = document.createElement("div");

                                    if (guildChannel.id === parseInt(cid))
                                    {
                                        contentSidebarChannel.className = "contentSidebarChannel selected";
                                    }
                                    else
                                    {
                                        contentSidebarChannel.className = "contentSidebarChannel";
                                    }

                                    contentSidebarChannels.appendChild(contentSidebarChannel);

                                    var contentSidebarCName = document.createElement("div");
                                    contentSidebarCName.className = "contentSidebarCName";
                                    contentSidebarCName.innerText = `#${guildChannel.name}`;

                                    contentSidebarChannel.appendChild(contentSidebarCName);
                                });
                            }).catch(err3 => {
                                cookies.remove("cableAuth");
                                if (err3.response) alert(`An error occurred while fetching some info - API responded with status ${err3.response.status}.`);
                                history.push("/login");
                            });
                        }).catch(err2 => {
                            cookies.remove("cableAuth");
                            if (err2.response) alert(`An error occurred while fetching some info - API responded with status ${err2.response.status}.`);
                            history.push("/login");
                        })
                    }
                }
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
            <script src="https://cdn.socket.io/4.0.1/socket.io.js"></script>
        </div>
    );
}

export default withRouter(AppRenderer);