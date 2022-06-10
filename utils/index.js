import { lowerCase } from "lodash";

export const getAvatar = (name) =>
  `https://avatars.dicebear.com/api/miniavs/${name}.svg`;

export const getFlag = (code) => `https://flagcdn.com/${lowerCase(code)}.svg`;

export const getWeatherIcon = (iconId) =>
  `http://openweathermap.org/img/w/${iconId}.png`;
