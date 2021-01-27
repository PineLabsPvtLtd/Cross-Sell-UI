import { Suspense, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import CircularProgress from '@material-ui/core/CircularProgress';

import PageNotFound from 'common/error';
import Home from 'containers/home';

export default function App() {
    return (
        <Fragment>
            <Suspense fallback={
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >

                    <Zoom in><CircularProgress style={{
                        height: 100, width: 100, padding: 10,
                    }} /></Zoom>
                </Grid>
            }>
                <Router>
                    <Switch>
                        <Route exact path="/:refID">
                            <Home/>
                        </Route>
                        <Route path="*">
                            <PageNotFound showButton={false}/>
                        </Route>
                    </Switch>
                </Router>
            </Suspense>
        </Fragment>
    );
}
