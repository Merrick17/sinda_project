import React from 'react'
import IMG0 from '../home/image/img0.jpg'
import IMG1 from '../home/image/img1.jpg'
import IMG2 from '../home/image/img3.jpg'
import S1 from '../home/image/s1.png'
import S2 from '../home/image/s2.png'
import S3 from '../home/image/s3.png'
import fa from '../home/image/facebook.svg'
import tw from '../home/image/twitter.svg'
import gi from '../home/image/github.svg'


import { Carousel, Container, Row } from 'react-bootstrap'
function Home() {
  return (
    <>

      <Carousel>

        <Carousel.Item>
          <img
            className="d-block w-100"
            alt="First slide"
            src={IMG1}

            width={171}
            height={450}
          />
          <Carousel.Caption>
            <div className="big-tagline" >

              <p> Votre avenir commence ici...</p>

            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={IMG0}

            width={171}
            height={450}
            alt="Second slide"
          />

          <Carousel.Caption>
            <div className="big-tagline" >
              <p>Des cours en ligne pour découvrir, apprendre, progresser et réussir</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={IMG2}

            width={171}
            height={450}
            alt="Third slide"
          />

          <Carousel.Caption>
            <div className="big-tagline" >

              <p>Votre parcours vers la réussite...</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>


      <Container>
        <Row className="section-title row text-center">
          <div className="col-md-8 offset-md-2">
            <h3>About</h3>
            <p className="lead">En ouvrant la salle de classe grâce à l'apprentissage en ligne, CapDev permet à des millions d'apprenants de libérer leur potentiel et de devenir des acteurs du changement.</p>
          </div>
        </Row>
      </Container>

      <Container>
        <Row className="section-title row text-center">
          <div className="col-md-6 col-lg-4 mx-auto">
            <div className="box">
              <div className="img-box">
                <img src={S3}
                  width={90}
                  height={90} alt="" />
              </div>
              <div className="detail-box">
                <h6>  Apprendre avec des enseignants de premier plan</h6>
                <p>
                  Regardez en streaming des vidéos à la demande auprès d’universités et d’entreprises de premier plan telles que Yale, Google, IBM et bien plus
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mx-auto">
            <div className="box">
              <div className="img-box">
                <img src={S2}
                  width={150}
                  height={100}
                  alt="" />
              </div>
              <div className="detail-box">
                <h6> Acquérir des compétences grâce à un apprentissage pratique</h6>
                <p>
                  Apprenez des compétences recherchées en science des données, conception, gestion de projet, marketing numérique, et plus encore, en moins de deux heures avec les Projets guidés

                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mx-auto">
            <div className="box">
              <div className="img-box">
                <img src={S1}
                  width={90}
                  height={90}
                  alt="" />
              </div>
              <div className="detail-box">
                <h6> Obtenez et partagez un certificat prestigieux</h6>
                <p>
                  Mettez en valeurs vos nouvelles capacités avec un certificat de cours, de Projet guidé ou un Certificat Professionnel.

                </p>
              </div>
            </div>
          </div>
        </Row>
      </Container>

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-xs-12">
              <div className="widget clearfix">
                <div className="widget-title">
                  <h3>About US</h3>
                </div>
                <p> Our mission is to provide a free, world-class education to anyone, anywhere.</p>
                <div className="footer-right">
                  <ul className="footer-links-soi">
                    <div className="widget-title">
                      <h3>Social Link</h3>
                    </div>
                    <li><a href="/#">
                      <img src={fa} alt="" width="30" /></a></li>
                    <li><a href="/#"><img src={tw} alt="" width="30" /></a></li>
                    <li><a href="/#"><img src={gi} alt="" width="30" /></a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-xs-12">
              <div className="widget clearfix">
                <div className="widget-title">
                  <h3>Information Link</h3>
                </div>
                <ul className="footer-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/formation">Formation</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-xs-12">
              <div className="widget clearfix">
                <div className="widget-title">
                  <h3>Contact Details</h3>
                </div>

                <ul className="footer-links">

                  <li><a href="/#">www.CapDev.com</a></li>
                  <li>sousse</li>
                  <li>96239313</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </footer>




    </>

  )
}

export default Home
