import React from "react";
import {TopBar} from "../components/TopBar";
import {DescriptionOutlined} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import '../admin.scss'
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import { CreateOutlined } from '@material-ui/icons'
import MessageDialog from '../components/messageDialog'
import {serverAdmin} from "../../../mock/config";

export default class ManageRules extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // deposit: 300,
            // fine: 0.01,
            // maxReturnTime: 90,
            // maxReserveTime: 2,
            // maxBorrowNum: 5,


            changingID: undefined,
            returnMessage: undefined,
        };

        this.encode = [
            "Deposit",
            "Fine",
            "Time to return book",
            "Valid time for reserving",
            "Maximum books to borrow",
        ];
    };

    getAllRules = () => {
        fetch(`${serverAdmin}/showRules`)
            .then(Response => Response.json())
            .then(result => {
                this.setState({
                    deposit: result.deposit,
                    fine: result.fine,
                    maxReturnTime: result.maxReturnTime,
                    maxReserveTime: result.maxReserveTime,
                    maxBorrowNum: result.maxBorrowNum,

                    formError: undefined,
                });
            })
            .catch(e => alert(e));
    };

    componentDidMount() {
        this.getAllRules();
    };

    handleChange = which => event => {
        this.setState({[which]: event.target.value})
    };

    handleClose = () => {
        this.setState({
            returnMessage: undefined
        });
    };

    clearFormError = () => {
        this.setState({formError: undefined});
    };

    handleClick = (id, value) => () => {
        if (value === undefined || value.length === 0) {
            this.setState({formError: `${id}empty`});
            return;
        }
        fetch(`${serverAdmin}/admin/changeRules?rule=${id}&value=${value}`)
            .then(Response => Response.json())
            .then(result => {
                this.setState({
                    status: result.state,
                    changingID: id,
                });
            })
            .catch(e => alert(e));
    };

    changeRules = () => {
        if (this.state.status === 1){
            this.setState({
                status: undefined,
                returnMessage: `${this.encode[this.state.changingID]} change success.`
            });
        }
        if (this.state.status === 0) {
            this.setState({
                status: undefined,
                returnMessage: `${this.encode[this.state.changingID]} change failed.`
            });
        }
    };

    render() {
        this.changeRules();

        return (
            <React.Fragment>
                <TopBar />
                <div className="mid-div flex-col">
                    <div className="flex-row"
                         style={{marginBottom: 10}}
                    >
                        <DescriptionOutlined style={{fontSize: 50}} className="col-mid"/>
                        <Typography style={{fontSize: 50, marginLeft: 5}} className="col-mid">
                            Rules Management
                        </Typography>
                    </div>

                    <Grid container spacing={24}>

                        <Grid item xs={12}>
                            <Paper style={{padding: 20}}>
                                <div className="flex-row">
                                    <div>
                                        <Typography variant="title" gutterBottom>Deposit</Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            Paid by the reader to become the member of the Bibliosoft.
                                        </Typography>
                                    </div>
                                    <div className="grow"/>
                                    <TextField
                                        error={this.state.formError === "0empty"}
                                        helperText={this.state.formError === "0empty" && "Please input right format!"}
                                        label="Deposit"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment variant="outlined" position="start">
                                                    $
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        defaultValue={this.state.deposit}
                                        value={this.state.deposit}
                                        onFocus={this.clearFormError}
                                        onChange={this.handleChange("deposit")}
                                    />
                                    <Button
                                        onClick={this.handleClick(0, this.state.deposit)}
                                    >
                                        <CreateOutlined/>
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper style={{padding: 20}}>
                                <div className="flex-row">
                                    <div>
                                        <Typography variant="title" gutterBottom>Fine</Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            Paid for the book which doesn't return in time.
                                        </Typography>
                                    </div>
                                    <div className="grow"/>
                                    <TextField
                                        error={this.state.formError === "1empty"}
                                        helperText={this.state.formError === "1empty" && "Please input right format!"}
                                        label="Fine"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment variant="outlined" position="start">
                                                    $/day
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        defaultValue={this.state.fine}
                                        value={this.state.fine}
                                        onChange={this.handleChange("fine")}
                                    />
                                    <Button onClick={this.handleClick(1, this.state.fine)}>
                                        <CreateOutlined/>
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper style={{padding: 20}}>
                                <div className="flex-row">
                                    <div>
                                        <Typography variant="title" gutterBottom>Time to return book</Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            Time limit for returning the book after borrowing.
                                        </Typography>
                                    </div>
                                    <div className="grow"/>
                                    <TextField
                                        error={this.state.formError === "2empty"}
                                        helperText={this.state.formError === "2empty" && "Please input right format!"}
                                        label="Time to return book"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment variant="outlined" position="start">
                                                    days
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        defaultValue={this.state.maxReturnTime}
                                        value={this.state.maxReturnTime}
                                        onChange={this.handleChange("maxReturnTime")}
                                    />
                                    <Button onClick={this.handleClick(2, this.state.maxReturnTime)}>
                                        <CreateOutlined/>
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper style={{padding: 20}}>
                                <div className="flex-row">
                                    <div>
                                        <Typography variant="title" gutterBottom>Valid Time for reserving</Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            The valid time that a reader can borrow the book reserved after reserving.
                                        </Typography>
                                    </div>
                                    <div className="grow"/>
                                    <TextField
                                        error={this.state.formError === "3empty"}
                                        helperText={this.state.formError === "3empty" && "Please input right format!"}
                                        label="Valid Time for reserving"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment variant="outlined" position="start">
                                                    hours
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        defaultValue={this.state.maxReserveTime}
                                        value={this.state.maxReserveTime}
                                        onChange={this.handleChange("maxReserveTime")}
                                    />
                                    <Button onClick={this.handleClick(3, this.state.maxReserveTime)}>
                                        <CreateOutlined/>
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper style={{padding: 20}}>
                                <div className="flex-row">
                                    <div>
                                        <Typography variant="title" gutterBottom>Maximum books to borrow</Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            The maximum number of books that a reader can borrow meanwhile.
                                        </Typography>
                                    </div>
                                    <div className="grow"/>
                                    <TextField
                                        error={this.state.formError === "4empty"}
                                        helperText={this.state.formError === "4empty" && "Please input right format!"}
                                        label="Maximum books to borrow"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment variant="outlined" position="start">
                                                    books
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        defaultValue={this.state.maxBorrowNum}
                                        value={this.state.maxBorrowNum}
                                        onChange={this.handleChange("maxBorrowNum")}
                                    />
                                    <Button onClick={this.handleClick(4, this.state.maxBorrowNum)}>
                                        <CreateOutlined/>
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                    <MessageDialog
                        handleClose={this.handleClose}
                        open={this.state.returnMessage !== undefined}
                        message={this.state.returnMessage}
                    />
                </div>
            </React.Fragment>
        );
    }
}