import { WeatherData } from "../extra/Api";

const CityCard:React.FC<{city:WeatherData, className?:string}> = ({city, className}) => {
    return(
        <div className="bg-card-bg-4 rounded-[20px] px-2 py-6 transition-shadow duration-100 ease-in-out hover:shadow-city-card-hover">
            <h2 className="font-bold text-[40px] leading-[65px]">
                {city.name}, {city.sys.country}
            </h2>
            <img 
                className="mx-auto max-w-[150px] min-h-[150px] "
                src={`https://openweathermap.org/img/wn/${city?.weather[0].icon}@2x.png`}
                alt={city.weather[0].description} />
            <p className="font-extralight text-[42px] md-6">{city.main.temp}C</p>
            <div className="flex mb-6">
                <div className="flex flex-col justify-between mx-auto gap-2">
                    <div className="flex gap-3">
                         <img className="max-w-[30px] object-contain" src="/images/humidity.png" alt="humidity"/>
                         <div className="text-left">
                            <p className="text-[18px] ">{city.main.humidity}</p>
                            <p className="text-[12px]">Humidity</p>
                         </div>
                    </div>
                    <div className="flex gap-3">
                         <img className="max-w-[30px] object-contain" src="/images/sea.jpg" alt="humidity"/>
                         <div className="text-left">
                            <p className="text-[18px]">{city.main.sea_level}hPa</p>
                            <p className="text-[12px]">Sea Level</p>
                         </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between mx-auto gap-2">
                    <div className="flex gap-3">
                         <img className="max-w-[30px] object-contain" src="/images/wind.jpg" alt="humidity"/>
                         <div className="text-left">
                            <p className="text-[18px]">{city.wind_speed}</p>
                            <p className="text-[12px]">Wind Speed</p>
                         </div>
                    </div>
                    <div className="flex gap-3">
                         <img className="max-w-[30px] object-contain" src="/images/feel.jpg" alt="humidity"/>
                         <div className="text-left">
                            <p className="text-[18px]">{city.main.feels_like}</p>
                            <p className="text-[12px]">Feels Like</p>
                         </div>
                    </div>
                </div>
                
            </div>
            <p className="font-extralight capitalize">Summary: {city.weather[0].description}</p>
        </div>
    );

}

// <ul key={index} onClick={()=>handleCityClick(city)}>
//             <li>Name - {city.name}</li>
//             <li>Feels Like - {city?.main.feels_like}</li>
//             <li>Humidity - {city?.main.humidity}</li>
//             <li>Country - {city?.sys.country}</li>
//             <li>Icon - {city?.weather[0].icon}</li>
//             <img src={`https://openweathermap.org/img/wn/${city?.weather[0].icon}@2x.png`} alt=''/>
//           </ul> 
export default CityCard;