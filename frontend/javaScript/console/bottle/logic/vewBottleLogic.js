import {url} from '../../../utils/variables.js';

export async function vewBottleLogic() {

    const token = localStorage.getItem('token');

    const response = await fetch(`${url}/api/bottle`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    const content = await response.json(); 
    return content.data.bottles;
};