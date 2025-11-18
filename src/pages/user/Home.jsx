import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavesService from '../../services/NavesService.jsx';

const NavesList = () => {
    
    const [naves, setNaves] = useState([]);
    
    useEffect(() => {
        fetchNaves();
    }, []);

    const fetchNaves = () => {
        NavesService.getAllNaves().then(response => {
            setNaves(response.data);
        }).catch(error => {
            console.log('Error fetching books:', error);
        });
    };
    return (
        <div>
            <h2>Naves List</h2>
            <div className="bg-blue-500 text-white p-10 text-center font-bold text-2xl">
                Naves de Star Wars
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre nave</th>
                    </tr>
                </thead>
                <tbody>
                    {naves.map(nave => (
                        <tr key={nave.id}>
                            <td>{nave.nombre}</td>    
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>);
    };
export default NavesList;