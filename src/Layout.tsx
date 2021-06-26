import { Box, Link, makeStyles, Typography } from '@material-ui/core'
import Head from 'next/head'
import React from 'react'

export const siteTitle = 'RedBull CaseStudy'

const useStyles = makeStyles(() => ({
  lander: {
    height: "90vh",
    // backgroundColor: theme.palette.primary.main,
    width: "100vw",
    marginBottom: 10,
    maxWidth: "100%",
  }
}));

type LayoutProps = {
  children: React.ReactNode,
  home?: boolean
}

export default function Layout({ children, home = false }: LayoutProps) {
  const classes = useStyles();

  return (
    <Box>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Present content for RedBull via NextJS"
        />

        <meta name="og:title" content={siteTitle} />
      </Head>
      <header >

      </header>

      <Box className={classes.lander}>
        <h1>RedBull test </h1>
      </Box>

      <main>{children}</main>
      {!home && (
        <div >
          <Link href="/">
            ← Back to home
          </Link>
        </div>
      )}
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