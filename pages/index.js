import Head from "next/head";
import CountClick from "@/components/CountClick";
import Complete from "@/components/Complete";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VisItem from '@/components/VisItem';
import Button from 'react-bootstrap/Button';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  function ifOccurTwice(list, num) {
    let count = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === num) {
        count++;
        if (count === 2) {
          return true;
        }
      }
    }
    return false;
  }

  const [list, setList] = useState([]);
  const [visibilities, setVisibilities] = useState(Array(18).fill(false));
  const [count, setCount] = useState(0);
  const [toggleModal, setToggleModal] = useState(false);

  const [indexesFound, setIndexesFound] = useState([]);

  useEffect(() => {
    const tempList = [];
    while (tempList.length < 18) {
      let rdm = Math.floor(Math.random() * 9) + 1;
      if (!ifOccurTwice(tempList, rdm)) {
        tempList.push(rdm);
      }
    }
    setList(tempList);
  }, []);

  function buttonClick() {
    const tempList = [];
    while (tempList.length < 18) {
      let rdm = Math.floor(Math.random() * 9) + 1;
      if (!ifOccurTwice(tempList, rdm)) {
        tempList.push(rdm);
      }
    }
    setList(tempList);
    setVisibilities(Array(18).fill(false));
    setCount(0);
    setToggleModal(false);
  
    setIndexesFound([]);
  }

  function cardClick(index) {
    setVisibilities((prevVisibilities) =>
      prevVisibilities.map((vis, key) => {
        if (key === index) {
          return !vis;  // Toggle visibility
        } else {
          return vis;  // Keep current visibility state
        }
      })
    );
    setCount((prevCount) => prevCount + 1);
    // Compare any visible card with the current one
    setTimeout(() => {
    for (let i = 0; i < visibilities.length; i++) {

      // if the two showing cards not match
      if (i !== index && visibilities[i] === true && !indexesFound.includes(i) && list[index] !== list[i]) {

          // Flip cards back to invisible
          setVisibilities((prevVisibilities) =>

            prevVisibilities.map((vis, key) => {

              if (key === index || key === i) {

                return !vis;  // Toggle visibility

              } else {

                return vis;  // Keep current visibility state
              }
            })
          );
      }
      // if two cards matched
      else if (i != index && !indexesFound.includes(i) && !indexesFound.includes(index) && visibilities[i] === true && list[index] === list[i]) {

        // Append the matched indexes if not included in the indexesFound array.
        setIndexesFound((prevIndexesFound) => {
          let tempIndexes = [...prevIndexesFound];
          if (!tempIndexes.includes(i)) tempIndexes.push(i);
          if (!tempIndexes.includes(index)) tempIndexes.push(index);
          return tempIndexes;
        });
      }
  }
}, 500);
}
useEffect(() => {
  if (indexesFound.length === visibilities.length) {
    setToggleModal(true);
  }
}, [indexesFound, visibilities.length])
  

  return (
    <>
      <Head>
        <title>Memory Fun</title>
        <meta name="Memory Game" content="Testing your memory" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div   
      style={{
        backgroundImage: `url("/background.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
>
        <div className="d-flex justify-content-center" style={{ marginTop: '50px' }}>
          <Button variant="outline-success" onClick={buttonClick} className="fw-bold fs-5">Restart</Button>
        </div>
        <main className={`${styles.main} ${inter.className}`}>
          <div style={{ marginTop: '30px' }}> 
            <CountClick count={count}/>
          </div>
          <Container style={{ marginTop: '50px' }}>
            <Row>
              {list.map((number, index) => (
                <Col key={index} xs={6} sm={4} md={3} lg={2}>
                  <div onClick={() => cardClick(index)}>
                    <VisItem vis={visibilities[index]} num={number}/>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
          {toggleModal && <Complete count={count}/>}
        </main>
      </div>
    </>
  );
}
