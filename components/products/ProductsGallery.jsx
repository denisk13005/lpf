'use client'
import { useUserContext } from '@/context/UserContext';
import { getImageUrl } from "@/lib/getImageUrl";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

// import { firebase } from '@/firebase.js';


import Camera from '../camera/Camera';
import RecipeReviewCard from '../card/Card';
import SearchBar from '../searchBar/SearchBar';
import styles from './styles.module.scss';





// const storage = getStorage(firebase);

const ProductsGallery = () => {

  const { user } = useUserContext();
  const [file, setFile] = useState('')
  const [imageUrl, setImageUrl] = useState('/chien.jpg')
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    size: "xs",
    picture: "",
    category: "haut"
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [products, setProducts] = useState([])
  const [productsToShow, setProductsToShow] = useState([])
  const [refine, setRefine] = useState('')
  const [error, setError] = useState(false)
  const [showCamera, setShowCamera] = useState(false)




  useEffect(() => {
    let filteredProducts = products.filter(function (element) {
      return (
        element.title.toLowerCase().includes(refine.toLowerCase()) ||
        element.description.toLowerCase().includes(refine.toLowerCase())
      )

    });

    setProductsToShow(filteredProducts);
  }, [refine])

  useEffect(() => {

    getAllProduct()

  }, [])


  useEffect(() => {

    setProductsToShow(products)
  }, [products])

  useEffect(() => {
    const body = document.getElementsByTagName('body')
    if (modalVisible) {
      body[0].style.overflow = 'hidden'
    } else {
      body[0].style.overflow = ''

    }
  }, [modalVisible])

  useEffect(() => {
    console.log(product)
  }, [product])

  const getAllProduct = async () => {
    const res = await fetch('/api/products/getAllProducts', {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    const products = await res.json()
    setProducts(products)



  }

  const validatedForm = () => {
    // checker si tous les champs requis sont remplis
    // afficher un msg d'erreur sur le champ correspond sinon
  }


  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    setFile(file);
    setImageUrl(getImageUrl(e).imageURL)
    setProduct({ ...product, picture: file })
  }

  // const storeImgInFirebaseAndGetUrl = async (file) => {
  //   console.log(file, 'file ');

  //   return new Promise((resolve, reject) => {




  //     const metadata = {
  //       contentType: 'image/jpeg',
  //     };

  //     //  Upload file and metadata to the object 'images/mountains.jpg'
  //     const storageRef = ref(storage, 'images/' + file.name);
  //     const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  //     uploadTask.on('state_changed',
  //       (snapshot) => {
  //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log('Upload is ' + progress + '% done');
  //         switch (snapshot.state) {
  //           case 'paused':
  //             console.log('Upload is paused');
  //             break;
  //           case 'running':
  //             console.log('Upload is running');
  //             break;
  //         }
  //       },
  //       (error) => {
  //         // A full list of error codes is available at
  //         // https://firebase.google.com/docs/storage/web/handle-errors
  //         switch (error.code) {
  //           case 'storage/unauthorized':
  //             // User doesn't have permission to access the object
  //             break;
  //           case 'storage/canceled':
  //             // User canceled the upload
  //             break;

  //           // ...

  //           case 'storage/unknown':
  //             // Unknown error occurred, inspect error.serverResponse
  //             break;
  //         }
  //       },
  //       () => {
  //         // Upload completed successfully, now we can get the download URL
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           console.log('File available at', downloadURL);
  //           resolve(downloadURL)
  //         });
  //       }
  //     );
  //   })


  // }


  // const validateArticle = async () => {
  //   try {
  //     const imageUrl = await storeImgInFirebaseAndGetUrl(product.picture)

  //     console.log(imageUrl);
  //     const productWithImageUrl = { ...product, picture: imageUrl }
  //     // postProduct(productWithImageUrl)

  //   } catch (error) {
  //     console.log(error);
  //   }


  // }

  const postProduct = async () => {
    if (product.title.length === 0 || product.price === 0) {
      setError(true)
      return
    }
    const formDataEventToSend = new FormData()
    formDataEventToSend.append('title', product.title)
    formDataEventToSend.append('description', product.description)
    formDataEventToSend.append('size', product.size)
    formDataEventToSend.append('price', product.price)
    formDataEventToSend.append('category', product.category)
    formDataEventToSend.append('picture', file)
    console.log(formDataEventToSend, '--');
    const query = await fetch('/api/products/add', {
      method: 'POST',
      body: formDataEventToSend
    })
    const response = await query.json()
    console.log(response, 'response');
    if (response.status === 201) {
      setModalVisible(false)

      getAllProduct()
      setProduct({
        title: '',
        price: 0
      })
    }
  }

  const filter = (payload) => {
    setRefine(payload)
  }





  return (
    <div className={styles.productGalleryContainer}>
      <SearchBar filter={filter} tab={products} fieldsWhereSearch={['description', 'category', 'title']} />

      {
        // user && user.role === 'ADMIN' &&
        <button className={styles.btn} onClick={() => setModalVisible(!modalVisible)}>Ajouter un produit</button>
      }

      <section className={modalVisible ? ` ${styles.overlay} ${styles.visible}` : styles.overlay}>
        <div className={styles.modalContainer}>
          <div className={styles.inputContainer}>

            <label htmlFor="title">titre</label>
            <input type="text" name="title" id="title" onChange={(e) => setProduct({ ...product, title: e.target.value })} />
            {(error && product.title.length === 0) && <span style={{ color: 'red', fontSize: '12px' }}>Veuillez entrer un titre</span>}
          </div>
          <div className={styles.inputContainer}>

            <label htmlFor="description">description</label>
            <textarea type="text" name="description" id="description" onChange={(e) => setProduct({ ...product, description: e.target.value })} />
          </div>
          <div className={styles.inputContainer}>

            <label htmlFor="category">category</label>
            <select name="category" id="category" onChange={(e) => setProduct({ ...product, category: e.target.value })}>
              <option value="haut">haut</option>
              <option value="bas">bas</option>
              <option value="chaussures">chaussures</option>
              <option value="accessoires">accessoires</option>
            </select>
          </div>
          <div className={styles.inputContainer}>

            <div className={styles.inputImageContainer}>
              <label htmlFor="photo" className={styles.labelFile}>Choisir Une Image</label>

              <input type="file" name="photo" id="photo" className={styles.inputFile} onChange={handleFileUpload} />
              <div className={styles.imgContainer}>
                <Image src={imageUrl} alt='product image' fill />

              </div>
              <div className={styles.labelFile} onClick={() => setShowCamera(true)}>
                Prendre Une Photo
              </div>


            </div>
            {showCamera && <Camera />}

          </div>

          <div className={styles.inputContainer}>

            <label htmlFor="size">taille</label>
            <select name="size" id="size" onChange={(e) => setProduct({ ...product, size: e.target.value })}>
              <option value="xs">xs</option>
              <option value="s">s</option>
              <option value="m">m</option>
              <option value="l">l</option>
              <option value="xl">xl</option>
              <option value="xxl">xxl</option>
              <option value="xxxl">xxxl</option>
            </select>
          </div>
          <div className={styles.inputContainer} >
            <label htmlFor="price">prix</label>
            <input type="text" name="price" id="price" onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) })} />
            {(error && product.price === 0) && <span style={{ color: 'red', fontSize: '12px' }}>Veuillez entrer un prix</span>}

          </div>

          <button onClick={postProduct}>Valider l'article</button>
          <button onClick={() => setModalVisible(false)}>Fermer</button>
        </div>
      </section>
      <div className={styles.cardContainer}>

        {

          productsToShow && productsToShow.map(product => (

            <RecipeReviewCard props={product} key={product.id} />
            // <div key={product.id}>
            //   <h1>{product.title}</h1>
            //   <Image src={product.picture} width={50} height={50} alt={product.title} />
            //   <p>{product.description}</p>
            // </div>
          ))
        }
      </div>
    </div>
  );
};

export default ProductsGallery;