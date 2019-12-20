import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Ratings({ userProfile }) {
  const classes = useStyles();
  if (userProfile.user_comments.length === 0) {
    return (
      <Typography variant="h6" gutterBottom>
        No one rated yet :(
      </Typography>
    )
  }
  return (
    <List className={classes.root}>
      {userProfile.user_comments && userProfile.user_comments.map((value, index) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={"https://ui-avatars.com/api/?rounded=true&name=" + value.username} fontSize="large"> </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<StarRatings rating={value.rate} numberOfStars={5} starRatedColor="orange" starDimension="15px" starSpacing="0" />}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      <Link to={{
                        pathname: "/profile/" + value.username
                      }}>

                      </Link>
                    </Typography>
                    {" " + value.comment}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        )
      })}
    </List>
  );
}

