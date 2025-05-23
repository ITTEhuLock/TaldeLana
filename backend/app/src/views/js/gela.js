import {API_URL} from './konstanteak.js';

export const getGelak = async () => {  
    try {
        const response = await fetch(`${API_URL}/gela`);
        if (response.ok) {
        const data = await response.json();
        return data[0];
        }
        return false;
    }
    catch{
        console.log(error);
    }
};

export const getGela = async (idGela) => {
    try{
        const response = await fetch(`${API_URL}/gela/${idGela}`);
    
    if (response.ok) {
        const data = await response.json();
        return data[0];
        }
        return false;
    } catch (error) {
        console.error('errorea ', error);
        return false;
    }
};

export const getKoordenatuak = async () => {
    try {
        const response = await fetch(`${API_URL}/gela/lortu/koordenatuak`);
        if (response.ok) {
            const data = await response.json();
            return data[0];
        }
        return false;
    } catch (error) {
        console.error('errorea ', error);
        return false;
    }
};

export async function createNewGela (data){
    try{
        const response = await fetch(`${API_URL}/gela/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            
            return true;
        }
  
    }
    catch(error){
        console.error('errorea ', error);
    }
}

export async function getWalkableSpots() {
    try {
        const response = await fetch(`${API_URL}/gela/lortu/mapa`);
        if (response.ok) {
            const data = await response.json();
            return data.mapa;
        }
        return false;
    } catch (error) {
        console.error('errorea ', error);
        return false;
    }
}