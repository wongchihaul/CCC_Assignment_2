import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import "./home.css";

const useStyles = makeStyles((theme) => ({
  home: {
    background: "linear-gradient(#2b1055,#7597de)",
  },
  memberName: {
    color: "#fff",
  },
  memberContainer:{
    zIndex: 20,
  }
}));
function Home() {
  const classes = useStyles();
  const [displayMembers, setDisplayMembers] = useState(false);
  return (
    <div className={classes.home}>
      <section>
        <img src="./images/stars.png" alt="" id="stars"></img>
        <img src="./images/moon.png" alt="" id="moon"></img>
        <img
          src="./images/mountains_behind.png"
          alt=""
          id="mountain_behind"
        ></img>
        <div id="text">Moon Light</div>

        <div className={classes.memberContainer}>
          <a href="#" id="btn" onClick={() => setDisplayMembers(true)}>
            TEAM MEMBERS
          </a>
          {displayMembers && (
            <div className={classes.memberName}>
              <p>Bingrui He</p>
              <p>Danyang Li</p>
              <p>Hao Huang</p>
              <p>Zhihao Huang</p>
              <p>Zhiyao Li</p>
            </div>
          )}
        </div>

        <img
          src="./images/mountains_front.png"
          alt=""
          id="mountain_front"
        ></img>
      </section>
    </div>
  );
}

export default Home;
