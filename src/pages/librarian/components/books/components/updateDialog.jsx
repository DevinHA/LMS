import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";

export default class UpdateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateBook: {},
            init: false,
        }
    }

    handleChange = name => e => this.setState({updateBook: {...this.state.updateBook, [name]: e.target.value}})

    handleInit = () => {
        if (this.props.open && !this.state.init) {
            this.setState({
                updateBook: {
                    title: this.props.book.title,
                    author: this.props.book.author,
                    category: this.props.book.category,
                    introduction: this.props.book.introduction,
                    location: this.props.book.location,
                    price: this.props.book.price,
                },
                init: true
            })
        }
        if (!this.props.open && this.state.init) {
            this.setState({
                updateBook: {},
                init: false
            })
        }
    };

    render() {
        this.handleInit();

        return (
            <Dialog
                fullWidth
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Update the book</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label='title'
                        fullWidth
                        defaultValue={this.props.book && this.props.book.title}
                        onChange={this.handleChange('title')}
                    />
                    <TextField
                        margin='dense'
                        label='author'
                        fullWidth
                        defaultValue={this.props.book && this.props.book.author}
                        onChange={this.handleChange('author')}
                    />
                    <TextField
                        margin='dense'
                        label='category'
                        fullWidth
                        defaultValue={this.props.book && this.props.book.category}
                        onChange={this.handleChange('category')}
                    />
                    <TextField
                        margin='dense'
                        label='location'
                        fullWidth
                        defaultValue={this.props.book && this.props.book.location}
                        onChange={this.handleChange('location')}
                    />
                    <TextField
                        margin='dense'
                        label='new price'
                        type='number'
                        fullWidth
                        defaultValue={this.props.book && this.props.book.price}
                        onChange={this.handleChange('price')}
                    />
                    <TextField
                        margin='dense'
                        label='introduction'
                        multiline
                        fullWidth
                        defaultValue={this.props.book && this.props.book.introduction}
                        onChange={this.handleChange('introduction')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.props.handleClose}>Cancel</Button>
                    <Button
                        disabled={!(
                            this.state.updateBook.title &&
                            this.state.updateBook.author &&
                            this.state.updateBook.category &&
                            this.state.updateBook.introduction &&
                            this.state.updateBook.location &&
                            this.state.updateBook.price
                        )}
                        color='primary'
                        onClick={this.props.handleUpdateBook(this.state.updateBook)}
                    >OK</Button>
                </DialogActions>
            </Dialog>
        );
    }
}