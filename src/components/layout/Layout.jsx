import React from 'react'
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';


export default function Layout() {
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar/>

        <main className="grow">
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  );
}
