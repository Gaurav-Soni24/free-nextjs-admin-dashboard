import React, { useState, useEffect } from 'react';
import { FaCity, FaWind, FaSmog, FaCloudMeatball, FaCloud, FaCloudSun, FaCloudRain, FaCloudMoon, FaCloudShowersHeavy } from 'react-icons/fa';
import data0 from './HistoricalAverageAirQualityDataOfMetropolitanCitiesData0.json';
import data6 from './HistoricalAverageAirQualityDataOfMetropolitanCitiesData6.json';
import data14 from './HistoricalAverageAirQualityDataOfMetropolitanCitiesData14.json';
import data29 from './HistoricalAverageAirQualityDataOfMetropolitanCitiesData29.json';

interface CityData {
  City: string;
  AQI: number;
  PM25: number;
  PM10: number;
  CO: number;
  OZONE: number;
  SO2: number;
  NO2: number;
  NH3: number;
}

const HistoricalAverageAirQualityDataOfMetropolitanCities: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>('Last Day');
  const [cityData, setCityData] = useState<CityData[]>([]);

  useEffect(() => {
    switch (selectedRange) {
      case 'Last Day':
        setCityData(data0);
        break;
      case 'Last Week':
        setCityData(data6);
        break;
      case 'Last 2 Weeks':
        setCityData(data14);
        break;
      case 'Last Month':
        setCityData(data29);
        break;
      default:
        setCityData(data0);
    }
  }, [selectedRange]);

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-[#4ade80]';
    if (aqi <= 100) return 'bg-[#facc15]';
    if (aqi <= 150) return 'bg-[#fb923c]';
    if (aqi <= 200) return 'bg-[#f87171]';
    if (aqi <= 300) return 'bg-[#7c3aed]';
    return 'bg-[#881337]';
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white flex items-center">
          <FaCity className="mr-2" />
          Historical Average Air Quality Data Of Metropolitan Cities
        </h4>
        <select
          className="bg-white dark:bg-boxdark border border-stroke dark:border-strokedark text-black dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5"
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
        >
          <option value="Last Day">Last Day</option>
          <option value="Last Week">Last Week</option>
          <option value="Last 2 Weeks">Last 2 Weeks</option>
          <option value="Last Month">Last Month</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-black dark:text-white">
          <thead className="text-xs uppercase bg-gray-2 dark:bg-meta-4">
            <tr>
              <th scope="col" className="py-4 px-4 font-medium"><FaCity className="inline mr-2" />City</th>
              <th scope="col" className="py-4 px-4 font-medium"><FaWind className="inline mr-2" />AQI</th>
              <th scope="col" className="py-4 px-4 font-medium"><FaSmog className="inline mr-2" />PM2.5</th>
              <th scope="col" className="py-4 px-4 font-medium"><FaCloudMeatball className="inline mr-2" />PM10</th>
              <th scope="col" className="py-4 px-4 font-medium"><FaCloud className="inline mr-2" />CO</th>
              <th scope="col" className="py-4 px-4 font-medium"><FaCloudSun className="inline mr-2" />OZONE</th>
              <th scope="col" className="py-4 px-4 font-medium"><FaCloudRain className="inline mr-2" />SO2</th>
              <th scope="col" className="py-4 px-4 font-medium"><FaCloudMoon className="inline mr-2" />NO2</th>
              <th scope="col" className="py-4 px-4 font-medium"><FaCloudShowersHeavy className="inline mr-2" />NH3</th>
            </tr>
          </thead>
          <tbody>
            {cityData.map((city, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-white dark:bg-boxdark' : 'bg-gray-2 dark:bg-meta-4'}`}>
                <td className="py-5 px-4 border-b border-[#eee] dark:border-strokedark">{city.City}</td>
                <td className={`py-5 px-4 border-b border-[#eee] dark:border-strokedark ${getAQIColor(city.AQI)} text-white font-medium rounded`}>{city.AQI}</td>
                <td className="py-5 px-4 border-b border-[#eee] dark:border-strokedark">{city.PM25}</td>
                <td className="py-5 px-4 border-b border-[#eee] dark:border-strokedark">{city.PM10}</td>
                <td className="py-5 px-4 border-b border-[#eee] dark:border-strokedark">{city.CO}</td>
                <td className="py-5 px-4 border-b border-[#eee] dark:border-strokedark">{city.OZONE}</td>
                <td className="py-5 px-4 border-b border-[#eee] dark:border-strokedark">{city.SO2}</td>
                <td className="py-5 px-4 border-b border-[#eee] dark:border-strokedark">{city.NO2}</td>
                <td className="py-5 px-4 border-b border-[#eee] dark:border-strokedark">{city.NH3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoricalAverageAirQualityDataOfMetropolitanCities;
