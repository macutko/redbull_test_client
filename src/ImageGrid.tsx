import { CircularProgress, Container, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomCard from "./CustomCard";
import { getUniqueContent, shuffle } from "./utils";


const useStyles = makeStyles({
    feedContainer: {
        maxWidth: "50vw",
        alignContent: "center"
    },
});

const ImageGrid = () => {
    const classes = useStyles();

    const data = shuffle(getUniqueContent())

    const [count, setCount] = useState({
        prev: 0,
        next: 6
    })
    const [hasMore, setHasMore] = useState(true);
    const [current, setCurrent] = useState(data.slice(count.prev, count.next))
    const getMoreData = () => {
        if (current.length === data.length) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setCurrent(current.concat(data.slice(count.prev + 6, count.next + 6)))
        }, 1000)
        setCount((prevState) => ({ prev: prevState.prev + 6, next: prevState.next + 6 }))
    }
    return (
        <InfiniteScroll
            dataLength={current.length}
            next={getMoreData}
            hasMore={hasMore}
            style={{ overflow: "hidden" }}
            loader={<CircularProgress color="secondary" />}
        >
            <Container className={classes.feedContainer}>
                {current && current.map((item) => (
                    <CustomCard key={item.id} {...item} /> 
                ))}
            </Container>
        </InfiniteScroll>

    );
}
export default ImageGrid;