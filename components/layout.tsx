import { Box, Container, Flex } from 'theme-ui'
import Navbar from './nav'

const Layout: React.FC<{
  /** Horizontally and vertically center the content */
  center?: boolean
}> = ({ children, center }) => (
  <Flex
    sx={{
      flexDirection: 'column',
      minHeight: '100vh'
    }}
  >
    <Navbar />
    <Container
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: center && 'center',
        justifyContent: center && 'center',
        maxWidth: 'copyPlus'
      }}
    >
      <Box as='main'>
        {children}
      </Box>
    </Container>
  </Flex>
)

export default Layout
