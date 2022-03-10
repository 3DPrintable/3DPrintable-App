import React, { useState } from "react";
import "./styles.css";

const NFTMint = ({ onAdd }) => {
  
  const [name, setName] = useState('')
  const [creator, setCreator] = useState('')
  const [category, setCategory] = useState('')
  const [supply, setSupply] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState([])
  const [file, setFile] = useState('')
  
  const onSubmit = (e) => {
    e.preventDefault()

    if(!name) {
        alert('Missing name!!!')
        return
    }

    if(!creator) {
        alert('Missing creator!!!')
        return
    }

    if(category === '') {
        alert('Choose Category!!!')
        return
    }

    if(!supply) {
        alert('Missing supply!!!')
        return
    }

    if(!description) {
        alert('Missing description!!!')
        return
    }

    if(!image) {
        alert('Missing image!!!')
        return
    }

    if(!file) {
        alert('Missing file!!!')
        return
    }
    
    onAdd({ name, creator, category, supply, description, image, file })
    
    setName('')
    setCreator('')
    setCategory('')
    setSupply('')
    setDescription('')
    setImage('')
    setFile('')
  }

  function preview() {
    if (image==null) {
      return <div>
        <div className="preview-box" style={{paddingTop: "25%"}}>
            <span style={{color: "whitesmoke"}}>Upload a file to see a preview</span>
        </div>
      </div>
    }
    return <div>
      {image && (
          <div className="preview-box" style={{paddingTop: "1%"}}>
            <img src={image} alt="preview" width="95%" hieght="95%" />
          </div>
      )}
    </div>
  }

  return (
    <section>
      <form className='add-form' onSubmit={onSubmit} >
        <div className="col-12">
          <div className="title" style={{fontFamily: 'Roboto, sans-serif', fontSize: "2rem", marginTop: "0rem", marginBottom: '3rem', color: "whitesmoke"}}>Lazy Mint on Rarible </div>
            <div className="row">
              <div className="col-4 offset-2">
              <div className="form_element">
                <div className="col-md-4" style={{marginLeft: "-25px"}}>
                  <label className="form-label" style={{fontSize: "1.25rem", color: "whitesmoke"}}>Upload Image<span className="text-danger">*</span></label>
                </div>
                <input className="form-control" type="file" accept="image/png, image/jpeg" onChange={(e) => setImage(e.target.files[0])}></input>
				      </div>
              <div className="form_element">
                <div className="col-md-4" style={{marginLeft: "-25px"}}>
                  <label className="form-label" style={{fontSize: "1.25rem", color: "whitesmoke"}}>Upload STL File<span className="text-danger">*</span></label>
                </div>
                <input className="form-control" type="file" accept=".stl" onChange={(e) => setFile(e.target.files[0])}></input>
				      </div>
                <div className="form_element">
                  <div className="col-md-2">
                    <label className="form-label" style={{fontSize: "1.25rem", marginLeft: "-10px", color: "whitesmoke"}}>Name<span className="text-danger">*</span></label>
                  </div>
                  <input className="form-control" type=" text" placeholder="Insert name of the file" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className="form_element">
                  <div className="col-md-1">
                    <label className="form-label" style={{fontSize: "1.25rem", color: "whitesmoke"}}>Supply<span className="text-danger">*</span></label>
                  </div>
                  <input className="form-control" type=" text" placeholder="Enter quantity of NFTs to mint per file" value={supply} onChange={(e) => setSupply(e.target.value)}/>
                </div>
                <div className="form_element">
                  <div className="col-md-3" style={{marginLeft: "-15px", marginBottom: "5px"}}>
                    <label className="form-label" style={{fontSize: "1.25rem", color: "whitesmoke"}}>Category <span className="text-danger">*</span></label>
                  </div>
                  <select className="form-control" type=" text" placeholder='' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value=''>Choose category</option>
                    <option value="Figurines">Figurines</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form_element">
                  <div className="col-md-1">
                    <label className="form-label" style={{fontSize: "1.25rem", color: "whitesmoke"}}>Creator<span className="text-danger">*</span></label>
                  </div>
                  <input className="form-control" type=" text" placeholder="Insert creator name" value={creator} onChange={(e) => setCreator(e.target.value)}/>
                </div>
                <div className="form_element">
                  <div className="col-md-1" style={{marginLeft: "-15px", color: "whitesmoke"}}>
                    <label className="form-label" style={{fontSize: "1.25rem", scrollBehavior: "auto"}}>Description <span style={{color: "gray"}}>(optional)</span></label>
                  </div>
                  <input className="form-control" type=" text" placeholder="Description of the file" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
              </div>
              <div className="col-5 offset-7" style={{position: "fixed", height: "40vh", marginTop: "1rem", marginBottom: "5rem"}}>
                <div className="title" style={{fontFamily: "Roboto, sans-serif", fontSize: "1.5rem", float: "left", marginLeft: "2rem", marginBottom: "1.5rem", color: "whitesmoke"}}>Image Preview</div>
                {preview()}
                </div>      
              </div>
            </div>
            <div className="col-8" style={{marginTop: "5rem", color: "whitesmoke"}}>
              <input type='submit' value='Upload' className='btn btn-primary'></input>
            </div> 
            </form>
  </section>
  )
}

export default NFTMint;