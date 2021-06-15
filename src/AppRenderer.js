import { useParams } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function AppRenderer() {
    let { gid, id } = useParams();

    return (
        <div className="sidebar-container">
            <Sidebar />
        </div>
    );
}