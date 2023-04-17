import { useEffect, useState } from "react"
import { addItem, deleteItem, updateItem } from "../services/mongo";
import { LabeledInput, LabeledNumericalInput } from "./CommonComponents.library";
import Dropzone from "react-dropzone";
import AWS from "aws-sdk";

const access_key = "AKIA4WHJJHD6CLW65UNQ"
const access_secret = "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"
const bucket_name = "csi-518-images"

export const InventoryHeader = ({ setRefresh }) => {
    const [modal,setModal] = useState()
    const [name,setName] = useState()
    const [quantity,setQuantity] = useState()
    const [file, setFile] = useState(null);

    const handleDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const handleUpload = async () => {
        const s3 = new AWS.S3({
            accessKeyId: access_key,
            secretAccessKey: access_secret,
        });

        const key = `${name.replace(' ','-')}-${Date.now()}`

        const params = {
            Bucket: bucket_name,
            Key: key,
            Body: file,
        };
        await s3.upload(params).promise();

        await addItem({
            item_name: name,
            quantity: quantity,
            img_url: key
        })

        setRefresh(Date.now())
    }

    return (
        <>
            {
                modal?(
                    <div style={{"--bs-bg-opacity": 0.5}} className="bg-black position-absolute w-100 h-100 top-0 start-0 d-flex flec-column">
                        <div className="bg-light h-75 w-75 mx-auto my-auto p-4">
                            <div onClick={()=>setModal()}>
                                X
                            </div>
                            <div>
                                <LabeledInput
                                    label="Name"
                                    state={name}
                                    setState={setName}
                                />
                                <LabeledNumericalInput
                                    label="Quantity"
                                    state={quantity}
                                    setState={setQuantity}
                                />
                                <div>
                                    <Dropzone onDrop={handleDrop}>
                                        {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {file ? (
                                            <div>
                                                <p>{file.name}</p>
                                                <button onClick={handleUpload}>Upload</button>
                                            </div>
                                            ) : (
                                            <p>Drag and drop an image here, or click to select a file.</p>
                                            )}
                                        </div>
                                        )}
                                    </Dropzone>
                                </div>
                            </div>
                            <button
                                className="bg-primary border-0 rounded text-white mx-auto d-block my-4"
                                onClick={async () => {
                                    handleUpload()
                                    setModal()
                                }}
                            >
                                confirm
                            </button>
                        </div>
                    </div>
                ):(<></>)
            }
            <div className="d-flex justify-content-between bg-light p-2 rounded mt-4">
                <div className="d-flex">
                    <svg id="logo-85" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10 0C15.5228 0 20 4.47715 20 10V0H30C35.5228 0 40 4.47715 40 10C40 15.5228 35.5228 20 30 20C35.5228 20 40 24.4772 40 30C40 32.7423 38.8961 35.2268 37.1085 37.0334L37.0711 37.0711L37.0379 37.1041C35.2309 38.8943 32.7446 40 30 40C27.2741 40 24.8029 38.9093 22.999 37.1405C22.9756 37.1175 22.9522 37.0943 22.9289 37.0711C22.907 37.0492 22.8852 37.0272 22.8635 37.0051C21.0924 35.2009 20 32.728 20 30C20 35.5228 15.5228 40 10 40C4.47715 40 0 35.5228 0 30V20H10C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM18 10C18 14.4183 14.4183 18 10 18V2C14.4183 2 18 5.58172 18 10ZM38 30C38 25.5817 34.4183 22 30 22C25.5817 22 22 25.5817 22 30H38ZM2 22V30C2 34.4183 5.58172 38 10 38C14.4183 38 18 34.4183 18 30V22H2ZM22 18V2L30 2C34.4183 2 38 5.58172 38 10C38 14.4183 34.4183 18 30 18H22Z" fill="#5417D7"></path></svg>
                    <p className="h3 mx-4 my-auto">Inventory System</p>
                </div>
                <button
                    className="bg-primary border-0 rounded text-white"
                    onClick={() => modal?setModal():setModal(true)}
                >
                    add new
                </button>
            </div>
        </>
    )
}




export const InventoryItem = ({ item }) => {
    const [quantity,setQuantity] = useState(item.quantity)
    const [name,setName] = useState(item.item_name)
    const [modal,setModal] = useState()
    const [editing,] = useState(false)

    return (
        <>
            {
                modal?(
                    <div style={{"--bs-bg-opacity": 0.5}} className="bg-black position-absolute w-100 h-100 top-0 start-0 d-flex flec-column">
                        <div className="bg-light h-75 w-75 mx-auto my-auto p-4">
                            <div onClick={()=>setModal()}>
                                X
                            </div>
                            <div>
                                <LabeledInput
                                    label="Name"
                                    state={name}
                                    setState={setName}
                                />
                                <LabeledNumericalInput
                                    label="Quantity"
                                    state={quantity}
                                    setState={setQuantity}
                                />
                            </div>
                            <button
                                className="bg-primary border-0 rounded text-white mx-auto d-block my-4"
                                onClick={async () => {
                                    const result = await updateItem(item._id, {
                                        item_name: name,
                                        quantity: quantity,
                                    })
                                    console.log(result)
                                    setModal()
                                }}
                            >
                                confirm
                            </button>
                        </div>
                    </div>
                ):(<></>)
            }
            <div id={`${item.item_id}`} className="d-flex justify-between mt-4 mx-auto rounded overflow-hidden w-50 border">
                <div className="d-flex">
                    <div>
                        <div className="border p-2 rounded">
                            <img src={`https://csi-518-images.s3.amazonaws.com/${item.img_url}`} alt="user profile" width="100"/>
                        </div>
                    </div>
                    <div className={`${editing?'px-4':'p-4'}`}>
                        <p className="h2">{name}</p>
                        <p>{quantity}</p>
                    </div>
                </div>
                <div>
                    <div className="d-flex">
                        <button
                            className="bg-primary border-0 rounded text-white h-min my-4"
                            onClick={()=>setModal(item)}
                        >
                            edit
                        </button>
                        <button
                            className="bg-danger border-0 rounded text-white h-min my-4 mx-2"
                            onClick={async ()=>{
                                await deleteItem(item._id)
                                document.querySelector(`#${item.item_id}`).remove()
                            }}
                        >
                            delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}






const ItemList = ({ refresh }) => {
    const [items,setItems] = useState([])

    useEffect(() => {
        fetch('/items', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.result)
            setItems(JSON.parse(data.result))
        })
    },[refresh])

    return (
        <div className="d-flex flex-wrap">
            {
                items.map((item,index) => {
                    return (
                        <InventoryItem key={index} item={item} />
                    )
                })
            }
        </div>
    )
}


export const InventoryPage = () => {
    const [refresh,setRefresh] = useState()
    return (
        <div>
            <InventoryHeader setRefresh={setRefresh}/>
            <ItemList refresh={refresh}/>
        </div>
    )
}