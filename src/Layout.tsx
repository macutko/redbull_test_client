import {AppBar, Box, FormControlLabel, Link, Switch, Toolbar, Typography} from '@material-ui/core'
import Head from 'next/head'
import React from 'react'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBack';

export const siteTitle = 'RedBull CaseStudy'


interface Props {
    window?: () => Window;
    children: React.ReactElement;
    topTen?: boolean;
    setTopTen?: () => void
}

export default function Layout(props: Props) {


    return (
        <Box>
            <Head>
                <title>RedBull awesome showcase</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <header>

            </header>

            <AppBar position="static">
                <Toolbar>
                    <Box minWidth={"10vw"}>
                        {
                            props.topTen !== undefined ?

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={props.topTen}
                                            onChange={props.setTopTen}
                                            name="TopTen"
                                            inputProps={{'aria-label': 'secondary checkbox'}}
                                        />
                                    }
                                    label={props.topTen ? "Top Ten" : "All content"}
                                />

                                :
                                <Link href={`/`}>
                                    <ArrowBackOutlinedIcon color={"error"}/>
                                </Link>
                        }
                    </Box>


                </Toolbar>
            </AppBar>


            <main>
                {props.children}
            </main>

            {/*<ScrollTop {...props}>*/
            }
            {/*    <Fab color="secondary" size="small" aria-label="scroll back to top">*/
            }
            {/*        <KeyboardArrowUpIcon/>*/
            }
            {/*    </Fab>*/
            }
            {/*</ScrollTop>*/
            }
            <Box my={2}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    Matt Gallik
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </Box>
    )
}