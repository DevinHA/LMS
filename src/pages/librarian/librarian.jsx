import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Books from './components/books/books.jsx';
import './librarian.scss';
import ApplicationFooter from "../../mock/footer";
import BookDetails from "./components/bookDetail/details";
import Readers from "./components/readers/readers";
import BookHistory from "./components/history/bookHistory";
import LibrarianNotifications from "./components/notifications/notifications";
import Categories from "./components/categories/categories";
import Summary from "./components/summary/summary";
import Locations from "./components/locations/locations";

export default class Librarian extends React.Component {
    render() {
        return (
            <div style={{width: '100%', height: '100%'}} className="flex-col">
                <div className="grow">
                    <BrowserRouter>
                        <Switch>
                            <Route path='/librarian/:loginUser/books' exact component={Books}/>
                            <Route path='/librarian/:loginUser/books/:isbn' component={BookDetails}/>
                            <Route path='/librarian/:loginUser/categories' component={Categories}/>
                            <Route path='/librarian/:loginUser/locations' component={Locations}/>
                            <Route path='/librarian/:loginUser/readers' component={Readers}/>
                            <Route path='/librarian/:loginUser/history' component={BookHistory}/>
                            <Route path='/librarian/:loginUser/notifications' component={LibrarianNotifications}/>
                            <Route path='/librarian/:loginUser/summary' component={Summary}/>
                        </Switch>
                    </BrowserRouter>
                </div>
                <ApplicationFooter/>
            </div>
        );
    }
};