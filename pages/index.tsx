/** @jsxImportSource theme-ui */
import Layout from 'components/layout'
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Paragraph,
  useColorMode,
  Text
} from 'theme-ui'
import NLink from 'next/link'
import { useRouter } from 'next/dist/client/router'
import ConfettiGenerator from 'confetti-js'
import { useEffect, useRef, useState } from 'react'
import MouseBlobs from 'components/MouseBlobs'
import NImage from 'next/image'
import Icon from '@hackclub/icons'
import Head from 'next/head'

import benjaminImage from '../public/ben_trainedit_square.png'
import axios from 'axios'

// Ideally codes would be checked server-side to prevent cheating by searching the bundle, but this is easier and it doesn't really matter
export const qrHuntCodes = process.env.QR_HUNT_CODES.split(',')

const Home: React.FC = () => {
  const router = useRouter()
  const confettiCanvasRef = useRef()

  // We have to create our own state variable to work around a bug on first load
  const [darkTheme, _setDarkTheme] = useState(false)
  const _darkTheme = useColorMode()[0] === 'dark'
  useEffect(() => {
    _setDarkTheme(_darkTheme)
  }, [_darkTheme])

  console.log(darkTheme)

  let fromQr = router.query.fromQr as string
  if (!qrHuntCodes.includes(fromQr)) fromQr = null // Check that code is valid

  const [codesRemaining, setCodesRemaining] = useState(5)

  useEffect(() => {
    if (fromQr) {
      try {
        // Simple Analytics event
        (window as any).sa_event(`qr_${fromQr}`)
      } catch {}

      const confetti = new ConfettiGenerator({
        target: confettiCanvasRef.current,
        max: '100',
        size: '1',
        animate: true,
        props: ['circle', 'square', 'triangle', 'line'],
        colors: [
          [165, 104, 246],
          [230, 61, 135],
          [0, 199, 228],
          [253, 214, 126]
        ],
        clock: '15',
        rotate: true,
        start_from_edge: false,
        respawn: true
      })
      confetti.render()

      const codesFound = new Set(
        JSON.parse(localStorage.getItem('qrHuntCodesFound'))
      )
      codesFound.add(fromQr) // Add the code we just found

      setCodesRemaining(qrHuntCodes.length - codesFound.size)

      // Save codes found in localStorage as an array
      localStorage.setItem(
        'qrHuntCodesFound',
        JSON.stringify(Array.from(codesFound))
      )

      return () => confetti.clear()
    }
  })

  return (
    <Layout center>
      <Head>
        <title>Centaurus Hack Club</title>
        <meta
          name="description"
          content="We are a group of students from Lafayette, Colorado, sharing our love for making by coding apps, websites, games and more."
        />
      </Head>

      <MouseBlobs />
      <Flex
        sx={{
          mx: 'auto',
          minHeight: '80vh',
          maxWidth: 'narrow',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          flexDirection: 'column',
          gap: 4
        }}
      >
        {fromQr && (
          <>
            <Card
              sx={{
                backgroundImage: (t: any) => t.util.gx('orange', 'purple')
              }}
            >
              <Paragraph
                variant="caption"
                sx={{ color: 'white', fontWeight: 'bold', pb: 1 }}
              >
                {codesRemaining > 0
                  ? 'It looks like you found one of the QR codes.'
                  : 'You found all the QR codes!'}
              </Paragraph>

              <Paragraph variant="caption" sx={{ color: 'white' }}>
                {codesRemaining > 0 ? (
                  <span>
                    There are <strong>{codesRemaining} more</strong> QR codes
                    located around the school. Scan them all from the same phone
                    and bring it to our next meeting to get some awesome
                    stickers.
                  </span>
                ) : (
                  `Bring this phone to our next Hack Club meeting and I'll give you some stickers!`
                )}
              </Paragraph>
            </Card>
            <canvas
              ref={confettiCanvasRef}
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
              }}
            />
          </>
        )}
        <Heading
          as="h1"
          sx={{
            fontSize: 5
          }}
        >
          Centaurus Hack Club
        </Heading>
        <Paragraph sx={{ fontSize: 2, color: darkTheme ? 'smoke' : 'slate' }}>
          Hack Club is a new coding club at Centaurus, and a chapter of the
          international{' '}
          <Link href="https://hackclub.com/" target="_blank" rel="noopener">
            Hack Club
          </Link>
          . Come build websites, apps, games, hardware projects, and more! Open
          to <strong>all</strong> experience levels, from complete beginner to
          coding legend. Starting September 14.
        </Paragraph>
        <NLink href="/join">
          <Button variant="ctaLg">Join Now</Button>
        </NLink>
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: 5,
          my: 6
        }}
      >
        <Heading sx={{ fontSize: 4 }} id="leadership">
          Leadership
        </Heading>
        <Flex sx={{ gap: 3, alignItems: 'center' }}>
          <NImage
            src={benjaminImage}
            alt="Benjamin Ashbaugh"
            width={150}
            height={150}
            quality={85}
            title="Photo credit: Kunal Botla"
            sx={{
              borderRadius: '50%'
            }}
          />
          <Flex sx={{ flexDirection: 'column' }}>
            <Heading>Benjamin Ashbaugh</Heading>
            <Text variant="caption">founder, he/him</Text>
            <div sx={{ py: 3 }}>
              <a href="mailto:benjamin@chshack.club">
                <Button variant="outline">
                  <Icon glyph="email-fill" size={20} />
                  contact
                </Button>
              </a>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default Home
