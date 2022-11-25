import { Data } from "../../components/data/productData";
import { forwardRef, useImperativeHandle, useRef } from "react";
import classes from "../../assets/styles/home.module.scss";
export const Target = forwardRef((props, ref) => {
  const div1 = useRef(null);
  const div2 = useRef(null);
  const div3 = useRef(null);
  const div4 = useRef(null);
  const div5 = useRef(null);
  const div6 = useRef(null);
  const div7 = useRef(null);
  useImperativeHandle(ref, () => ({
    div1,
    div2,
    div3,
    div4,
    div5,
    div6,
    div7,
  }));
  let homeData = [];
  Data.forEach((el) => {
    if (el.homepage === "yes") {
      homeData.push(el);
    }
  });
  const specialData = homeData.slice(-5);
  if (Data.length < 6) {
    specialData.shift();
  }

  return (
    <>
      <div ref={div1} className={classes.home_scrollImage}>
        <img
          src={specialData[0].images}
          
          alt="1"
        />
      </div>
      <div ref={div2} className={classes.home_scrollImage}>
        <img
          src={specialData[1].images}
       
          alt="2"
        />
      </div>
      <div ref={div3} className={classes.home_scrollImage3}>
        <img ref={div6}

          src={specialData[2].images}
          className={classes.home_scrollImage}
          alt="3"
        />
      </div>
      <div ref={div4} className={classes.home_scrollImage} >
        <img
          src={specialData[3].images}

          alt="4"
        />
      </div>
      <div ref={div5} className={classes.home_scrollImage}>
        <img
          src={specialData[4].images}
          
          alt="5"
        />
      </div>

      <div
          ref={div7}
          className={classes.home_div7}
          style={{

          }}
        >
          <div className={classes.home_div7_text3}> About collection</div>
          <div className={classes.home_div7_box}>
            <div className={classes.home_div7_box_text}>We collect beautiful classic men's design artifacts from the 20th & 21st century...</div>
            <div className={classes.home_div7_box_text}>We collect beautiful classic uniq clothes ever. Our collections all hand made.</div>
            <div  className={classes.home_div7_box_text} >We collect beautiful classic men's design artifacts from the 20th & 21st century. You can make your own lookbook with mepoaf.</div>
          </div>
          
        </div>
    </>
  );
});
