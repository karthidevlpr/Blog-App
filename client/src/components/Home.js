import {Container, Grow} from '@mui/material';

import {Outlet} from 'react-router-dom'

import TopBar from './TopBar';

const Home = () => {
  return (
      <>
        <TopBar></TopBar>
        <Container maxWidth='xl' style={{marginTop: '0%'}}>
          <Grow in>
            <Container>
              <Outlet/>
            </Container>
          </Grow>
        </Container>
      </>
  )
}

export default Home