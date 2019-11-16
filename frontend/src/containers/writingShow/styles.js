const styles = theme => ({
  "@global": {
    body: {
      //backgroundImage:
      //  "url(https://github.com/bounswe/bounswe2019group5/blob/frontend/Images/question%20arka%20plan.jpg?raw=true)"
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
