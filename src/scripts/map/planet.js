import system from '../utils/system.js';

const {
  readFile
} = system

const planetNames = readFile("https://raw.githubusercontent.com/Lazzaro83/Solar-System/master/planets.json", "planets");


export default {
    planetNames
};