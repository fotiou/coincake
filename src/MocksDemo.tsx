import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setByApi } from './coinSlice';

const MocksDemo = () => {
  const dispatch = useDispatch();

  const getCoins = async () => {
    const response = await axios.get("/assets");
    dispatch(setByApi(response.data));
  };

  useEffect(() => {
    getCoins();
  }, []);

  return <></>;
};

export default MocksDemo;
