'use client'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getImageUrl } from "@/lib/getImageUrl";
import { useUserContext } from '@/context/UserContext';

import styles from './styles.module.scss'




const ProductsGallery = () => {
  const { user } = useUserContext();
  const [file, setFile] = useState('')
  const [url, setUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('/chien.jpg')
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    size: "",
    picture: "",
    category: ""
  })
  const [products, setProducts] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {

    getAllProduct()

  }, [])

  const getAllProduct = async () => {
    const res = await fetch('/api/products/getAllProducts')
    const products = await res.json()
    setProducts(products)

  }


  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    setFile(file);

    setImageUrl(getImageUrl(e).imageURL)
  }

  const storeImgInFirebaseAndGetUrl = async (file) => {
    const storage = getStorage();

    const metadata = {
      contentType: 'image/jpeg',
    };

    //  Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setUrl(downloadURL)
        });
      }
    );
  }



  return (
    <div className={styles.productGalleryContainer}>
      {
        user && user.role === 'ADMIN' &&
        <button className={styles.btn} onClick={() => setModalVisible(!modalVisible)}>Ajouter un produit</button>
      }

      <section className={modalVisible ? ` ${styles.overlay} ${styles.visible}` : styles.overlay}>
        <div className={styles.modalContainer}>
          <div className={styles.inputContainer}>

            <label htmlFor="title">titre</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className={styles.inputContainer}>

            <label htmlFor="description">description</label>
            <input type="text" name="description" id="description" />
          </div>
          <div className={styles.inputContainer}>

            <label htmlFor="category">category</label>
            <select name="category" id="category">
              <option value="haut">haut</option>
              <option value="bas">bas</option>
              <option value="chaussures">chaussures</option>
              <option value="accessoires">accessoires</option>
            </select>
          </div>
          <div className={styles.inputContainer}>

            <div className={styles.inputImageContainer}>
              <label htmlFor="photo" className={styles.labelFile}>choisir une image</label>

              <input type="file" name="photo" id="photo" className={styles.inputFile} onChange={handleFileUpload} />
              <div className={styles.imgContainer}>

                <Image src={imageUrl} alt={file.name} fill />
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="prix">prix</label>
            <input type="text" name="prix" id="prix" />
          </div>

          <button>Valider l'article</button>
        </div>
      </section>
      {/* <input type="file" />
      {
        products && products.map(product => (
          <div key={product.id}>
            <h1>{product.title}</h1>
            <Image src={product.picture} width={50} height={50} alt={product.title} />
            <p>{product.description}</p>
          </div>
        ))
      } */}
    </div>
  );
};

export default ProductsGallery;