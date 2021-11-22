import system from '../utils/system.js';

const {
  readFile
} = system

const planetNames = readFile("/src/data/planets.json", "planets");


export default {
    planetNames
};