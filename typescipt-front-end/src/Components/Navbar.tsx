import "../Styles/navbar.css";
import { logout, GetUserDetails } from "../Redux/AuthReducer/action";
import { getProducts } from "../Redux/ProductReducer/action";
import { GetCartItems } from "../Redux/CartReducer/action";

import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  X,
  ShoppingCart,
  UserRound,
  Search,
  Home,
  CalendarCheck,
  User,
  PanelBottomClose,
} from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isNavOpen, setIsNavOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [token, setToken] = useState("");
  const toggleNavbar = useSelector(
    (store: any) => store.AuthReducer.toggleNavbar
  );

  const toggleCart = useSelector((store: any) => store.CartReducer.toggleCart);
  const [cartItemsLength, setCartItemsLength] = useState(0);

  useEffect(() => {
    const cartLength = GetCartItems(dispatch).length;
    setCartItemsLength(cartLength);
  }, [toggleCart]);

  useEffect(() => {
    setToken(GetUserDetails()?.token);
  }, [toggleNavbar]);

  let paramObj = {
    params: {
      category: searchTerm,
    },
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    logout(dispatch);
  };

  function handleSearch(e: any) {
    setSearchTerm(e.target.value);
  }

  function handleRelocate() {
    navigate("/all-products", {
      state: { redirectTo: location.pathname },
      replace: true,
    });
  }

  useEffect(() => {
    getProducts(dispatch, paramObj);
  }, [searchTerm]);

  const activeStyle = {
    color: "#ff6347",
  };

  return (
    <div className={`navbar ${isNavOpen ? "" : "open"}`}>
      <Link to="/" replace state={{ redirectTo: location.pathname }}>
        <div className="logo">
          <img
            src="https://i.mscwlns.co/media/misc/others/mm%20logo%20gif%202%20%281%29_2cf9r9.gif?tr=w-400"
            alt="logo"
            width="100%"
            height="100%"
          />
        </div>
      </Link>

      <div id="search">
        <span>
          <Search color="#22548A" />
        </span>
        <form>
          <input
            type="text"
            placeholder="search"
            value={searchTerm}
            onClick={handleRelocate}
            onChange={handleSearch}
          />
        </form>
      </div>

      <div className={`nav-links ${isNavOpen ? "" : "open"}`}>
        <NavLink
          to={"/all-products"}
          style={({ isActive }) => (isActive ? activeStyle : {})}
          replace
          state={{ redirectTo: location.pathname }}
        >
          <div
            className="nav-link"
            onClick={() => setIsNavOpen(true)}
            style={{ display: "flex", gap: "2px" }}
          >
            <Home size={22} strokeWidth={1.1} />
            <span className="nav-link" style={{ color: "" }}>
              All Products
            </span>
          </div>
        </NavLink>
        <NavLink
          to="/schedule-appoinment"
          style={({ isActive }) => (isActive ? activeStyle : {})}
          replace
          state={{ redirectTo: location.pathname }}
        >
          <div
            className="nav-link"
            onClick={() => setIsNavOpen(true)}
            style={{ display: "flex", gap: "2px" }}
          >
            <CalendarCheck size={22} strokeWidth={1.1} />
            <span>Schedule Appointment</span>
          </div>
        </NavLink>
        <NavLink
          to="/self-assessment"
          style={({ isActive }) => (isActive ? activeStyle : {})}
          replace
          state={{ redirectTo: location.pathname }}
        >
          <div
            className="nav-link"
            onClick={() => setIsNavOpen(true)}
            style={{ display: "flex", gap: "2px" }}
          >
            <PanelBottomClose size={22} strokeWidth={1.1} />
            <span>Self Assessment</span>
          </div>
        </NavLink>

        {token ? (
          <div className="user-profile">
            <span className="log-in">
              <UserRound color="#1f5c9d" size={22} />
              {`Hi! ${GetUserDetails()?.userName}`}
            </span>
            <div className="profile-dropdown">
              <NavLink
                to="/profile"
                style={({ isActive }) => (isActive ? activeStyle : {})}
              >
                <p>Profile</p>
              </NavLink>
              <p onClick={handleLogout}>Logout</p>
            </div>
          </div>
        ) : (
          <NavLink
            to="/login"
            style={({ isActive }) => (isActive ? activeStyle : {})}
            replace
            state={{ redirectTo: location.pathname }}
          >
            <div className="log-in" onClick={() => setIsNavOpen(true)}>
              <User /> Login
            </div>
          </NavLink>
        )}
      </div>

      <NavLink
        to="/checkout"
        style={({ isActive }) => (isActive ? activeStyle : {})}
        replace
        state={{ redirectTo: location.pathname }}
      >
        <div className="shoping-cart">
          <span className="item-count">{cartItemsLength}</span>
          <div className="icon-container">
            <ShoppingCart className="cart-icon" />
          </div>
        </div>
      </NavLink>
      <div className="burger-menu" onClick={toggleNav}>
        {isNavOpen ? <Menu /> : <X />}
      </div>
    </div>
  );
};

export default Navbar;
