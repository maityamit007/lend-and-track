import Head from 'next/head'
import React from 'react'

function Meta() {
    return (
        <div>
            <Head>
                <title>Lend And Track</title>
                <meta
                    name="description"
                    content="A personal project to keep track of lent items"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta property="og:title" content="Lend And Track" />
                {/* <meta name="image" property="og:image" content="/portfolio.JPG" /> */}
                <meta name="author" content="Amit Maity" />
                <meta
                    property="og:description"
                    content=""
                />
            </Head>
        </div>
    )
}

export default Meta