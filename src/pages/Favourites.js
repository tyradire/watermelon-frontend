import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Empty from '../components/Empty/Empty';
import FavouriteList from '../components/FavouriteList';
import VendorBar from '../components/VendorBar';
import { Context } from '../index';

const Favourites = observer(() => {

  const {user} = useContext(Context);

  return (
    <Container>
      <Row className='mt-3'>
        <Col md={3} className='mt-2'>
          <VendorBar />
        </Col>
        <Col md={9}>
          { user.likes.length > 0
            ? <FavouriteList /> 
            : <Empty location={'избранном'} />
          }
        </Col>
      </Row>
    </Container>
)});

export default Favourites;