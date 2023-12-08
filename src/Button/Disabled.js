import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";



export default function Disable (){
    const navigate = useNavigate();
    const [isDisabled, setIsDisanblet] = useState(false);

    useEffect(() => {
        axios
          .get("http://localhost:3005/posts/" + id)
          .catch((err) => console.log(err));
      }, []);

    return (
        <></>
    )
}