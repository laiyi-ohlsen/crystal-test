const base = import.meta.env.BASE_URL.replace(/\/$/, "");
import { useState } from 'react'; //import the useState react hook
import './App.css' //imports our style

//define my images array in their initial order
//having id is easier to track because posoiton change but id don't change
const initialImages = [
  //childhood favorite food, category to tell which food section it belongs to
  {id: 1, url: `${base}/asset/noodle.png`,category: "childhood"},
  {id: 2, url: `${base}/asset/pizza.png`, category: "childhood"},
  {id: 3, url: `${base}/asset/burger.png`, category: "childhood"},

  //current favorite food
  { id: 4, url: `${base}/asset/noodle.png`, category: "current" },
  { id: 5, url: `${base}/asset/sushi.png`, category: "current" },
  { id: 6, url: `${base}/asset/soup.png`, category: "current" },

  //cultural dish
  { id: 7, url: `${base}/asset/meat.png`, category: "cultural"},
  { id: 8, url: `${base}/asset/lotus.png`, category: "cultural" },
  { id: 9, url: `${base}/asset/chicken.png`, category: "cultural" },

  //comfort dish
  { id: 10, url: `${base}/asset/rice.png`, category: "comfort"},
  { id: 11, url: `${base}/asset/potato.png`, category: "comfort" },
  { id: 12, url: `${base}/asset/cake.png`, category: "comfort" },

  //wish dish
  { id: 13, url: `${base}/asset/ramen.png`, category: "wish"},
  { id: 14, url: `${base}/asset/skewer.png`, category: "wish" },
  { id: 15, url: `${base}/asset/liangpi.png`, category: "wish" }
]

