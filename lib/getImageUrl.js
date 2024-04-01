/**
 * 
 * @param {Event} e event contain the image file choosen 
 * @returns url of image selected
 */
export const getImageUrl = (e) => {


  let value = e.target.files[0]
  console.log(value);
  if (value) {

    if (value.size > 2048000) {
      alert('image trop lourde max: 2 Mo')
      return
    }
    else {


      let imageURL = URL.createObjectURL(value); // Créez une URL pour le fichier


      return { imageURL, name: value.name }
    }
  }
}

