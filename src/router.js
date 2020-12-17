import { Suspense, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import PageNotFound from 'common/error';

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
                        <Route exact path="/">
                            <Button variant="contained" color="primary">
                                Hello World
                            </Button>
                        </Route>
                        <Route path="*">
                            <PageNotFound/>
                        </Route>
                    </Switch>
                </Router>
            </Suspense>
        </Fragment>
    );
}
