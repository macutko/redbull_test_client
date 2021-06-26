import {axiosInstance} from "../lib/axiosInstance";
import Rating from "@material-ui/lab/Rating";
import React, {useEffect, useState} from "react";

export default function CustomRating({...data}) {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
        axiosInstance.get('rating/user', {params: {itemId: data.id}}).then(res => {
            setValue(res.data.score)
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })
    }, [])

    return (
        loading ? null :
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(_event, newValue) => {
                    if (newValue) {
                        setValue(newValue)
                        axiosInstance.post('/rating/rate', {itemId: data.id, score: newValue})
                            .then((res) => {
                                console.log(res)
                            }).catch(e => console.log(e))
                    }
                }}
            />
    )
}