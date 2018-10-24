import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    DialogActions,
    Snackbar, withStyles, IconButton
} from '@material-ui/core';
import React from 'react';
import {fetchDeleteReader, fetchReaderHistory, fetchReaderList} from '../../../../mock';
import Typography from "@material-ui/core/Typography/Typography";
import blue from "@material-ui/core/es/colors/blue";
import {blueGrey} from "@material-ui/core/colors";
import {BuildOutlined} from "@material-ui/icons";

export default class Readers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      // history: null,
        borrowingHistory: [],
        reservingHistory: [],
        borrowedHistory: [],
        deleteOpen: false,
      newReader: {},
      addOpen: false,
        whoseDetails: undefined,
        snackOpen: false,
        eventStatus: 0,
        updateOpen: false,
    }
  }
  handleClose = () => this.setState({
      open: false,
      whoseDetails: undefined,
  })
  handleclose1 = () => this.setState({addOpen: false})
  handleChange = name => e => this.setState({newReader: {...this.state.newReader, [name]: e.target.value}})
    handleSnackClose = () => this.setState({snackOpen: false})
  handleOpen = () => this.setState({addOpen: true})
    handleOpenUpdate = id => () => this.setState({updateOpen: true, newReader: {...this.state.newReader, id:id}})
    handleCloseUpdate = () => this.setState({updateOpen: false})
  changeDateFormat = (d) => {
    let date = new Date(d);
    let changed = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return changed;
  }
    classifyHistory = (history) => {
    let borrowing = [], reserving = [], borrowed = [];
    for (let i in history) {
      let h = history[i];
      if (h.borrowTime !== null) {
        h.borrowTime = this.changeDateFormat(h.borrowTime);
      }
      if (h.returnTime !== null) {
        h.returnTime = this.changeDateFormat(h.returnTime);
      }
      if (h.reserveTime !== null) {
        h.reserveTime = this.changeDateFormat(h.reserveTime);
      }
      if (h.borrowTime !== null && h.returnTime === null) {
        borrowing.push(h);
      }
      else if (h.reserveTime !== null && h.borrowTime === null) {
        reserving.push(h);
      }
      else if (h.borrowTime !== null && h.returnTime !== null) {
        borrowed.push(h);
      }
    }
    this.setState({
       borrowingHistory: borrowing,
       reservingHistory: reserving,
       borrowedHistory: borrowed,
    });
  };
  handleDetails = id => async () => {
    const history = await fetchReaderHistory(id);
    await this.classifyHistory(history);
    this.setState({
      open: true,
        whoseDetails: id,
    })
  }

    render() {
    const props = this.props;

    return([
      <Table>
        <TableHead>
          <TableRow>
            <CustomTableCell>ID</CustomTableCell>
            <CustomTableCell numeric>Name</CustomTableCell>
            <CustomTableCell numeric>books borrowed</CustomTableCell>
            <CustomTableCell numeric>books reserved</CustomTableCell>
            <CustomTableCell numeric>deposit</CustomTableCell>
            <CustomTableCell numeric><Button variant='outlined' color="inherit" onClick={this.handleOpen}>add</Button></CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {typeof(props.list.map) !== "undefined"
            && props.list.filter(reader => reader.id.includes(props.searchTerm)).map((item, index) =>
            <TableRow key={index} className="table-row">
              <TableCell>{item.id}</TableCell>
              <TableCell numeric>{item.name}</TableCell>
              <TableCell numeric>{item.booksBorrowed}</TableCell>
              <TableCell numeric>{item.booksReserved}</TableCell>
              <TableCell numeric>{item.deposit}</TableCell>
              <TableCell numeric>
                  <IconButton onClick={this.handleOpenUpdate(item.id)}>
                      <BuildOutlined/>
                  </IconButton>
                <Button variant='outlined' onClick={this.handleDetails(item.id)}>detail</Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>,
      <Dialog
        maxWidth='lg'
        open={this.state.open}
        onClose={this.handleClose}
        scroll="paper"
      >
        {/*<DialogTitle>Borrow History</DialogTitle>*/}
        <DialogContent>
          <div style={{marginBottom: 10}}>
              <Typography variant="title">Borrowing Books</Typography>
              {this.state.borrowingHistory == false ? <Typography>No books borrowing.</Typography> :
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>barcode</TableCell>
                    <TableCell>borrow time</TableCell>
                    {/*<TableCell>fine</TableCell>*/}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.borrowingHistory.map(item =>
                    <TableRow key={item.barcode}>
                      <TableCell>{item.barcode}</TableCell>
                      <TableCell>{item.borrowTime}</TableCell>
                      {/*<TableCell>{item.fine}</TableCell>*/}
                    </TableRow>
                  )}
                </TableBody>
              </Table>}
          </div>

          <div style={{marginBottom: 10}}>
              <Typography variant="title">Reserving Books</Typography>
              {this.state.reservingHistory == false ? <Typography>No books reserving.</Typography> :
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>barcode</TableCell>
                            <TableCell>reserve time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.reservingHistory.map(item =>
                            <TableRow key={item.barcode}>
                                <TableCell>{item.barcode}</TableCell>
                                <TableCell>{item.reserveTime}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>}
          </div>

          <div style={{marginBottom: 10}}>
              <Typography variant="title">Borrowed Books</Typography>
              {this.state.borrowedHistory == false ? <Typography>No books borrowed.</Typography> :
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>barcode</TableCell>
                        <TableCell>borrow time</TableCell>
                        <TableCell>return time</TableCell>
                        <TableCell>fine</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.borrowedHistory.map(item =>
                        <TableRow key={item.barcode}>
                            <TableCell>{item.barcode}</TableCell>
                            <TableCell>{item.borrowTime}</TableCell>
                            <TableCell>{item.returnTime}</TableCell>
                            <TableCell>{item.fine}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>}
          </div>

          </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose}>cancel</Button>
                <Button onClick={() => {
                    props.handleDeleteReader(this.state.whoseDetails)();
                    this.setState({open: false});
                }}>delete the reader</Button>
            </DialogActions>
      </Dialog>,
      <Dialog
        open={this.state.addOpen}
        onClose={this.handleclose1}
      >
        <DialogTitle>Add Reader</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            label='ID'
            fullWidth
            onChange={this.handleChange('id')}
          />
          <TextField
            margin='dense'
            label='password'
            type='password'
            fullWidth
            onChange={this.handleChange('password')}
          />
          <TextField
            margin='dense'
            label='email'
            type='email'
            fullWidth
            onChange={this.handleChange('email')}
          />
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={this.handleclose1}>cancel</Button>
          <Button color='primary' onClick={() => {
              props.handleAddReader(this.state.newReader)()
              this.setState({addOpen: false})
          }}>OK</Button>
        </DialogActions>
      </Dialog>,
        <Dialog
            open={this.state.updateOpen}
            onClose={this.handleCloseUpdate}
        >
            <DialogTitle>Update Reader</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label='email'
                    type='email'
                    fullWidth
                    onChange={this.handleChange('email')}
                />
                <TextField
                    margin='dense'
                    label='password'
                    type='password'
                    fullWidth
                    onChange={this.handleChange('password')}
                />
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={this.handleCloseUpdate}>cancel</Button>
                <Button color='primary' onClick={() => {
                    props.handleUpdateReader(this.state.newReader)()
                    this.setState({updateOpen: false})
                }}>OK</Button>
            </DialogActions>
        </Dialog>,
    ])
  }
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: blue[300],
        color: theme.palette.common.white,
        // fontSize: 18,
    },
    body: {
        // fontSize: 16,
    },
}))(TableCell);