 /** @jsxImportSource theme-ui */ 

import Layout from "components/layout";
import { Box, Button, Card, Flex, Heading, Image, Paragraph } from "theme-ui"
import { useRouter } from "next/dist/client/router";
import ConfettiGenerator from 'confetti-js'
import { useEffect, useRef, useState } from "react";
import { qrHuntCodes } from "./index"

const QRCheck: React.FC = () => {
  const router = useRouter()
  const confettiCanvasRef = useRef()

  const [state, setState] = useState<'found' | 'claimed' | 'notfound'>('notfound')

  useEffect(() => {
    const codesFound = new Set(JSON.parse(localStorage.getItem('qrHuntCodesFound')))

    const remaining = qrHuntCodes.length - codesFound.size
    if (remaining === 0) setState('found')

    // All valid codes must be included:
    for (const code of qrHuntCodes) if (!codesFound.has(code)) setState('notfound')

    if (localStorage.getItem('qrHuntCodesClaimed')) setState('claimed')
    
    // Mark the hunt as claimed
    if (state === 'found') localStorage.setItem('qrHuntCodesClaimed', 'true')
  }, [])

  return <Layout center>
    <Card sx={{
      backgroundImage: (t: any) => ({
        'found': t.util.gx('blue', 'green'),
        'claimed': t.util.gx('orange', 'yellow'),
        'notfound': t.util.gx('red', 'orange')
      }[state])
    }}>
      <Paragraph variant='caption' sx={{ color: 'white', fontWeight: 'bold' }}>
        {state === 'found' && 'Nice job! Show this page to Benjamin to claim your stickers.'}
        {state === 'claimed' && `Oops! You've already claimed your stickers.`}
        {state === 'notfound' && `You haven't found all the QR codes. Keep looking around the school, or ask someone for a clue.`}
      </Paragraph>
    </Card>
  </Layout>
}

export default QRCheck
