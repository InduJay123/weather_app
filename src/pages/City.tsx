import { Link, useLocation, useSearchParams } from "react-router";
import CityCard from "../components/CityCard";
import { CityData, getCityForecast, getWeatheByCoord, WeatherData } from "../extra/Api";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import loadingAnimation from "../animation/loading2.json"; 
import { useEffect } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Mousewheel} from "swiper/modules"

const City:React.FC = () =>{

    const [searchParams] = useSearchParams();
    const lon = searchParams.get('lon') || '';
    const lat = searchParams.get('lat') || '';
    console.log(lon,lat);

    const location = useLocation();
    const {city} = (location.state || {}) as {city:WeatherData};

    const {data: newCity, isLoading, error} = useQuery({
        queryKey: ['wetherByCoord', lat + lon],
        queryFn: () => getWeatheByCoord(lat,lon),
        enabled: !city
    });

    const {data: cityForecast, isLoading: isForecastLoading, error: forecastError} = useQuery({
        queryKey: ['forecastByCoord', lat + lon],
        queryFn: () => getCityForecast(lat,lon),
        
    });

    useEffect(() => {
        //getCityForecast(lat,lon);
    },[])

    return(
        
        <div className="mt-[20px]">
            {isLoading && 
                <div className='absolute w-full h-full backdrop-blur-md top-0 left-0 flex'>
                    <Lottie animationData={loadingAnimation}  loop={true} className="m-auto max-w-20" />
                </div>
            } 

            <div className='min-h-20 flex'>
                {error  && 
                    <>
                        <p className='m-auto text-[#EF5350]'>Something went wrong, Please try again with correct value !</p>
                        <Link to={'/'} className="px-3 py-2 rounded-lg bg-green-400 text-black m-auto mt-4"><button className="">Home</button></Link>
                    </>
                }
            </div>
        
            {city && <CityCard city={city} className="text-center mb-8 max-w-[60%] mx-12"/>}
            {!city && newCity && <CityCard city={newCity} className="text-center mb-8 max-w-[60%] mx-12"/>}

            <div className="weather-slider">
                <Swiper 
                modules={[]}
                spaceBetween={20}
                slidesPerView={10}
                pagination={{
                    clickable:true,
                }}
                mousewheel = {true}
                >
                {cityForecast?.map((city:CityData, index:number) => {
                    const date = new Date(city.dt*1000);
                    const dayName = date.toLocaleDateString('en-US', {weekday:'short'});
                    const formattedTime = date.toLocaleTimeString('en-US',
                        {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true
                        }
                    )

                    return(
                        <SwiperSlide>
                        <div key={index} className="bg-card-bg-4 rounded-[20px] px-2 py-6 transition-shadow duration-100 ease-in-out hover:shadow-city-card-hover text-center cursor-pointer">
                            <p>{city.main.temp}</p>
                            <img 
                            className="mx-auto w-[100px] min-h-[100px]" 
                            src={`https://openweathermap.org/img/wn/${city?.weather[0].icon}@2x.png`}
                            alt={city.weather[0].description}  />
                            <p>{dayName}</p>
                            <p>{formattedTime}</p>
                        </div>
                        </SwiperSlide>
                    )
                })}
                </Swiper>
            </div>
       
        </div>
    )
};

export default City;