//defining menu Component
export default function Menu(){
    //setting up state getters and setters

  //images lets us read the state, seImages lets us change the state
  const [images, setImages]= useState(initialImages);
  //draggedId lets us read the id of whatever image is being dragged 
  //setDraggedId lets us change the id to be whatever image is being dragged
  const [draggedId, setDraggedId]= useState(null);

  //hoveredId lets us track what image is being hovered over
  //setHoveredId lets us change the id to be whatever image is being hovered over
  const [hoveredId, setHoveredId] = useState(null);

  //Store the text entered for each food section and update when user inputs
  const [childhoodText, setChildhoodText] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [culturalText, setCulturalText] = useState("");
  const [comfortText, setComfortText] = useState("");
  const [wishText, setWishText] = useState("");


  const handleDragStart = (id) => setDraggedId(id);//custom function to update the draggedId state variable with the the dragged image id, so handleDragStart is when it detects we are dragging something

const handleDrop=(targetId) => {
  //if the image being dragged is hovering over the same place
  if (draggedId ===targetId) return; //if I pick it up and then drop it down then nothing happens becuz its in the same place
  
  //finding the index of the image that is being dragged
  const draggedIndex= images.findIndex(i=> i.id ===draggedId);
    
  //finding the index of the image that is being hovered over
  const targetIndex = images.findIndex(i => i.id ===targetId);
  
  //make a copy of ouyr images in their current state
  const newImages = [...images]; //making a copy of the images array, I have a copy so no worry of changing the original
  
  //cutting the dragged image out of the copy of the images array
  const [moved] = newImages.splice(draggedIndex, 1);//splice is an array function, its go find the number and then cut it from the array, and moved is saying where do you want to put it Ill help u put it, so put in the moved array
  
  //putting the image in its new spot in the copy of the images array
  newImages.splice(targetIndex, 0, moved)//this puts it somewhere, put it in this newImages array
  
  //use the setter state function to update the images state array
  setImages(newImages) //above is the prepwork, and this is update
  
  //set dragged id and hover id back to null becuz nothing is being hovered over or dragged
  setDraggedId(null);
  setHoveredId(null);
};

const handleChildhoodInput = (e) => {
  if (e.key === "Enter") { //if Enter key is pressed then updates the childhoodText with the current text from input box
    setChildhoodText(e.target.value); //e.target.value is the current text inside the input box
    e.target.value = "";  //clears input box after pressing enter
  }
};

const handleCurrentInput = (e) => {
  if (e.key === "Enter") {
    setCurrentText(e.target.value);
    e.target.value = "";
  }
};

const handleCulturalInput = (e) => {
  if (e.key === "Enter") {
    setCulturalText(e.target.value);
    e.target.value = "";
  }
};

const handleComfortInput = (e) => {
  if (e.key === "Enter") {
    setComfortText(e.target.value);
    e.target.value = "";
  }
};

const handleWishInput = (e) => {
  if (e.key === "Enter") {
    setWishText(e.target.value);
    e.target.value = "";
  }
};

//function for uploading images
const handleUpload = (e, category) =>{ //the e is the event object and the category tells which section the images belong to 
  console.log(`this is what i thinks e is: ${e}`);
  //getting the files and putting them into an array, 
  //so e knows the users action and inthis case its the files uploaded, and the category is just saying oh the files uploaded belongs to this category
  const files = Array.from(e.target.files);
  
  
  //setting same info preloaded images have 
  const newImages = files.map((file, index) => ({ //Loops through each uploaded file and creates a new object for it.
    id: Date.now() + index, //gives each image an id 
    url: URL.createObjectURL(file), //creates a temporary url that shows the uploaded image
    title: file.name, //use the file name as the image title
    category: category, //which category the image belongs to
  }))
  console.log(newImages);
  
  //updating the state of the images to include upload images
  setImages([...images, ...newImages]) //updating the ones already there and the new images too
}
  
const removeImage = (url) =>{
  console.log(images.filter((img) => img !== url))
  setImages(images.filter((img)=> img !==url))   //Remove the image with the matching URL, so keep the iimage if its url is not the same as the one we are removing from the images array and update the state
}

  //this is where we put the actual componenets, the above were just defining it and now we are using it
  //this is where we put the actual componenets, the above were just defining it and now we are using it 
  return(
    <div className="container"> 
      <h1>Dream Menu</h1>

      <div className="childhood">
      <h2>Favorite Childhood Food</h2>
      <h4>What were your three favorite childhood dishes? Upload images of them and arrange the images from left to right — from most favorite to least favorite.</h4>
    <div className="imageLayout">
      {/* class that holds all the uploaded childhood images for style in css later*/}
      {images.filter(img=> img.category==="childhood") //only show images that belong to the childhood category
      .map(img => ( //loop thru each filtered img and display it
        <div 
        key={img.id}
        draggable //tells it that its a draggable element, html attribute
        onDragStart={()=> handleDragStart(img.id)} //when dragged it is calling handleDragStart with the image’s ID
        onDragOver= {(e) => { 
          //when an image is dragger over an img
          e.preventDefault(); //prevent default so drop is allowed
          setHoveredId(img.id) //update so that this image's ID is the hovered target
        }} 
  
        onDragLeave ={()=> setHoveredId(null)} //when draggingleaves or not on the hovered anymore, then clear the hovered id 
        onDrop = {()=> handleDrop(img.id)} //when an img is dropped we call the handleDrop function with the img.id to rearrange img order 
        className = {`gallery-item ${draggedId == img.id ? "dragged" : ""} 
        ${hoveredId == img.id && draggedId !=img.id ? "hovered": "" }`}//if it is dragged then apply the dragged class(slow opacity) css and is it being hovered and also it is also not dragged then hovered class(blue border) will apply
        > 
        <img src={img.url}/> {/* show the image using its URL and I took out title since I thought alt text is not really needed when so much is going on*/}

        <button className="remove-btn"  //style for this button
            onClick={() => removeImage(img)}>
              x           {/*  'x' button that removes an image when clicked */}
            </button>
        </div>
      ))}
      </div>
      <label className="upload-btn">     {/* created another class so that I can style the upload botton to get rid of choose file */}
        <b>Upload photos of your favourite dishes</b>
        <input
        type="file"
        multiple //allow user to upload more than one image at once
        onChange={(e) => handleUpload(e, "childhood")} // When files are uploaded, call handleUpload so that they will be chldhood category

  />
</label>

    <input type="text"
    placeholder="Explain why you choose this dish and press Enter" //input box for users to type or input their explanation
    onKeyDown={handleChildhoodInput} //when the users presses the key Enter, it will call the handleChildhoodInput function
    />
    {childhoodText && <p>{childhoodText}</p>}  {/* If there’s text saved in state, display it below as a paragraph */}
    </div>


    <div className="current">
      <h2>Current Favourite Foods</h2>
      <h4>What are your three favorite dishes right now? Upload images of them and arrange the images from left to right — from most favorite to least favorite.</h4>
    <div className="imageLayout">
      {images.filter(img=> img.category==="current")
      .map(img => (
        <div 
        key={img.id}
        draggable //tells it that its a draggable element, html attribute
        onDragStart={()=> handleDragStart(img.id)} //when dragged it is telling the id of the img dragged?
        onDragOver= {(e) => {
          e.preventDefault();
          setHoveredId(img.id)
        }} 
  
        onDragLeave ={()=> setHoveredId(null)}
        onDrop = {()=> handleDrop(img.id)}
        className = {`gallery-item ${draggedId == img.id ? "dragged" : ""} 
        ${hoveredId == img.id && draggedId !=img.id ? "hovered": "" }`}//if it is dragged then apply the dragged class(slow opacity) css and is it being hovered and also it is also not dragged then hovered class(blue border) will apply
        > 
        <img src={img.url} alt={img.title}/>
        <button className="remove-btn" 
            onClick={() => removeImage(img)}>
              x
            </button>
        </div>
      ))}
      </div>
      <label className="upload-btn">
        <b>Upload photos of your favourite dishes</b>
        <input type="file"
        multiple
        onChange = {(e) => {
          handleUpload(e,"current")
        }}
        />
        </label>

    <input type="text"
    placeholder="Explain why you choose this dish and press Enter"
    onKeyDown={handleCurrentInput}
    />
    {currentText && <p>{currentText}</p>}
    </div>


    <div className="cultural">
      <h2>Favorite Cultural Foods</h2>
      <h4>What are three dishes that represent your culture or heritage? Upload images of them and arrange the images from left to right — from most favorite to least favorite.</h4>
    <div className="imageLayout">
      {images.filter(img=> img.category==="cultural")
      .map(img => (
        <div 
        key={img.id}
        draggable //tells it that its a draggable element, html attribute
        onDragStart={()=> handleDragStart(img.id)} //when dragged it is telling the id of the img dragged?
        onDragOver= {(e) => {
          e.preventDefault();
          setHoveredId(img.id)
        }} 
  
        onDragLeave ={()=> setHoveredId(null)}
        onDrop = {()=> handleDrop(img.id)}
        className = {`gallery-item ${draggedId == img.id ? "dragged" : ""} 
        ${hoveredId == img.id && draggedId !=img.id ? "hovered": "" }`}//if it is dragged then apply the dragged class(slow opacity) css and is it being hovered and also it is also not dragged then hovered class(blue border) will apply
        > 
        <img src={img.url} alt={img.title}/>
        <button className="remove-btn" 
            onClick={() => removeImage(img)}>
              x
            </button>
        </div>
      ))}
      </div>
      <label className="upload-btn">
        <b>Upload photos of your favourite dishes</b>
      <input type="file"
      multiple
      onChange = {(e) => {
        handleUpload(e,"cultural")
      }}
      />
      </label>

   <input type="text"
    placeholder="Explain why you choose this dish and press Enter"
    onKeyDown={handleCulturalInput}
    />
    {culturalText && <p>{culturalText}</p>}
    </div>


    <div className="comfort">
      <h2>Comfort Food</h2>
      <h4>What are three of your go-to comfort foods when you’re feeling unwell or down? Upload images of them and arrange the images from left to right — from most favorite to least favorite.</h4>
    <div className="imageLayout">
      {images.filter(img=> img.category==="comfort")
      .map(img => (
        <div 
        key={img.id}
        draggable //tells it that its a draggable element, html attribute
        onDragStart={()=> handleDragStart(img.id)} //when dragged it is telling the id of the img dragged?
        onDragOver= {(e) => {
          e.preventDefault();
          setHoveredId(img.id)
        }} 
  
        onDragLeave ={()=> setHoveredId(null)}
        onDrop = {()=> handleDrop(img.id)}
        className = {`gallery-item ${draggedId == img.id ? "dragged" : ""} 
        ${hoveredId == img.id && draggedId !=img.id ? "hovered": "" }`}//if it is dragged then apply the dragged class(slow opacity) css and is it being hovered and also it is also not dragged then hovered class(blue border) will apply
        > 
        <img src={img.url} alt={img.title}/>
        <button className="remove-btn" 
            onClick={() => removeImage(img)}>
              x
            </button>
        </div>
      ))}
      </div>
      <label className="upload-btn">
        <b>Upload photos of your favourite dishes</b>
      <input type="file"
      multiple
      onChange = {(e) => {
        handleUpload(e,"comfort")
      }}
      />
      </label>
   <input type="text"
    placeholder="Explain why you choose this dish and press Enter"
    onKeyDown={handleComfortInput}
    />
    {comfortText && <p>{comfortText}</p>}
    </div>

    <div className="wish">
      <h2>Wish to eat</h2>
      <h4>What are three dishes you’ve been craving or wish you could try someday? Upload images of them and arrange the images from left to right — from most to least desired.</h4>
    <div className="imageLayout">
      {images.filter(img=> img.category==="wish")
      .map(img => (
        <div 
        key={img.id}
        draggable //tells it that its a draggable element, html attribute
        onDragStart={()=> handleDragStart(img.id)} //when dragged it is telling the id of the img dragged?
        onDragOver= {(e) => {
          e.preventDefault();
          setHoveredId(img.id)
        }} 
  
        onDragLeave ={()=> setHoveredId(null)}
        onDrop = {()=> handleDrop(img.id)}
        className = {`gallery-item ${draggedId == img.id ? "dragged" : ""} 
        ${hoveredId == img.id && draggedId !=img.id ? "hovered": "" }`}//if it is dragged then apply the dragged class(slow opacity) css and is it being hovered and also it is also not dragged then hovered class(blue border) will apply
        > 
        <img src={img.url} alt={img.title}/>
        <button className="remove-btn" 
            onClick={() => removeImage(img)}>
              x
            </button>
        </div>
      ))}
      </div>
      <label className="upload-btn">
        <b>Upload photos of your favourite dishes</b>
      <input type="file"
      multiple
      onChange = {(e) => {
        handleUpload(e,"wish")
      }}
      />
      </label>
   <input type="text"
    placeholder="Explain why you choose this dish and press Enter"
    onKeyDown={handleWishInput}
    />
    {wishText && <p>{wishText}</p>}

    </div>


    </div>//the end div for the container
  )

  }//bracket starting from the export default menu function