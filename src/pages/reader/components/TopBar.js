import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Notifications, History, ExitToApp, Home, DescriptionOutlined } from '@material-ui/icons'
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import {TextField} from "@material-ui/core";
import LibraryRules from "../libraryRules";

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 12,
        // fontSize: 20
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 7,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 7,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 100,
            '&:focus': {
                width: 300,
            },
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    toolbar: theme.mixins.toolbar,
});

class PrimarySearchAppBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: undefined,

            openRules: false,
            deposit: 300,
            fine: 0.01,
            maxReturnTime: 90,
            maxReserveTime: 2,
            maxBorrowNum: 5,
        }
    }

    getAllRules = () => {
        fetch('/showRules')
            .then(Response => Response.json())
            .then(result => {
                this.setState({
                    deposit: result.deposit,
                    fine: result.fine,
                    maxReturnTime: result.maxReturnTime,
                    maxReserveTime: result.maxReserveTime,
                    maxBorrowNum: result.maxBorrowNum,
                });
            })
            .catch(e => alert(e));
    };

    handleLogout = () => {
        fetch('/logout').catch(e => alert(e));
        window.location.href = '/';
    };

    handleChange = e => {
        this.setState({keywords: e.target.value});
    };

    handleSearch = e => {
        if (e.keyCode !== 13)
            return;

        window.location.href = '/reader/search/' + this.state.keywords;
    };

    handleClick = () => {
        this.setState({openRules: true});
    };

    handleClose = () => {
        this.setState({openRules: false});
    };

    componentDidMount() {
        // this.getAllRules();
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            component={Link} to='/reader'
                        >
                            <Home />
                        </IconButton>
                        <Typography className={classes.title} variant="title" color="inherit" noWrap>
                            Bibliosoft
                        </Typography>
                        <div className={classes.grow} />
                        {this.props.searchBar &&
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    value={this.state.keywords}
                                    onChange={this.handleChange}
                                    onKeyUp={this.handleSearch}
                                />
                            </div>}
                        <div className={classes.sectionDesktop}>
                            <IconButton color="inherit" onClick={this.handleClick}>
                                <DescriptionOutlined />
                            </IconButton>
                            <IconButton color="inherit" component={Link} to='/reader/history'>
                                <History />
                            </IconButton>
                            <IconButton color="inherit" component={Link} to='/reader/notification'>
                                <Notifications />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                onClick={this.handleLogout}
                            >
                                <ExitToApp />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <LibraryRules
                    open={this.state.openRules}
                    handleClose={this.handleClose}
                    rules={{
                        deposit: this.state.deposit,
                        fine: this.state.fine,
                        maxReturnTime: this.state.maxReturnTime,
                        maxReserveTime: this.state.maxReserveTime,
                        maxBorrowNum: this.state.maxBorrowNum,
                    }}
                />
            </div>
        );
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const TopBar = withStyles(styles)(PrimarySearchAppBar);

export { TopBar }
