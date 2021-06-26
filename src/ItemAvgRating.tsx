import {Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {axiosInstance} from "../lib/axiosInstance";

export default function ItemAvgRating({id}: { id: string }) {
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axiosInstance.get('rating/average', {params: {itemId: id}}).then(res => {
            setRating(res.data.score)
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })
    }, [])
    return (
        <Typography variant="body2" gutterBottom>
            <b>AverageRating: </b> {loading ? null : rating}
        </Typography>
    )

}