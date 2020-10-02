import React from 'react';
import * as Styled from './style';
import { ReactComponent as CourseIcon } from '../../images/graduation-cap-solid.svg';
import { ReactComponent as PurposeIcon } from '../../images/cubes-solid.svg';
import { ReactComponent as RegistrationIcon } from '../../images/handshake-solid.svg';
import { ReactComponent as CodeIcon } from '../../images/code-solid.svg';

const About = () => {
  return (
    <Styled.Container>
      <Styled.H1>What is Consequat?</Styled.H1>

      <Styled.H2>
        <PurposeIcon />
        Purpose
      </Styled.H2>
      <Styled.P>
        Consequat is an application for people to share their photos. You can
        upload your photos, add information about them, and arrange them to
        albums. All photos are viewable by others, unless you mark photo to be
        hidden from public gallery. You can also add comments to photos you
        browse. Photos can be searched by name, location, description, tags, or
        combination of them. That&apos;s why it&apos;s important to add
        meaningful information about your photo, so that it can be more easily
        found by searching.
      </Styled.P>

      <Styled.H2>
        <RegistrationIcon />
        Registration
      </Styled.H2>
      <Styled.P>
        You must register to Consequat before you can upload your photos. You
        are asked to enter your username (login name), full name, email and
        password. This application is not collecting any other information about
        you or your system. Other users cannot see your email address. No
        cookies will be used.
      </Styled.P>

      <Styled.H2>
        <CourseIcon />
        Course project
      </Styled.H2>
      <Styled.P>
        This is my course project for{' '}
        <Styled.Link href="https://courses.helsinki.fi/fi/aytkt21010">
          Full Stack Web Development
        </Styled.Link>{' '}
        at Avoin Yliopisto. That said, there is no guarantee for this
        application being the most secure or stable. Anything can get broken, so
        do not upload anything you don&apos;t want public viewers to see. Also,
        do not use the same password that you are using in other services. Aside
        of that, this application will be taken offline at some point of time,
        so consider this as a test application.{' '}
      </Styled.P>

      <Styled.H2>
        <CodeIcon />
        Code and libraries
      </Styled.H2>
      <Styled.P>
        This app has been coded using TypeScript, with the help of the following
        libraries in frontend:{' '}
        <Styled.Code>
          @apollo/client, @apollo/link-context, @apollo/link-ws,
          @testing-library/user-event, axios, firebase, formik, graphql, lodash,
          react, react-dom, react-lazy-load-image-component, react-redux,
          react-router-dom, react-scripts, react-transition-group, redux,
          redux-devtools-extension, redux-thunk, styled-components,
          subscriptions-transport-ws, typescript, uuid, yup
        </Styled.Code>
      </Styled.P>

      <Styled.P>
        Backend runs in node.js, with the following libraries:{' '}
        <Styled.Code>
          @graphql-tools/merge, apollo-server, apollo-server-express, bcrypt,
          cors, cross-env, dotenv, express, graphql, jsonwebtoken, mongoose,
          mongoose-unique-validator, ts-jest, ts-node, typescript, yup
        </Styled.Code>
      </Styled.P>

      <Styled.Warning>
        You will use this application at your own risk. App owner is not
        responsible to any data loss that can happen while using this app.
      </Styled.Warning>
    </Styled.Container>
  );
};

export default About;
