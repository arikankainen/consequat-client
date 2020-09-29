import React from 'react';
import * as Styled from './style';

const About = () => {
  return (
    <Styled.Container>
      <Styled.TextBlock>
        <Styled.H1>What is Consequat?</Styled.H1>

        <Styled.H2>Course project</Styled.H2>
        <Styled.P>
          This is my course project for{' '}
          <Styled.Link href="https://courses.helsinki.fi/fi/aytkt21010">
            Full Stack Web Development
          </Styled.Link>{' '}
          at Avoin Yliopisto. That said, there is no guarantee for this
          application being the most secure or stable. Anything can get broken,
          so do not upload anything you don&apos;t want public viewers to see.
          Also, do not use the same password that you are using in other
          services. Aside of that, this application will be taken offline at
          some point of time, so consider this as a test application.{' '}
        </Styled.P>

        <Styled.H2>Purpose</Styled.H2>
        <Styled.P>
          Consequat is an application for people to share their photos. You can
          upload your photos, add information about them, and arrange them to
          albums. All photos are viewable by others, unless you mark photo to be
          hidden from public gallery. You can also add comments to photos you
          browse.
        </Styled.P>

        <Styled.H2>Registration</Styled.H2>
        <Styled.P>
          You must register before you can upload your photos. You are asked to
          enter your username (login name), full name, email and password. This
          application is not collecting any other information about you or your
          system. No cookies will be used.
        </Styled.P>

        <Styled.Warning>
          You will use this application at your own risk!
        </Styled.Warning>
      </Styled.TextBlock>
    </Styled.Container>
  );
};

export default About;
