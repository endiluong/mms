import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getAccessToken } from "./auth";

// receives component and any other props represented by ...rest
export default function GuardedRoute({
  component: Component,
  //   layout: Layout = undefined,
  ...rest
}) {
  const token = getAccessToken();

  return (
    // this route takes other route assigned to it from the App.js and return the same route if condition is met
    <Route
      {...rest}
      render={(props) => {
        // return route if there is a valid token set in the cookie
        if (token) {
          return <Component {...props} />;
        } else {
          // return the user to the landing page if there is no valid token set
          return (
            <Redirect
              to={{
                pathname: "/auth/login",
                state: {
                  // sets the location a user was about to assess before being redirected to login
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}
