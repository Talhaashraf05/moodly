import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Main(props) {
  const { children } = props;
  return (
    <main className=" flex-1 flex flex-col p-4 sm:p-8  ">
      {children}
      <ToastContainer />
    </main>
  );
}
