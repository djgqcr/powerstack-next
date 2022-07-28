
import { styled } from '../../styles/stitches.config'
import { BlockmaticIcon, GhLoginIcon, GlobeIcon } from '../../icons'
import { Container } from './Container'
import { Button } from '../base/Button'

  const linkStyles = {
    color: '$text',
    ml: '$small',
    textDecoration: 'none',
    transition: 'color 0.4s',
    '&:hover': {
      color: '$primary-400',
    },
  }

  const NavBar = styled('div', {
    display: 'flex',
    backdropFilter: 'saturate(180%) blur(10px)',
    position: 'sticky',
    py: '$regular',
    top: 0,
    width: '100%',
    zIndex: 1000,
    '@small': {
      py: '$regular',
    },
  })

  const AnchorItem = styled('a', {
    ...linkStyles,
    ml: '$large',
    size: '$iconSmall',
    '& svg': {
      size: '$iconSmall',
    },
  })

  const VisuallyHidden = styled('h2', {
    position: 'absolute',
    clip: 'rect(1px, 1px, 1px, 1px)',
    overflow: 'hidden',
    height: '1px',
    width: '1px',
    wordWrap: 'normal',
  })

  const Logo = styled(BlockmaticIcon, {
    height: '21px',
    width: 'max-content',
    '@small': {
      height: '36px',
    },
  })

  const NavContainer = styled(Container, {
    px: '$small',
    '@small': {
      px: '$small',
    },
  })

  const LoginButton = styled(Button, {
    ml: '$large',
    maxWidth: '200px',
    width: '100%',
  })

  const LanguageButton = styled('button', {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    size: '$iconSmall',
    p: 0,
    svg: {
      size: '$iconSmall',
      path: {
        transition: 'stroke 0.4s',
      },
    },
    '&:hover': {
      path: {
        stroke: '$primary',
      },
    },
  })

// TODO: rename these components

const Flex1 = styled('div',{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})
const Flex2 = styled('div',{
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
  alignItems:'center'
})
const Flex3 = styled('div',{
  display: 'flex'
})

export const Header = () => (
    <NavBar>
      <NavContainer>
        <Flex1>
          <Logo />
          <Flex2
            as="nav"
            role="navigation"
            aria-labelledby="main-nav-title"
          >
            <VisuallyHidden>Main navigation</VisuallyHidden>
            <LanguageButton type="button" aria-label="Language Switcher Icon">
              <GlobeIcon />
            </LanguageButton>
            <AnchorItem
              aria-label="Go to Powerstack Template"
              href="https://github.com/blockmatic/powerstack-remix"
            >
              <GhLoginIcon />
            </AnchorItem>
            <LoginButton onClick={() => console.log("I'm dummy, gimme power!")} variant="primary">
              Login
            </LoginButton>
          </Flex2>
        </Flex1>
      </NavContainer>
    </NavBar>
  )

