import React, {useState, useEffect} from "react";

function Time(){
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Date();
      if (newDate.toDateString() !== currentDate.toDateString()) {
        setCurrentDate(newDate);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentDate]);
         
  ///////==========================================////
  //========== set time =========/////////
  /////========================================/////////
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1000ms (1 second)

    return () => clearInterval(interval); // Cleanup when the component unmounts
  });


    return(<>
    <input 
                    style={{ width: "29%", marginRight: "0px",fontWeight: "bold",  borderRadius: "10px", placeContent:"end", backgroundColor: 'transparent', }}
                      autoComplete="off"
                      value={`Date: ${currentDate.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}${` Time: ${currentTime.toLocaleTimeString()}`}`}
                      disabled/></>)
}
export default Time; 