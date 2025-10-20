import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { fetchWeather, getCityByName, WeatherData } from '../extra/Api';
import Lottie from 'lottie-react';
import loadingAnimation from "../animation/loading2.json"; 
import CityCard from '../components/CityCard';

const Home:React.FC = () => {

  const [cityName,setCityName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const {data, isLoading, error} = useQuery<WeatherData[]>({
    queryKey: ['weather'],
    queryFn: fetchWeather,
  });

  const {data:searchedCity, isLoading:isCityLoading, error: searchError} = useQuery({
    queryKey: ['weatherByName',cityName],
    queryFn: () => {
      //setIsSearched(false);
      return getCityByName(cityName)},
    enabled: isSearched
  });

  const navigate = useNavigate();
  const handleCityClick = (city:WeatherData) =>{
      navigate(`/city?lon=${city.coord.lon}&lat=${city.coord.lat}`, { state: { city }});
  }

  const handleSearch =()=>{
    // console.log(cityName);
    // console.log(searchTerm);
    if(searchTerm !== ''){
      setCityName(searchTerm);
      setIsSearched(true);
    }else{
      alert('Please Enter a value!');
    }   
  }

  // if(isLoading || isCityLoading){
  //   return <h2>Loading...</h2>
  // }

  if(error || searchError){ 
    return <h2>Error..</h2>
  }

  const cityCount = data ? data.length : 0;
  const lastRow = cityCount % 3;
  
  return (
    <div className="max-w-[90%] md:max-w-[80%] m-auto text-center ">
      <div className='flex max-w-[300px] mx-auto rounded-xl overflow-hidden mt-[100px]'>
          <input type='text' name='city' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='text-black w-fluu px-2'/>
          <button onClick={handleSearch} className='p-2 bg-green-500 cursor-pointer'>Search</button>  
        </div> 

        {(isLoading || isCityLoading) && 
          <div className='absolute w-full h-full backdrop-blur-md top-0 left-0 flex'>
            <Lottie animationData={loadingAnimation}  loop={true} className="m-auto max-w-20" />
          </div>
        } 

        <div className='min-h-20 flex'>
          {(error || searchError) && <p className='m-auto text=[#EF5350]'>Something went wrong, Please try again with correct value !</p>}
        </div>

        <div className='grid grid-cols-6 md:gap-x-5 gap-6'>

        {!searchedCity && data?.map((city:WeatherData, index:number) => {
          
          let itemPosition = '';
          if(lastRow === 2 &&  index === cityCount -2){
            itemPosition = 'md:col-start-1 xl:col-start-2';
          }
          if(lastRow === 1 &&  index === cityCount -1){
            itemPosition = 'md:col-start-2 md:col-end-6 xl:col-start-3';
          }
          if(lastRow === 1){
            itemPosition = 'md:col-start-3 md:col-end-6';
          }

          return(   
           <div key={index} onClick={() => handleCityClick(city)} className={`col-span-6 md-col-span-3 xl:col-span-2 cursor-pointer ${itemPosition}`}>
              <CityCard city={city}/>
           </div>  
        )})}  

        {searchedCity &&          
            <div onClick={() => handleCityClick(searchedCity)} className='col-start-1 col-end-7 md:col-start-2 md:col-end-6 col-span-2 cursor-pointer'>
              <CityCard city={searchedCity}/>
           </div>
        }
        </div>
    </div>
  );
}

export default Home;
