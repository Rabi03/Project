import React from 'react'
import {Helmet} from "react-helmet";

export default function MetaData({title}) {
    return (
        <Helmet>
                <meta charSet="utf-8" />
                <title>{title} | Sharend</title>
            </Helmet>
    )
}
