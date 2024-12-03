import React from 'react'
import style from '../estilos/Home.module.css';
import img1 from './imagenes/close-up-manicurist-holding-nail-tool.jpg'
import img2 from './imagenes/close-up-manicurist-using-nail-polish.jpg'
import img3 from './imagenes/soft-gentle-photo-woman-hand-with-big-ring-red-manicure-hold-cute-little-pink-dried-flowers-white.jpg'
type Props = {}

const Home = () => {
  return (
    <div className={style.contGeneral}>
      <h1 className={style.titulo}>NAILS SYSTEM</h1>
      <div className={style.contImg}>
          <img src={img1} alt="1" />
          <img src={img2} alt="2" />
          <img src={img3} alt="3" />
      </div>
    </div>
  )
}

export default Home