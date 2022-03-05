import React, { useState } from "react";
import "./styles.css";

function NFTMint() {
  
  const [img, setImg] = useState(null);
  console.log(img);

  function preview() {
    if (img==null) {
      return <div>
        <div class="preview-box" style={{paddingTop: "25%"}}>
            <span style={{color: "whitesmoke"}}>Upload a file to see a preview</span>
        </div>
      </div>
    }
    return <div>
      {img && (
          <div class="preview-box" style={{paddingTop: "1%"}}>
            <img src={img} alt="preview" width="95%" hieght="95%" />
          </div>
      )}
    </div>
  }

  return (
    <section>
    <div class="col-12">
      <div class="title" style={{fontFamily: 'Roboto, sans-serif', fontSize: "2rem", marginTop: "0rem", marginBottom: '3rem', color: "whitesmoke"}}>Lazy Mint on Rarible </div>
        <div class="row">
          <div class="col-5 offset-2">
            <div id="success_message"></div>
				      <div class="form_element">
					      <div class="col-md-4" style={{marginLeft: "-25px"}}>
					    	  <label class="form-label" style={{fontSize: "1.25rem", color: "whitesmoke"}}>Upload File<span class="text-danger">*</span></label>
					      </div>
                  <div class="upload-box">
                    <input
                      id="input_image"
                      type="file"
                      name="image" 
                      accept="image/png, image/jpeg"
                      style={{paddingTop: "15%"}} 
                      placeholder="Upload one of the supported file types: .stl, ???"
                      onChange={e => {
                        const imgUrl = URL.createObjectURL(e.target.files[0]);
                        console.log(imgUrl);
                        setImg(imgUrl);
                        }}
                      />
                    <p style={{fontSize: "1rem", color: "whitesmoke"}}>Click or drag a file to this area to upload</p>
                  </div>
                </div>
              <div class="form_element">
                <div class="col-md-1">
                  <label class="form-label" style={{fontSize: "1.25rem", marginLeft: "-10px", color: "whitesmoke"}}>Name<span class="text-danger">*</span></label>
                </div>
                <input class="inp" style={{color: "whitesmoke"}} type=" text" id="input_name" name="name" placeholder="e.g Golum's Nutsack"></input>
              </div>
              <div class="form_element">
                <div class="col-md-5" style={{marginLeft: "-15px", color: "whitesmoke"}}>
                  <label class="form-label" style={{fontSize: "1.25rem", scrollBehavior: "auto"}}>Description <span style={{color: "gray"}}>(optional)</span></label>
                </div>
                <input class="inp" style={{color: "whitesmoke"}} type=" text" id="input_description" name="description" placeholder="Looks like 2 turkeys shoved in a plastic bag, no wonder frodo liked him so much"/>
                </div>
                <div class="form_element">
                  <div class="col-md-1">
                    <label class="form-label" style={{fontSize: "1.25rem", color: "whitesmoke"}}>Supply<span class="text-danger">*</span></label>
                  </div>
                  <input class="inp" style={{color: "whitesmoke"}} type=" text" id="input_quantity" name="Quantity" placeholder="Enter Quantity of copies to mint"/>
                </div>
                <div class="form_element">
                  <div class="col-md-3" style={{marginLeft: "-15px", marginBottom: "5px"}}>
                    <label class="form-label" style={{fontSize: "1.25rem", color: "whitesmoke"}}>Category <span class="text-danger">*</span></label>
                  </div>
                  <select class="inp" style={{color: "whitesmoke"}} type=" text" id="input_tag" name="Tag" placeholder="Tag">
                    <option value="Figurines">Figurines</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div class="form_element">
                  <div class="col-md-1">
                    <label class="form-label" style={{fontSize: "1.25rem", color: "whitesmoke"}}>Artist<span class="text-danger">*</span></label>
                  </div>
                  <input class="inp" style={{color: "whitesmoke"}} type=" text" id="input_creator" name="name" placeholder="What Filthy Hobbit Made This?"/>
                </div>
              </div>
              <div class="col-5 offset-7" style={{position: "fixed", height: "40vh", marginTop: "1rem", marginBottom: "5rem"}}>
                  <div class="title" style={{fontFamily: "Roboto, sans-serif", fontSize: "1.5rem", float: "left", marginLeft: "2rem", marginBottom: "1.5rem", color: "whitesmoke"}}>Item Preview</div>
                  {preview()}
                  </div>      
                </div>
              </div>
              <div class="row col-12 offset-6" style={{marginTop: "5rem"}}>
                <button type="button" class="btn btn-primary btn-lg" htmlType="submit">
                  Submit
                </button>
              </div>
      
  </section>
  );
}

export default NFTMint;
