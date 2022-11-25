import classes from "../../assets/styles/home.module.scss";
import {  useEffect, useState } from "react";

export const HomeSlide = (slides) => {
    
    const [count, setCount] = useState(0);
    // specialData.map ((el, index) =>{
    //  setImage((f)=>[...f, el.images])
    // })
  
    useEffect(() => {
      const MyInterval = setTimeout(
        () => {
          if (count === slides.slides.length - 1) {
            setCount(0);
          } else {
            setCount((prev) => prev + 1);
          }
        },
  
        2000
      );
  
      return () => {
        clearTimeout(MyInterval);
      };
    }, [count]);
  return (
    <>
      <div
        className={classes.home_img}
        style={{ backgroundImage: `url(${slides.slides[count].images})` }}
      ></div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        {
          slides.slides.map((item, id)=>(
            <span key={id} style={{backgroundColor:"black", padding:"1px 0", width:"40px",  opacity: count === id ? "1": "0.3"}}></span>
          ))
        }
      </div>
    </>
  );
};
