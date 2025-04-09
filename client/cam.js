    import Webcam from 'react-webcam';
    import React from 'react';
    import './App.css';
    import { useRef, useState } from 'react';
    function Ff() {
        let arr = new Array();
        const [img, setImg] = useState([]);
        const winref = useRef(null);
        const [camera, setCamera] = useState(false);
        const [im, setIm] = useState(false);
        const [sto, setSto] = useState(false);
        const [show, setShow] = useState(false);
        const [re, setRe] = useState(false);
        const [rear, setRear] = useState(false);
        const [ok, setOk] = useState(false);
        function capt() {
            let im = winref.current.getScreenshot();
            setImg((prev) => [...prev, im]);
            setIm(true);
            setShow(true);
            setCamera(false);
        }
        function cc() {
            setCamera(true);
        }
        // function ca() {

        //     setShow(true);
        // }
        function stop() {
            setSto(false);
            setCamera(false);
            setShow(false);
        }
        function sh() {
            setRe(true)
        }
        function ff() {
            setRear(true);
        }
        function dd() {
            setCamera(true);
            setSto(false);
            setImg([]);
        }
        function f() {
            setRear(false);
        }
        // function ss() {
        //     setOk(true);
        //     console.log("Captured Image Array: ", img);
        //     if (img.length > 0) {
        //         fetch.post('http://localhost:3000/upload', { image: img[0] })
        //             .then((response) => {
        //                 console.log("Image uploaded successfully:", response.data);
        //             })
        //             .catch((error) => {
        //                 console.error("Error uploading image:", error);
        //             });
        //     }
        // }
        function clearImages() {
            setImg([]);
            setShow(false);
        }

        return (
            <>
                <div className="main">
                    <div className="d2">
                        {(camera) && <Webcam className="w" audio={false} ref={winref} videoConstraints={{ facingMode: rear ? "environment" : "user" }} mirrored={rear?false:true} width={1980} height={980} />}
                        {(camera&&!sto) && (<div className="d3">
                        {!rear && camera && (<button className="b1" onClick={ff}>REAR</button>)}
                        {rear && camera && (<button className="b1" onClick={f}>FRONT</button>)}
                        {(camera||re) && (<button className="b1" onClick={capt}>CLICK</button>)}
                        {(camera||re) && (<button className="b1" onClick={stop}>STOP</button>)}
                        </div>)}
                    </div>
                    {((!camera &&!sto)&&(!show || sto)) && <div className="ddd">
                        <button className="b1" onClick={cc}>CAPTURE</button>
                    </div>}
                    {/* {(camera || re) && <div >
                        <button className="b1" onClick={capt}>CLICK</button><br />
                        {<button className="b1" onClick={stop}>STOP</button>}
                    </div>} */}
                    {/* {sto && <button className="b1" onClick={ca}>SHOW</button>} */}
                    {show && !camera && <div className="d2">
                        {!re && (im || ok) && (
                            img.map((a, index) => (
                                <img className="im" src={a} />
                            )))
                        }
                        </div>}
                        <div className="d3">
                        {(!camera)  && show &&<button className="b1">OK</button>}
                        {!camera && show &&<button className="b1" onClick={dd}>RETAKE</button>}
                        {/* {arr.forEach((i) => {
                            console.log(i);
                        })} */}
                        {!camera && show && <button className="b1" onClick={clearImages}>CLEAR</button>}
                        
                    </div>
                    {/* <div>
                {re &&
                    (<Webcam audio={false} ref={winref}/> )}
                </div> */}
                </div>
            </>
        )
    }
    export default Ff;
