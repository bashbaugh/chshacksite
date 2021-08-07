import { Box, Container, Flex, Image } from 'theme-ui'
import NLink from 'next/link'

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
          <Image
            sx={{ width: 140 }}
            src="/flag-orpheus-top.svg"
            alt="Hack Club logo"
            draggable={false}
          />
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
      ></Flex>
    </Flex>
  </Container>
)

export default Navbar
