import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import isTokenValid from "../src/methods/isTokenValid";
import { useNavigate } from "react-router-dom";
import styles from '../styles/SignInPage.module.css';

const schema = z.object({
    username: z.string(),
    password: z.string()
})

type FormFields = z.infer<typeof schema>;

export default function SignInPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(isTokenValid(token)) {
            navigate("/");
        }
    }, [])

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<FormFields>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const response = await fetch("http://localhost:5122/api/account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username: data.username,
                Password: data.password
            })
        });

        const result = await response.json();
        if (result.succeeded) {
            localStorage.setItem("token", result.userInfo.token);
            navigate("/");
            console.log(result.message);
        }
        else {
            setError("root", {
                message: result.message
            });
        }
    };

    return (
        <div className={styles.signInContainer}>
          <h1>PicLight CI/CD TESTT!!!!!!!!!!</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.signInForm}>
            <input {...register("username")} type="text" placeholder="Username" />
            {errors.username && (
              <div className={styles.errorMessage}>{errors.username.message}</div>
            )}
            <input {...register("password")} type="password" placeholder="Password" />
            {errors.password && (
              <div className={styles.errorMessage}>{errors.password.message}</div>
            )}
            {errors.root && (
              <div className={styles.errorMessage}>{errors.root.message}</div>
            )}
            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Loading..." : "Submit"}
            </button>
          </form>
          <a href="" onClick={() => navigate("/signup")}>SignUp</a>
        </div>
    );
}