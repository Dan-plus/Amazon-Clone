import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import LowerHeader from "./LowerHeader";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

const Header = () => {
  const [{ user, cart }, dispatch] = useContext(DataContext);
  const totalItem = cart.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  // console.log(cart.length);

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          {/* {logo} */}
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon log"
              />
            </Link>
            {/* {delivery} */}
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Deliver to</p>
                <span>USA</span>
              </div>
            </div>
          </div>

          {/* {search} */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="" />
            <BsSearch size={38} />
          </div>
          {/* right side link */}
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            <Link to={!user && "/Auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]} </p>
                    <span onClick={() => (user ? auth.signOut() : null)}>
                      Sign Out
                    </span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign in</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            {/* orders */}
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
