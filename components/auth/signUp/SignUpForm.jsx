"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import styles from '../login/styles.module.scss'


export default function SignUpForm() {
  const router = useRouter();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const registerUser = async (e) => {
    console.log(data);
    e.preventDefault();

    axios
      .post("/api/user/signup", data)
      .then(() => router.push("/signIn"))
      .catch(() => alert("problème"));
  };
  return (
    <>
      <div className={styles.formContainer}>
        <div >
          <h2 >
            Créez votre compte
          </h2>
        </div>

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
                  required
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
             
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
          
              >
                S&apos;enregistrer
              </button>
            </div>
            <div  className={styles.createAccountContainer}>
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

