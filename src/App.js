import { useState } from "react"
import axios from 'axios'
import cloudy from './image/cloudy.png'
import clear from './image/sun.png'
import rain from './image/rain.png'
import mist from './image/mist.png'

function App(){
  const [city,setcity]=useState('')
  const [weather,setweather]=useState('')
  const [temp,settemp]=useState('')
  const [desc,setdesc]=useState('')
  const [cname,setcname]=useState('')
  const [imgdata,setimgdata]=useState('')

  const weatherchange=(evt)=>{
    setcity(evt.target.value)
  }
  function getweather(){
    const Weather=axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f5086fe8e82e4861549f2f9803dc8fea`);
    Weather.then(function(report){
      console.log(report.data);
      setweather(report.data.weather[0].main)
      settemp((report.data.main.temp-273.15).toFixed(2))
      setdesc(report.data.weather[0].description)
      setcname(report.data.name.toUpperCase())
      
      let imgpath;
      if(report.data.weather[0].main=="Clouds"){
        imgpath=cloudy
      }else if(report.data.weather[0].main=="Clear"){
        imgpath=clear
      }else if(report.data.weather[0].main=="Rain" && report.data.weather[0].main=="Drizzle"){
        imgpath=rain
      }else if(report.data.weather[0].main=="Mist"){
        imgpath=mist
      }else{
        imgpath=clear
      }
      setimgdata(imgpath)
    })
    setcity('')
  }
  return(
    <>
      <div className="max-w-sm shadow-xl rounded p-10 m-auto mt-10 bg-[#0B0C1E] text-white">
        <h2 className="font-bold text-xl mb-2 text-center">Weather App</h2>
        <div className="m-auto flex justify-center gap-4">
          <input type="text" className="rounded-full border py-1 px-2 text-black hover:outline-0" placeholder="enter your city" value={city} onChange={weatherchange} />
          <button className="bg-[#0095FF] px-2 py-1 rounded-full" onClick={getweather}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
</button>
        </div>
        <div className="mt-5">
          <h2 className="font-bold text-xl mb-2 text-center">{cname}</h2>
          {
            imgdata?(<img src={imgdata} alt="" className="size-20 mx-auto" />):(<img src={imgdata} alt="" className="size-20 mx-auto" style={{display:"none"}}  />)
          }
          <h3 className="text-center mt-5 text-2xl font-bold">{weather}</h3>
          
          {
            temp?(<h3 className="text-center mt-5 text-4xl font-bold">{temp} &#8451;</h3>):(<h3 className="text-center mt-5 text-4xl font-bold">{temp}</h3>)}
          <p className="text-center text-lg mt-5">{desc}</p>
          
        </div>
        {/* <div className="flex justify-between mt-5">
          <div>
            <h2 className="font-bold text-lg">Weather</h2>
            <p>{weather}</p>
          </div>
          <div>
            <h2 className="font-bold text-lg">Temprature</h2>
            <p>{temp}</p>
          </div>
          <div>
            <h2 className="font-bold text-lg">Description</h2>
            <p>{desc}</p>
          </div>
        </div> */}
      </div>
    </>
  )
}
export default App