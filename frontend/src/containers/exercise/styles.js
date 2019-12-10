import orange from '@material-ui/core/colors/orange';
const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: orange[400],
        },
    },
        root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(2, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

export default styles;