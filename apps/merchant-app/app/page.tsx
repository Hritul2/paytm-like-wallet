"use client";
import React from "react";
import { useBalance } from "@repo/store/balance";
const Home = () => {
  const balance = useBalance();
  return <div>{balance}</div>;
};

export default Home;
