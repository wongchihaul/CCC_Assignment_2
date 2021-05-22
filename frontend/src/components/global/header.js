import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
// import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "rgba(44,18,87,1)",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
    textAlign: "start",
  },
  link: {
    color: "white",
    margin: theme.spacing(1, 1.5),
  },
}));

function Header() {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Team 10
        </Typography>
        <nav>
          <Link
            variant="button"
            href="/"
            className={classes.link}
          >
            Home
          </Link>
          <Link
            variant="button"
            href="/map"
            className={classes.link}
          >
            Map
          </Link>
          <Link
            variant="button"
            href="/statistics"
            className={classes.link}
          >
            Statistics
          </Link>
          <Link
            variant="button"
            href="monitoring"
            className={classes.link}
          >
            Server Monitoring
          </Link>
          {/* <Button color="inherit">Login</Button> */}
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
