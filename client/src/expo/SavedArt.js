// import { useState, useEffect } from 'react';
import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';


import { REMOVE_ART } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Auth from '../utils/auth';
import { removeArtId } from '../utils/localStorage';
import { QUERY_ME } from '../utils/queries';

const SavedArt = () => {
  const { loading, data} = useQuery( QUERY_ME )
  const [removeArt, {error}] = useMutation(REMOVE_ART)
  const userData = data?.me || {};  
  
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteArt = async (ArtId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const {data} = await removeArt({
        variables: { artId },
      });
      
      removeArtId(artId);
    } catch (err) {
      console.error(err);
    }
  };

  //Data loading
  if (!loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
        <h1>Viewing {userData.username}'s artwork!</h1>
        </Container>
      </Jumbotron>
      <Container>
      <h2>
          {userData.SavedArt?.length
            ? `Viewing ${userData.SavedArt.length} saved ${
                userData.SavedArt.length === 1 ? 'Artwork' : 'Artwork'
              }:`
            : 'No Saved Artist Artwork For Inspiration!'}
        </h2>
        <CardColumns>
          {userData.SavedArt?.map((art) => {
            return (
              <Card key={art.artId} border='dark'>
                {art.image ? <Card.Img src={art.image} alt={`The cover for ${art.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{art.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{art.description}</Card.Text>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeleteArt(Art.artId)}>
                    Delete the art!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
}

export default SavedArt;
