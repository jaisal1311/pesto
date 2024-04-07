import { useAuth0 } from "@auth0/auth0-react";
import { Button, Grid, Typography } from "@mui/material";
import React from "react";

const UserCard = () => {
  const { logout, user } = useAuth0();
  return (
    <Grid container direction="row" columnGap={2}>
      <Grid item>
        <img src={user?.picture} alt={user?.name} />
      </Grid>
      <Grid item>
        <Grid
          container
          direction="column"
          alignItems={"flex-start"}
          justifyContent="center"
        >
          <Grid item>
            <Typography>{user?.name}</Typography>
          </Grid>
          <Grid item>
            <Typography>{user?.email}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            color: "#fff",
            borderColor: "#fff",
          }}
        >
          Log Out
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserCard;
