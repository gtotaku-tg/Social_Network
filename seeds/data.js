

const username = [
    'techGeek123',
    'codingNinja',
    'webMaster42',
    'dataWhiz',
    'cyberGuru',
    'digitalNomad7',
    'infoTechWizard',
    'codeWizardry',
    'netSurfer99',
    'webDevPro',
  ];
  

 // Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomName = () =>
  `${getRandomArrItem(username)}`;

// Export the functions for use in seed.js
export default { getRandomName };
