import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './ContextReducer'

export const Card = (props) => {
// console.log(props);
let dispatch=useDispatchCart()
let data=useCart()
let options=props.options
let arr=[]
for(var key in options){
arr.push(key)
}
// console.log(arr)
const priceRef=useRef()
const[qty,setQty]=useState(1)
const[size,setSize]=useState("")
const handleAddToCart= async()=>{
  await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
  // await console.log(data);
}

let finalPrice= qty * parseInt(options[size])
useEffect(()=>{
  setSize(priceRef.current.value)
})

  return (
    <div>
          <div>
          <div className="card mt-3" style={{ "width": "18rem","maxHeight":"360px" }}>
            <img  src={props.foodItem.img} className="card-img-top" alt="Card image cap"  style={{height:"120px",objectFit:"fill"}} />
            <div className="card-body">
              <h5 className="card-title">{props.foodItem.name}</h5>
            
              <div className="container w-100">
                <select className="m-2 h-100  bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
                  {Array.from(Array(6),(e,i)=>{
                    return(
                      <option key={i+1} value={i+1}>{i+1}</option>
                    )
                  })}
                </select>
                <select  className="m-2 h-100  bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
           {arr.map((data)=>{
          return  <option className='text-light ' key={data} value={data}>{data}</option>
           })}
                </select>

<div className='d-inline fs-5  '>
  ${finalPrice}
</div>
<hr/>

<button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart} >Add To cart</button>

              </div>
            </div>
          </div>
        </div>
    </div>
  )
}