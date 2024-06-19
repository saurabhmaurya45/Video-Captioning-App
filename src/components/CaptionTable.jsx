import { useState } from 'react';
import { convertSecondsToTime,convertTimeToSeconds } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash } from '@fortawesome/free-solid-svg-icons';


const CaptionTable = ({ captions, setCaptions }) => {
    const [editing, setEditing] = useState({ rowIndex: -1, field: '' });

    const editChangeHandler = (index, field, value) => {
        const updatedCaptions = [...captions];
        if (field === 'text') {
            updatedCaptions[index].text = value;
        } else if (field === 'start') {
            updatedCaptions[index].time.start = convertTimeToSeconds(value);
        } else if (field === 'end') {
            updatedCaptions[index].time.end = convertTimeToSeconds(value);
        }
        setCaptions(updatedCaptions);
    };

    const cellDoubleClickHandler = (index, field) => {
        setEditing({ rowIndex: index, field: field });
    };

    const cellBlurHandler = () => {
        setEditing({ rowIndex: -1, field: '' });
    };

    const deleteHandler = (index) => {
        const updatedCaptions = captions.filter((_, i) => i !== index);
        setCaptions(updatedCaptions);
    };

    return (
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b">Sr. No.</th>
                    <th className="py-2 px-4 border-b">Description</th>
                    <th className="py-2 px-4 border-b">Start Time</th>
                    <th className="py-2 px-4 border-b">End Time</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                {captions.map((caption, index) => (
                    <tr key={index}>
                        <td className="py-2 px-4 border-b text-center ">{index + 1}</td>
                        <td
                            className="py-2 px-4 border-b cursor-pointer"
                            onDoubleClick={() => cellDoubleClickHandler(index, 'text')}
                        >
                            {editing.rowIndex === index && editing.field === 'text' ? (
                                <input
                                    type="text"
                                    value={caption.text}
                                    onChange={(e) => editChangeHandler(index, 'text', e.target.value)}
                                    onBlur={cellBlurHandler}
                                    className="w-full p-1 border border-gray-300 rounded cursor-pointer"
                                />
                            ) : (
                                caption.text
                            )}
                        </td>
                        <td
                            className="py-2 px-4 border-b text-center cursor-pointer"
                            onDoubleClick={() => cellDoubleClickHandler(index, 'start')}
                        >
                            {editing.rowIndex === index && editing.field === 'start' ? (
                                <input
                                    type="text"
                                    value={convertSecondsToTime(caption.time.start)}
                                    onChange={(e) => editChangeHandler(index, 'start', e.target.value)}
                                    onBlur={cellBlurHandler}
                                    className="w-full p-1 border border-gray-300 rounded cursor-pointer"
                                />
                            ) : (
                                convertSecondsToTime(caption.time.start)
                            )}
                        </td>
                        <td
                            className="py-2 px-4 border-b text-center cursor-pointer"
                            onDoubleClick={() => cellDoubleClickHandler(index, 'end')}
                        >
                            {editing.rowIndex === index && editing.field === 'end' ? (
                                <input
                                    type="text"
                                    value={convertSecondsToTime(caption.time.end)}
                                    onChange={(e) => editChangeHandler(index, 'end', e.target.value)}
                                    onBlur={cellBlurHandler}
                                    className="w-full p-1 border border-gray-300 rounded cursor-pointer"
                                />
                            ) : (
                                convertSecondsToTime(caption.time.end)
                            )}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                            <button onClick={() => deleteHandler(index)} className="text-red-500 hover:text-red-700">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CaptionTable