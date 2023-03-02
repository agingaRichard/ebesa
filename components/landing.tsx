import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  logo: {
    marginTop: theme.spacing(4),
  },
}));

export default function Index() {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <Typography variant={isMobile ? "h4" : "h2"}>
          Welcome to my site!
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.logo}>
        <img src="/images/ebesa-transparent.png" alt="site logo" />
      </Grid>
    </Grid>
  );
}
