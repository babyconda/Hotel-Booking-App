import React, { useState } from 'react'
import HashLoader from "react-spinners/HashLoader";

export default function PageLoader({loading, setLoading}) {
   const override = {
    display: "block",
    margin: "180px auto", 
    };

  return (
    <HashLoader
        color={"#FD5B61"}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
    />
  )
}
