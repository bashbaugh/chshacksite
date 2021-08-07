/** @jsxImportSource theme-ui */

import Layout from 'components/layout'
import { Box, Button, Card, Flex, Heading, Link, Paragraph } from 'theme-ui'
import NLink from 'next/link'
import { useRouter } from 'next/dist/client/router'
import ConfettiGenerator from 'confetti-js'
import { useEffect, useRef, useState } from 'react'

export const qrHuntCodes = ['hax', '615', 'ceh', 'ben', 'yee']

const Home: React.FC = () => {
  const router = useRouter()
  const confettiCanvasRef = useRef()

  let fromQr = router.query.fromQr as string
  if (!qrHuntCodes.includes(fromQr)) fromQr = null // Check that code is invalid

  const [codesRemaining, setCodesRemaining] = useState(5)

  useEffect(() => {
    if (fromQr) {
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
      <Flex
        sx={{
          mx: 'auto',
          maxWidth: 'narrow',
          alignItems: 'center',
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
        <Paragraph sx={{ fontSize: 2, color: 'slate' }}>
          Hack Club is a new coding club at Centaurus, and a chapter of the
          international{' '}
          <Link href="https://hackclub.com/" target="_blank" rel="noopener">
            Hack Club
          </Link>
          . Come build websites, apps, games, hardware projects, and more! Open
          to <strong>all</strong> experience levels, from complete beginner to
          coding god. More info coming soon!
        </Paragraph>
        <NLink href="/join">
          <Button variant="ctaLg">Join Now</Button>
        </NLink>
      </Flex>
    </Layout>
  )
}

export default Home
