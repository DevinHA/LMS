import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';
import blue from "@material-ui/core/es/colors/blue";
import TopBar from "../nav/TopBar";
import Nav from "../nav/nav";
import * as intl from "react-intl-universal";
import {fetchBookHistory} from "../../../../mock";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import TablePaginationFooter from "../../../../mock/tablePaginationFooter";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import HistoryList from "./component/historyList";

export default class BookHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            lostHistory: [],
            deletedHistory: [],
        }
    }

    classifyHistory = (historyList) => {
        let deletedHistory = [], lostHistory = [];
        for (let h of historyList) {
            let c = h;
            if (h.id && h.id[0] === 'l') {
                // book lost
                c['id'] = c.id.substr(6);
                lostHistory.push(c);
            }
            else {
                deletedHistory.push(c)
            }
        }
        this.setState({lostHistory, deletedHistory})
    }

    async componentDidMount() {
        let historyList = await fetchBookHistory()
        this.classifyHistory(historyList)
    }

    render() {
        return(
            <div className="flex-col">
                <TopBar loginUser={this.props.match.params.loginUser}/>
                <div style={{width: '100%'}} className="flex-row">
                    <Nav loginUser={this.props.match.params.loginUser} whichFunction={"history"}/>
                    <div className="grow">
                        <HistoryList
                            historyList={this.state.deletedHistory}
                            title={intl.get('basic.deletedHistory')}
                            account={intl.get('basic.librarian')}
                        />
                        <HistoryList
                            historyList={this.state.lostHistory}
                            title={intl.get('basic.lostHistory')}
                            account={intl.get('basic.reader')}
                        />
                    </div>
                </div>
            </div>
        )
    }
}