'use client';
import styles from './style.module.css';
import { useRef } from 'react'; 

export default function MouseScale({projects, reversed}) {

    const firstImage = useRef(null);
    const secondImage = useRef(null);
    let requestAnimationFrameId = null;
    let xPercent = reversed ? 100 : 0;
    let currentXPercent = reversed ? 100 : 0;
    const speed = 0.15;
    
    const manageMouseMove = (e) => {
        const { clientX } = e;
        xPercent = (clientX / window.innerWidth) * 100;
        
        if(!requestAnimationFrameId){
            requestAnimationFrameId = window.requestAnimationFrame(animate);
        }
    }

    const animate = () => {
        //Add easing to the animation
        const xPercentDelta = xPercent - currentXPercent;
        currentXPercent = currentXPercent + (xPercentDelta * speed)
        
        //Change width of images between 33.33% and 66.66% based on cursor
        const firstImagePercent = 66.66 - (currentXPercent * 0.33);
        const secondImagePercent = 33.33 + (currentXPercent * 0.33);
        console.log(secondImagePercent)
        firstImage.current.style.width = `${firstImagePercent}%`
        secondImage.current.style.width = `${secondImagePercent}%`
        
        if(Math.round(xPercent) == Math.round(currentXPercent)){
            window.cancelAnimationFrame(requestAnimationFrameId);
            requestAnimationFrameId = null;
        }
        else{
            window.requestAnimationFrame(animate)
        }
    }

    return(
      <div onMouseMove={(e) => {manageMouseMove(e)}} className={styles.double}>
  
        <div ref={firstImage} className={styles.imageContainer}>
          <div className={styles.stretchyWrapper}>
            <img
              src={`${projects[0].src}`}
              className='object-fill'
              alt={"image"}
            />
          </div>
          <div className={styles.body}>
              <h3>{projects[0].name}</h3>
              <p>{projects[0].description}</p>
              <button className='bg-red-500 md:w-32 p-1 w-24 md:p-2 rounded-full m-2 md:text-sm text-xs text-white'>View Project</button>
          </div>
        </div>
  
        <div ref={secondImage} className={styles.imageContainer}>
          <div className={styles.stretchyWrapper}>
            <img
              src={`${projects[1].src}`}
              className='object-fill'
              alt={"image"}
            />
          </div>
          <div className={styles.body}>
              <h3>{projects[1].name}</h3>
              <p>{projects[1].description}</p>
              <button className='bg-red-500 md:w-32 rounded-full p-1 w-24 md:p-2 m-2 text-white md:text-sm text-xs'>View Project</button>
          </div>
        </div>
  
      </div>
    )
  }