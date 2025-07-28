import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import isTokenValid from "../src/methods/isTokenValid";
import { useEffect } from "react";
import styles from "../styles/SignUpPage.module.css";

const schema = z.object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(5)
});

type FormFields = z.infer<typeof schema>;

export default function SignUpPage() {
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
        const response = await fetch("http://16.170.221.10/api/account/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username: data.username,
                Email: data.email,
                Password: data.password
            })
        });

        const result = await response.json();
        if (result.succeeded) {
            localStorage.setItem("token", result.token);
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
      <div className={styles.signUpContainer}>
        <h1>PicLight</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.signUpForm}>
          <input {...register("username")} type="text" placeholder="Username" />
          {errors.username && (
            <div className={styles.errorMessage}>{errors.username.message}</div>
          )}

          <input {...register("email")} type="text" placeholder="Email" />
          {errors.email && (
            <div className={styles.errorMessage}>{errors.email.message}</div>
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
        <a href="" onClick={() => navigate("/signin")}>SignIn</a>
      </div>
    );
}