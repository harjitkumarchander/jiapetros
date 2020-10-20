import React from 'react';
import '../css/Loader.css';
const Loader = (props) => {
    if(props.loader === true){
        return (
            <div className="loader-img">
                <img src={require('../images/loader.gif')} alt="loader-pic"/>
            </div>
        );
    }else{
        return null;
    }
}
export default Loader;