import React, {useRef, useState} from 'react';

const UploadBlock = ({uploadedFiles, setUploadedFiles}) => {
    const [drag, setDrag] = useState(false)
    const filePicker = useRef()

    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }

    function onDropHandler(e) {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        console.log(uploadedFiles)
        console.log(files)
        for (let file in files) {
            console.log(files[file])
            setUploadedFiles(files[file])
            console.log(uploadedFiles)
        }


        // const formData = new FormData()
        // formData.append(`file`, files)
        // axios.post(`url`, formData)
    }

    function handlePick() {
        filePicker.current.click()
    }

    function handleChange(event) {
        setUploadedFiles(event.target.files[0])
    }

    return (
        <div>
            {drag
                ? <div
                    className="border-primary rounded p-4 text-center"
                    style={{borderStyle: "dashed", height: 170, cursor: "pointer"}}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop={e => onDropHandler(e)}
                >
                    <input
                        onChange={handleChange}
                        ref={filePicker}
                        type="file"
                        multiple
                        style={{overflow: "hidden", opacity: 0, height: 0, width: 0}}
                    />
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor"
                             className="bi text-primary bi-inbox" viewBox="0 0 16 16">
                            <path
                                d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"/>
                        </svg>
                    </div>
                    <span>
                        Нажмите или перенесите файл в эту область для загрузки
                    </span>
                </div>
                : <div
                    className="border-primary rounded p-4 text-center"
                    style={{borderStyle: "dashed", height: 170, cursor: "pointer"}}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onClick={e => handlePick(e)}
                >
                    <input
                        onChange={handleChange}
                        ref={filePicker}
                        type="file"
                        multiple
                        style={{overflow: "hidden", opacity: 0, height: 0, width: 0}}
                    />
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor"
                             className="bi text-primary bi-inbox" viewBox="0 0 16 16">
                            <path
                                d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"/>
                        </svg>
                    </div>
                    <span>
                        Перенесите файлы, чтобы загрузить их
                    </span>
                </div>
            }
        </div>
    );
};

export default UploadBlock;