import React from "react";
import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";
import { gql } from "apollo-boost";
// import styled from "styled-components";

// const P = styled.p`
//   text-decoration: underline;
// `;
// const H2 = styled.h2`
//   font-weight: normal;
// `;

export const query = gql`
  fragment basicAddress on Address {
    __typename
    streetName
    houseNumberFull
  }
  query zipcode($streetName: String!, $houseNumberFull: String!) {
    findAddress(streetName: $streetName, houseNumberFull: $houseNumberFull) {
      exactMatch {
        ...basicAddress
        postalCode
      }
      matches {
        ...basicAddress
      }
    }
  }
`;

const Checker = () => {
  const { loading, error, data } = useQuery(query, {
    variables: {
      streetName: "Nieuwe uilenburgerstraat",
      houseNumberFull: "20",
    },
  });
  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Error! {JSON.stringify(error)}</p>;
  }

  return (
    <>
      {/* <H2>Result!</H2>
      <P>{JSON.stringify(data)}</P> */}
      <h2>Result!</h2>
      <p>{JSON.stringify(data)}</p>
    </>
  );
};

export default Checker;
