"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import styles from '../login/styles.module.scss'
import Image from 'next/image';
import { getImageUrl } from "@/lib/getImageUrl";


export default function SignUpForm() {
  const router = useRouter();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [disabledSubmit, setDisabledSubmit] = useState(true)
  const [checkNbOfChar, setCheckNbOfChar] = useState(false)
  const [nbOfCarRestant, setNbOfCarRestant] = useState(6)
  const [imageSrc, setImageSrc] = useState('/chien.jpg')
  const registerUser = async (e) => {
    console.log(data, 'here');
    e.preventDefault();
    const formDataUserToSend = new FormData()
    formDataUserToSend.append('name', data.name)
    formDataUserToSend.append('email', data.email)
    formDataUserToSend.append('password', data.password)
    formDataUserToSend.append('picture', data.picture)

    const response = await fetch("/api/user/signUp", {
      method: 'POST',
      body: formDataUserToSend
    })
      .then(data => data.json())
      .then(data => {
        console.log(data)
        if (data.status === 201) {

          //  const token = newUserData.data.Account.access_token
          const account = data.Account
          console.log(account, "account");
          localStorage.setItem('lpfAccount', JSON.stringify(account))
          router.push('/login')
        }
      })



  };
  useEffect(() => {
    if (data.password.length > 0) {

      setCheckNbOfChar(true)
      setNbOfCarRestant(6 - data.password.length)
    }

    if (data.password.length > 5) {
      setDisabledSubmit(false)
      setCheckNbOfChar(false)
    }
  }, [data.password.length])


  const loadPicture = (e) => {
    console.log(e.target.files);
    setImageSrc(getImageUrl(e).imageURL);
    setData({ ...data, picture: e.target.files[0] })

  }

  return (
    <>
      <div className={styles.formContainer}>
        <div >
          <h2 >
            Créez votre compte
          </h2>
        </div>
        <div className={styles.imageContainer}>
          <Image src={imageSrc} alt="photo de l'utilisateur" fill />
        </div>
        <label htmlFor="changePicture">Changer ma photo</label>
        <input type="file" onChange={(e) => loadPicture(e)} id="changePicture" />

        <div >
          <form onSubmit={registerUser}>
            <div>
              <label
                htmlFor="name"

              >
                Nom
              </label>
              <div >
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}

                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"

              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}

                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"

                >
                  Mot de passe
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  min={6}
                  required
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }

                />
                {
                  checkNbOfChar ?

                    <span style={{ color: "red", textShadow: '2px 2px 2px white' }}>encore {nbOfCarRestant} {nbOfCarRestant === 1 ? <span>caractère</span> : <span>charactères</span>}</span> : null
                }
              </div>
            </div>

            <div>
              <button
                disabled={disabledSubmit}
                type="submit"

              >
                S&apos;enregistrer
              </button>
            </div>
            <div className={styles.createAccountContainer}>
              <span
                htmlFor="password"

              >
                J&apos;ai déjà un compte
              </span>
              <div >
                <Link href={"/login"}

                >
                  Se connecter
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

