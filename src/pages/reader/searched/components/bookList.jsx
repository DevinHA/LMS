import {OneBook} from "./OneBook";
import {Grid} from "@material-ui/core";
import React from "react";

export default function BookList(props) {

    return (
        <div>
            <Grid container spacing={24}>
                {props.bookList.map(book =>
                    <Grid item xs={6}>
                        <OneBook
                            key={book.isbn}
                            book={book}
                            handleOpen={props.handleOpen}
                        />
                    </Grid>
                )}
            </Grid>
        </div>
    );
}