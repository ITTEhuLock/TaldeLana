import { API_URL } from "./konstanteak.js";
export async function getErabiltzailearenErreserbak  (idUser) {
    const response = await fetch(`${API_URL}/erreserba/user/${idUser}`);
    if(response.ok){
        const data = await response.json();
        data.forEach(async (erreserba) => {
            const start_time = new Date(erreserba.start_time);
            start_time.setHours(start_time.getHours() + 2);
            const end_time = new Date(erreserba.end_time);
            end_time.setHours(end_time.getHours() + 2);
            erreserba.start_time = start_time.toISOString().slice(0, 19).replace('T', ' ');
            erreserba.end_time = end_time.toISOString().slice(0, 19).replace('T', ' ');
        });
        return data;
    }else{
        console.error('Errorea erreserbak lortzean');
    }

};


export async function getErreserba(idErreserba){
    const response = await fetch(`${API_URL}/erreserba/${idErreserba}`);
    if(response.ok){
        const data = await response.json();
        const start_time = new Date(data[0].start_time);
        start_time.setHours(start_time.getHours() + 2);
        const end_time = new Date(data[0].end_time);
        end_time.setHours(end_time.getHours() + 2);
        data[0].start_time = start_time.toISOString().slice(0, 19).replace('T', ' ');
        data[0].end_time = end_time.toISOString().slice(0, 19).replace('T', ' ');

        return data[0];
    }else{
        console.error('Errorea erreserbak lortzean');
    }
};
export async function deleteErreserba (idErreserba) {
    const response = await fetch(`${API_URL}/erreserba/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idErreserba })
    });
    if(response.ok){
        console.log('Erreserba ezabatua');
    }else{
        console.error('Errorea erreserba ezabatzean');
    }
}


export async function updateErreserba (erreserba) {
    
const availability = await checkAvailability(erreserba.start_time, erreserba.end_time, erreserba.idKutxatila);
    if(!availability)
        return false;

    const response = await fetch(`${API_URL}/erreserba/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(erreserba)
    });
    if(response.ok){
        console.log('Erreserba editatua');
    }else{
        console.error('Errorea erreserba editatzean');
    }
return true;
}

export async function createErreserba (erreserba)  {
   const availability = await checkAvailability(erreserba.start_time, erreserba.end_time, erreserba.idKutxatila);
    if(!availability)
        return false;

    const response = await fetch(`${API_URL}/erreserba/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(erreserba)
    });
    if(response.ok){
        console.log('Erreserba sortua');
    }else{
        console.error('Errorea erreserba sortzean');
    }
return true;
};

export async function getErreserbaAktiboa(idUser) {
    
    try {
        const response = await fetch(`${API_URL}/erreserba/aktiboa/${idUser}`);
        if (response.ok) {
            const data = await response.json();
            const start_time = new Date(data[0].start_time);
            start_time.setHours(start_time.getHours() + 2);
            const end_time = new Date(data[0].end_time);
            end_time.setHours(end_time.getHours() + 2);
            data[0].start_time = start_time.toISOString().slice(0, 19).replace('T', ' ');
            data[0].end_time = end_time.toISOString().slice(0, 19).replace('T', ' ');
            return data[0];
        }
        return false;
    } catch (error) {
        console.error('Aplikazioak errorea izan du erreserba aktiboa jasotzean: ', error);
        return false;
    }
};

async function checkAvailability(start_time, end_time, idKutxatila) {
    const response = await fetch(`${API_URL}/erreserba/checkAvailability`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ start_time, end_time, idKutxatila })
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data.available);
        return data.available;

    }
    console.error('Errorea erabilgarritasuna egiaztatzean');
    
}

export async function getErreserbaAmaituak(idUser) {
    const response = await fetch(`${API_URL}/erreserba/amaituak/${idUser}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
    }
    console.error('Errorea erabilgarritasuna egiaztatzean');
}   

export async function getErreserbaEzAmaituak(idUser) {
    const response = await fetch(`${API_URL}/erreserba/ezAmaituak/${idUser}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
    }
    console.error('Errorea erabilgarritasuna egiaztatzean');
}