import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../Redux/Slices/Auth.slice";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  async function handleLogout(e) {
    e.preventDefault();
    const resp = await dispatch(logout());
    console.log(resp);

    if (resp.payload.success === true) {
      navigate("/auth");
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-80 text-white shadow-lg z-10">
      <div className="max-w-screen-lg  flex justify-between items-center py-4 px-6">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          CodeSync
        </h1>
        <ul className="flex space-x-6 ">
          <li>
            <Link
              to="hero"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-300  hover:text-white transition duration-300"
            >
              Home
            </Link>
          </li>
          <li
            className="cursor-pointer text-gray-300  hover:text-white transition duration-300"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </li>
          <li>
            <Link
              to="features"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-300  hover:text-white  transition duration-300"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              to="demo"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-300  hover:text-white  transition duration-300"
            >
              Live Demo
            </Link>
          </li>
          <li>
            <Link
              to="pricing"
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-300  hover:text-white  transition duration-300"
            >
              Pricing
            </Link>
          </li>
          <li className="cursor-pointer text-gray-300  hover:text-white  transition duration-300 border-l-[0.5px] border-gray-700 px-2">
            {isLoggedIn == true ? (
              <span onClick={handleLogout}>Logout</span>
            ) : (
              <span onClick={()=>navigate('/auth')}>Login</span>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
