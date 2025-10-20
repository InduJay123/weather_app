export interface WeatherData{
  id:number;
  name: string;
  main:{
    temp:number;
    feels_like:number;
    humidity: number;
    sea_level:number;
  };
  wind_speed:number;
  coord:{
    lat:number;
    lon:number;

  }
  sys:{
    country: string;
  };
  weather:
    {
      id:number;
      main:string;
      description:string;
      icon:string;
    }[];
};

export interface CityData {
  main:{
    temp:number;
    feels_like:number;
    humidity: number;
    sea_level:number;
  };
  dt:number;
  wind:{
    speed:number;
  };
   weather:
    {
      id:number;
      main:string;
      description:string;
      icon:string;
    }[];
}

const cityIds = ["1248991", "1850147", "2643743","1246294","2644210","2147714"]; 

export const fetchWeather = async () => {
    const results = await Promise.all(
      cityIds.map(id =>
        fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=2dd7c5fbd257bcbb60593f82454a3a5a&units=metric`)
          .then(res => res.json())
      )
    );
    console.log(results); 
    return results;
}

    // const testApi = async () => {
  //   const response = await fetch(`https://api.openweathermap.org/data/2.5/group?id=1248991,1850147,2643743&appid=dc48b794302d9967b2ef12441432acc8`);
    
  //   if(!response.ok){
  //     throw new Error('Failed to fetch data');
  //   }
    
  //   const data = await response.json();
  //   console.log(data.list);
  //   //setCity(data);
  //   return data.list;

  // }

export const getCityByName = async (cityName:string): Promise<WeatherData> => {
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2dd7c5fbd257bcbb60593f82454a3a5a&units=metric`);
    if(!response.ok){
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log(data); 
    return data;
}

export const getWeatheByCoord = async (lat: string, lon:string): Promise<WeatherData> => {
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2dd7c5fbd257bcbb60593f82454a3a5a&units=metric`);
    if(!response.ok){
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log(data); 
    return data;
}

export const getCityForecast = async (lat: string, lon:string): Promise<CityData[]> => {
    const response= await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=2dd7c5fbd257bcbb60593f82454a3a5a&units=metric`);
    if(!response.ok){
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log(data.list); 
    return data.list;
}