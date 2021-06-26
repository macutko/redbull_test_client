import { CircularProgress, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomCard from "./CustomCard";
import { getUniqueEntries, shuffle } from "./utils";


const useStyles = makeStyles(() => ({
    gridList: {
        height: "100%",
        width: "100%"
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));



const ImageGrid = () => {
    const classes = useStyles();

    const data = shuffle(getUniqueEntries())

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
            {current && current.map((item) => (
                <CustomCard key={item.id} {...item} />
            ))}
        </InfiniteScroll>

    );
}
export default ImageGrid;