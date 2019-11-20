const styles = theme => ({
  "@global": {
    body: {
      backgroundImage:
        "url(https://assets.justinmind.com/wp-content/uploads/2019/04/wireframe-examples-web-and-mobile-header.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }
  },
  paper: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    background: theme.palette.common.white
  },
  form: {
    width: "85%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(1, 0, 1)
  }
});

export default styles;