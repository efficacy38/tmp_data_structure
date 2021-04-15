import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

const loading = <div className="pt-3 text-center">i am loading</div>;

function TheContent() {
  return (
    <div>
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/forgetPasswd"
              name="Forget Passwd"
              render={(props) => <ForgetPasswd {...props} />}
            />
            <PrivateRoute
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <PrivateRoute
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    </div>
  );
}

export default TheContent;
