import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Payment from "./components/Payment";
import Error from "./components/Error";
import Paymentsuccess from "./components/Paymentsuccess";
import Update from "./components/Update";
import About from "./components/About";
import Eula from "./components/Eula";
import Privacy from "./components/Privacy";
import TermsAndConditions from "./components/Terms";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Auth from "./components/Auth";
import { ToastContainer,Bounce } from 'react-toastify';
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <>
  <Auth>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={Home}></Route>
        <Route exact path="/login" Component={Login}></Route>
        <Route exact path="/logout" Component={Logout}></Route>
        <Route exact path="/signup" Component={Register}></Route>
        <Route exact path="/pricing" Component={Pricing}></Route>
        <Route exact path="/contact" Component={Contact}></Route>
        <Route exact path="/payment" Component={Payment}></Route>
        <Route exact path="/paymentsuccess" Component={Paymentsuccess}></Route>
        <Route exact path="/about" Component={About}></Route>
        <Route exact path="/update" Component={Update}></Route>
        <Route exact path="/license" Component={Eula}></Route>
        <Route exact path="/privacy" Component={Privacy}></Route>
        <Route exact path="/forgot-password" Component={ForgotPassword}></Route>
        <Route exact path="/reset-password/:resetLink" Component={ResetPassword}></Route>
        <Route
          exact
          path="/terms-condition"
          Component={TermsAndConditions}
        ></Route>
        <Route path="*" Component={Error}></Route>
      </Routes>
      
        {/* react toastify message */}
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        />


      <Footer />
    </BrowserRouter>
  </Auth>
  </>
);
