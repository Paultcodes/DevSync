import PicA from '../../images/alphabet/a.png';


const moduleName = 'myModule';
import(`./${moduleName}`).then(module => {
  // use the imported module here
}).catch(error => {
  // handle errors here
});

export const pics = {
  a: PicA,
};
