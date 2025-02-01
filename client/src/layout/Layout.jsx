 
import Navbar from './../component/Navbar';


// eslint-disable-next-line react/prop-types
function Layout({ children }) {


  return (
    <div  className="min-h-screen max-w-full flex flex-col flex-wrap ">
   <Navbar/>
   {children}
   </div>
  );
}

export default Layout;
