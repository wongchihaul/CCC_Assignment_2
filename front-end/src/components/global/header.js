import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
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
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
    textAlign: "start",
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function Header() {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      color="default"
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
            color="textPrimary"
            href="#"
            className={classes.link}
          >
            Home
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="#"
            className={classes.link}
          >
            Map
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="#"
            className={classes.link}
          >
            Statistics
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="#"
            className={classes.link}
          >
            Server Monitoring
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
