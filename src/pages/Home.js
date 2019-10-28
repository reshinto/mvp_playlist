import React from "react";
import {connect} from "react-redux";
import {getUser} from "../redux/actions/userAction";
import Navbar from "../components/Navbar";
import AddVideoForm from "../components/forms/AddVideoForm";

function Home(props) {
  props.getUser();
  return (
    <>
      <Navbar />
      <div style={{visibility: "hidden", position: "absolute", top: "0"}}>
        <AddVideoForm />
      </div>
    </>
  );
}

const mapDispatchToProps = {
  getUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(Home);
