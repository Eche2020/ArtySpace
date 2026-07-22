import React from 'react'
import Hero from './Hero';
import Category1 from "./Category1"
import Category2 from "./Category2";
import Category3 from "./Category3";
import Category4 from "./Cateogry4";
import FormPage from './FormPage';



export default function Home() {
  return (
    <>
      <Hero />
      <Category1 />
      <Category2 />
      <Category3 />
      <Category4 />
      <FormPage/>
    </>
  );
}
