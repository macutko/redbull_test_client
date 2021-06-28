import {Box, fade, Grid, InputBase, makeStyles, Theme} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomCard from "./CustomCard";
import {getUniqueContent} from "../lib/utils";
import {createStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import Fuse from "fuse.js";


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        padding: 40
    },
    search: {
        position: 'relative',
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.primary.light, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.light, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const origData = getUniqueContent()

const ImageGrid = () => {
    const classes = useStyles();

    const [count, setCount] = useState({
        prev: 0,
        next: 6
    })
    const [hasMore, setHasMore] = useState(true);
    const [data, setData] = useState(origData)
    const [current, setCurrent] = useState(data.slice(count.prev, count.next))
    const fuse = new Fuse(data, {
        keys: ["title"],
    });
    const [value, setValue] = useState('')

    useEffect(() => {
        setCurrent(current.concat(data.slice(count.prev + 6, count.next + 6)))
    }, [count])

    useEffect(() => {
        setCount(() => ({prev: 0, next: 6}))
        setCurrent(data.slice(0, 6))
    }, [data])

    useEffect(() => {
        if (value != '') {
            setData(fuse.search(value).map((item) => item.item))
            return;
        } else {
            setData(origData)
        }
    }, [value])

    const getMoreData = () => {
        if (current.length === data.length) {
            setHasMore(false);
            return;
        }
        setCount((prevState) => ({prev: prevState.prev + 6, next: prevState.next + 6}))
    }
    return (
        <InfiniteScroll
            dataLength={current.length}
            next={getMoreData}
            hasMore={hasMore}
            style={{overflow: "hidden"}}
            loader={null}
        >
            <Box mt={1}>
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
                        inputProps={{'aria-label': 'search'}}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
            </Box>

            <div className={classes.root}>
                <Grid container spacing={3}>
                    {current && current.map((item) => (
                        <Grid key={`${item.id}_grid`} item xs={4}>
                            <CustomCard key={`${item.id}_card`} {...item} />
                        </Grid>
                    ))}
                </Grid>

            </div>
        </InfiniteScroll>

    );
}
export default ImageGrid;