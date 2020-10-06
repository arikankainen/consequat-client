import React from 'react';
import * as Styled from './style';
import { ReactComponent as CopyrightIcon } from 'images/copyright-solid.svg';
import { ReactComponent as AwesomeIcon } from 'images/font-awesome-flag-brands.svg';
import { ReactComponent as ConsequatIcon } from 'images/consequat_o.svg';

const Footer = () => {
  return (
    <Styled.FooterContainer>
      <Styled.GridContainer>
        <Styled.GridLeft>
          <Styled.Section>
            <Styled.H1>
              <ConsequatIcon />
              Consequat
            </Styled.H1>

            <Styled.P>
              This is my course project for{' '}
              <Styled.Link href="https://courses.helsinki.fi/fi/aytkt21010">
                Full Stack Web Development
              </Styled.Link>{' '}
              at Avoin Yliopisto. Please read more information in{' '}
              <Styled.Link href="/about">About</Styled.Link> page, before using
              this application.
            </Styled.P>

            <Styled.P>
              <Styled.Link href="https://arik.fi/consequat">
                https://arik.fi/consequat
              </Styled.Link>
            </Styled.P>
          </Styled.Section>

          <Styled.Section>
            <Styled.H1>
              <AwesomeIcon />
              <Styled.Link href="https://fontawesome.com">
                Font Awesome
              </Styled.Link>
            </Styled.H1>

            <Styled.P>
              This app is using awesome free icons from{' '}
              <Styled.Link href="https://fontawesome.com">
                Font Awesome
              </Styled.Link>
              . Some of the icons have been slightly modified (for example, the
              lock icon&apos;s height have been adjusted to match the unlock
              icon).{' '}
            </Styled.P>

            <Styled.P>
              <Styled.Link href="https://fontawesome.com/license">
                https://fontawesome.com/license
              </Styled.Link>
            </Styled.P>
          </Styled.Section>

          <Styled.Section>
            <Styled.H1>
              <CopyrightIcon />
              Copyright
            </Styled.H1>

            <Styled.P>
              Consequat app, all code (except external libraries), Consequat
              logo, shutter icon and background photography.
            </Styled.P>
            <Styled.P>Copyright &copy; Ari Kankainen 2020</Styled.P>
            <Styled.P>
              <Styled.Link href="https://arik.fi">https://arik.fi</Styled.Link>
            </Styled.P>
          </Styled.Section>
        </Styled.GridLeft>
        <Styled.GridRight>
          <Styled.Section>
            <Styled.Line />
            <Styled.H1>Application</Styled.H1>
            <Styled.BlockP>
              <Styled.ListLink href="/">Starting point</Styled.ListLink>
              <Styled.ListLink href="/photos">Browse photos</Styled.ListLink>
              <Styled.ListLink href="/about">About</Styled.ListLink>
            </Styled.BlockP>
          </Styled.Section>

          <Styled.Section>
            <Styled.H1>Join Consequat</Styled.H1>
            <Styled.BlockP>
              <Styled.ListLink href="/signup">Sign up</Styled.ListLink>
              <Styled.ListLink href="/login">Log in</Styled.ListLink>
            </Styled.BlockP>
          </Styled.Section>

          <Styled.Section>
            <Styled.H1>User</Styled.H1>
            <Styled.BlockP>
              <Styled.ListLink href="/upload">Upload</Styled.ListLink>
              <Styled.ListLink href="/myphotos">My photos</Styled.ListLink>
              <Styled.ListLink href="/account">Account</Styled.ListLink>
            </Styled.BlockP>
          </Styled.Section>
        </Styled.GridRight>
      </Styled.GridContainer>
    </Styled.FooterContainer>
  );
};

export default Footer;
