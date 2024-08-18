// import React, { useEffect, useState } from 'react'
// import "./theme.css"
// const DarkMode = () => {

//     const [theme, setTheme] = useState(localStorage.getItem('theme') || "light-theme")
//     useEffect(()=>{
//         const themColor =localStorage.getItem('theme')
//         document.body.className = themColor
//     }, [theme])

//     const toggleTheme = ()=>{
//         // alert('hii')

//         if(theme === 'dark-theme'){
//             setTheme('light-theme ')
//             const newTheme = 'light-theme'
//             localStorage.setItem('theme', newTheme)
//         }else{
//             setTheme('dark-theme')
//             const newTheme = 'dark-theme'
//             localStorage.setItem('theme', newTheme)
//         }
//     }

//   return (
//    <main>
//     <section>
//         <div className='container grid grid-two-coloumn'>
//             <div className='hero-section-data'>
//                 <h1>React Dark Mode</h1>
//                 <p>
//                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum optio consequuntur totam debitis dolores distinctio maxime,
//                     reiciendis reprehenderit dolorum omnis quas non nesciunt iusto aliquid quam quia necessitatibus voluptas ipsum?
//                 </p>
//                 <a href='#' className='btn' onClick={()=> toggleTheme()}>
//                     Toggle Mode
//                 </a>
//             </div>
//             <div className='hero-section-image'>
//                 <img
//                 src=''
//                 alt='lady image' />
//             </div>
//         </div>
//     </section>
//    </main>
//   )
// }

// export default DarkMode
import React, { useEffect, useState } from "react";
import "./app.css";
import "./switcher.css";
const DarkMode = () => {
  const [colorTheme, setColorTheme] = useState("theme-white");

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.body.style.backgroundColor = currentThemeColor;
    }
  }, [colorTheme]);

  const handleClick = async (theme) => {
    setColorTheme(theme);
    document.body.style.backgroundColor = theme;
    localStorage.setItem("theme-color", theme);
    window.location.reload();
  };

  return (
    <>
      <div className={`App ${colorTheme}`}>
        <div className="theme-options">
          <div
            id="theme-white"
            onClick={() => handleClick("theme-white")}
            className={`${colorTheme === "theme-white" ? "active" : ""}`}
          />
          <div
            id="theme-blue"
            onClick={() => handleClick("theme-blue")}
            className={`${colorTheme === "theme-blue" ? "active" : ""}`}
          />
          <div
            id="theme-orange"
            onClick={() => handleClick("theme-orange")}
            className={`${colorTheme === "theme-orange" ? "active" : ""}`}
          />
          <div
            id="theme-purple"
            onClick={() => handleClick("theme-purple")}
            className={`${colorTheme === "theme-purple" ? "active" : ""}`}
          />
          <div
            id="theme-green"
            onClick={() => handleClick("theme-green")}
            className={`${colorTheme === "theme-green" ? "active" : ""}`}
          />
          <div
            id="theme-black"
            onClick={() => handleClick("theme-black")}
            cclassName={`${colorTheme === "theme-black" ? "active" : ""}`}
          />
        </div>
        <div className="content-box">
          <h3>Multiple theme Switcher/ React</h3>
          <h5>Reactjs</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
            facere earum adipisci assumenda odio odit ut pariatur minima quia
            voluptate, autem nihil similique, error aperiam vitae quae officia
            perferendis nulla praesentium? Asperiores, corrupti ab?
          </p>
        </div>
      </div>
    </>
  );
};
export default DarkMode;
