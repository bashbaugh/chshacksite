import { Box, Container, Flex, Image, Link } from 'theme-ui'
import NLink from 'next/link'

const NavLink = ({ href, children }) => <NLink href={href}>
  <a>
    {children}
  </a>
</NLink>

const Navbar: React.FC = () => (
  <Container>
    <Flex
      mb={2}
      sx={{
        gap: 4,
        alignItems: 'center'
      }}
    >
      <NLink href="/">
        <a>
          <Flex sx={{
            alignItems: 'center',
            gap: 2
          }}>
            <Image
              sx={{ width: 140 }}
              src="/flag-orpheus-top.svg"
              alt="Hack Club logo"
              draggable={false}
            />
            <Image
              sx={{ width: 60 }}
              src="/logo-centaurus-high-school.png"
              alt="Centaurus logo"
              draggable={false}
            />
          </Flex>
        </a>
      </NLink>
      <Box
        sx={{
          flexGrow: 1
        }}
      >
        {/* CHS */}
      </Box>
      <Flex
        sx={{
          gap: 2
        }}
      >
        {/* <NavLink href='/#'>contact</NavLink> */}
      </Flex>
    </Flex>
  </Container>
)

export default Navbar
