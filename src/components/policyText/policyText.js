import React, { useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux";

function PolicyTextComp() {
  const dispatch = useDispatch();
  const policyText = useSelector((state) => state.TableData.policyText);
  useEffect( ()=> {
    dispatch({type: "GET_POLICY_TEXT"})
  }, [])
    return ( 
        <label>{policyText}</label>
     );
}

export default PolicyTextComp;