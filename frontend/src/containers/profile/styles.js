const styles = theme => ({
    root: {
        height: '100vh',
        backgroundImage: 'url(https://github.com/bounswe/bounswe2019group5/blob/frontend/Images/coldots.png?raw=true)',
    },
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(2, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.dark,
    }
});
  
export default styles;