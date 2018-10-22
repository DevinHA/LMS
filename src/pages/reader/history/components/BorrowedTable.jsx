import {withStyles} from "@material-ui/core";
import blue from "@material-ui/core/es/colors/blue";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableFooter from "@material-ui/core/TableFooter/TableFooter";
import React from "react";

const styles = theme => ({
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: blue[300],
        color: theme.palette.common.white,
        fontSize: 16,
    },
    body: {
        fontSize: 14,
    },
    footer: {
        backgroundColor: blue[50],
        color: theme.palette.common.black,
        fontSize: 16,
    }
}))(TableCell);

function BorrowedTable(props) {
    const { classes } = props;

    return (
        <Grid item xs={12}>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Title</CustomTableCell>
                            <CustomTableCell numeric>Author</CustomTableCell>
                            <CustomTableCell numeric>Barcode</CustomTableCell>
                            <CustomTableCell numeric>Borrow Time</CustomTableCell>
                            <CustomTableCell numeric>Return Time</CustomTableCell>
                            <CustomTableCell numeric>Fine ($)</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.records.map(book => {
                            return (
                                <TableRow className={classes.row}>
                                    <CustomTableCell component="th" scope="row">
                                        {book.title}
                                    </CustomTableCell>
                                    <CustomTableCell numeric>{book.author}</CustomTableCell>
                                    <CustomTableCell numeric>{book.barcode}</CustomTableCell>
                                    <CustomTableCell numeric>{book.borrowTime}</CustomTableCell>
                                    <CustomTableCell numeric>{book.returnTime}</CustomTableCell>
                                    <CustomTableCell numeric>{book.fine}</CustomTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    { props.total !== undefined && <TableFooter>
                        <TableRow>
                            <CustomTableCell>Total fine ($)</CustomTableCell>
                            <CustomTableCell numeric/>
                            <CustomTableCell numeric/>
                            <CustomTableCell numeric/>
                            <CustomTableCell numeric/>
                            <CustomTableCell numeric>{props.total}</CustomTableCell>
                        </TableRow>
                    </TableFooter>}
                </Table>
            </Paper>
        </Grid>
    );
};

const BorrowedTableWrapped = withStyles(styles)(BorrowedTable);
export default BorrowedTableWrapped;