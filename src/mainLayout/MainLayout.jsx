import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import UseAuth from "../hooks/UseAuth";

const MainLayout = () => {
  
  const {loading} = UseAuth();
  
  return (
    <div className="w-full flex">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-72">
            <Sidebar />
          </div>
          <div className="flex-1 flex-col">
            <NavBar />
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default MainLayout;
