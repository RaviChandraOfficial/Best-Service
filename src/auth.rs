// use actix_web::{web, HttpResponse, Responder};
// use jsonwebtoken::{encode, EncodingKey, Header};
// use argon2::{Argon2, PasswordHasher, PasswordVerifier};
// use argon2::password_hash::{SaltString, rand_core::OsRng, PasswordHash};
// use sqlx::PgPool;
// use std::{env, hash};
// use serde::{Deserialize, Serialize};
// use serde_json::json;
// use crate::models::ServiceCenter;
// use bcrypt::{hash, DEFAULT_COST};

// #[derive(Deserialize)]
// pub struct LoginRequest {
//     pub username: String,
//     pub password: String,
// }

// #[derive(Deserialize)]
// pub struct RegisterRequest {
//     pub username: String,
//     pub password: String,
//     pub user_type: String,
// }

// // Hash password using Argon2
// fn hash_password(password: &str) -> String {
//     let salt = SaltString::generate(&mut OsRng);
//     let argon2 = Argon2::default();
//     argon2.hash_password(password.as_bytes(), &salt)
//         .expect("Error hashing password")
//         .to_string()
// }

// // Verify password using Argon2
// fn verify_password(password: &str, hashed_password: &str) -> bool {
//     match PasswordHash::new(hashed_password) {
//         Ok(parsed_hash) => Argon2::default().verify_password(password.as_bytes(), &parsed_hash).is_ok(),
//         Err(_) => false,
//     }
// }

// // Generate JWT Token
// fn generate_jwt(username: &str, user_type: &str) -> String {
//     let secret = env::var("SECRET_KEY").expect("JWT_SECRET must be set");
//     let claims = crate::models::Claims {
//         sub: username.to_string(),
//         exp: chrono::Utc::now().timestamp() as usize + 3600, // Expires in 1 hour
//         user_type: user_type.to_string(),
//     };
//     encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref()))
//         .expect("Failed to generate JWT token")
// }

// // Register User
// pub async fn register_user(pool: web::Data<PgPool>, user: web::Json<RegisterRequest>) -> impl Responder {
//     let hashed_password = hash_password(&user.password);
//     let result = sqlx::query("INSERT INTO users (username, password, user_type) VALUES ($1, $2, $3)")
//         .bind(&user.username)
//         .bind(&hashed_password)
//         .bind(&user.user_type)
//         .execute(pool.get_ref())
//         .await;

//     match result {
//         Ok(_) => HttpResponse::Created().json(json!({"message": "User registered successfully"})),
//         Err(e) => HttpResponse::InternalServerError().json(json!({"error": format!("Failed to register user: {}", e)})),
//     }
// }

// // Login User
// pub async fn login_user(pool: web::Data<PgPool>, user: web::Json<LoginRequest>) -> impl Responder {
//     let result = sqlx::query_as::<_, crate::models::User>("SELECT * FROM users WHERE username = $1")
//         .bind(&user.username)
//         .fetch_optional(pool.get_ref())
//         .await;

//     match result {
//         Ok(Some(db_user)) => {
//             if verify_password(&user.password, &db_user.password) {
//                 let token = generate_jwt(&db_user.username, &db_user.user_type);
//                 HttpResponse::Ok().json(json!({ "token": token }))
//             } else {
//                 HttpResponse::Unauthorized().json(json!({ "error": "Invalid credentials" }))
//             }
//         }
//         Ok(None) => HttpResponse::Unauthorized().json(json!({ "error": "Invalid credentials" })),
//         Err(e) => HttpResponse::InternalServerError().json(json!({ "error": format!("Database error: {}", e) })),
//     }
// }

// // Login service center
// pub async fn login_service_center(pool: web::Data<PgPool>, user: web::Json<LoginRequest>) -> impl Responder {
//     let result = sqlx::query_as::<_, crate::models::ServiceCenter>("SELECT * FROM service_centers WHERE username = $1")
//         .bind(&user.username)
//         .fetch_optional(pool.get_ref())
//         .await;

//     match result {
//         Ok(Some(db_user)) => {
//             if verify_password(&user.password, &db_user.password) {
//                 let token = generate_jwt(&db_user.username, &db_user.service_type);
//                 HttpResponse::Ok().json(json!({ "token": token }))
//             } else {
//                 HttpResponse::Unauthorized().json(json!({ "error": "Invalid credentials" }))
//             }
//         }
//         Ok(None) => HttpResponse::Unauthorized().json(json!({ "error": "Invalid credentials" })),
//         Err(e) => HttpResponse::InternalServerError().json(json!({ "error": format!("Database error: {}", e) })),
//     }
    
// }

// pub async fn register_service_center(
//     pool: web::Data<PgPool>,
//     center: web::Json<ServiceCenter>,
// ) -> impl Responder {
//     // Hash the password before storing it
//     let hashed_password = match hash(&center.password, DEFAULT_COST) {
//         Ok(hp) => hp,
//         Err(_) => return HttpResponse::InternalServerError().body("Error hashing password"),
//     };

//     // Insert into the database
//     let result = sqlx::query(
//         "INSERT INTO service_centers (username, location, rating, price_range, bike_types, service_type, password)
//          VALUES ($1, $2, $3, $4, $5, $6, $7)",
//     )
//     .bind(&center.username)
//     .bind(&center.location)
//     .bind(&center.rating)
//     .bind(&center.price_range)
//     .bind(&center.bike_types)
//     .bind(&center.service_type)
//     .bind(&hashed_password) // Store the hashed password
//     .execute(pool.get_ref())
//     .await;

//     match result {
//         Ok(_) => HttpResponse::Created().body("Service center registered successfully"),
//         Err(_) => HttpResponse::InternalServerError().body("Error registering service center"),
//     }
// }





use actix_web::{web, HttpResponse, Responder};
use jsonwebtoken::{encode, EncodingKey, Header};
use sqlx::PgPool;
use serde::{Deserialize, Serialize};
use serde_json::json;
use bcrypt::{hash, verify, DEFAULT_COST};
use std::env;
use crate::models::ServiceCenter;

#[derive(Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

#[derive(Deserialize)]
pub struct RegisterRequest {
    pub username: String,
    pub password: String,
    pub user_type: String,
}

// 🔥 Hash password using bcrypt (same for users & service centers)
fn hash_password(password: &str) -> String {
    hash(password, DEFAULT_COST).expect("Error hashing password")
}

// 🔥 Verify password using bcrypt (same for users & service centers)
fn verify_password(password: &str, hashed_password: &str) -> bool {
    verify(password, hashed_password).unwrap_or(false)
}

// 🔥 Generate JWT Token
fn generate_jwt(username: &str, user_type: &str) -> String {
    let secret = env::var("SECRET_KEY").expect("SECRET_KEY must be set");
    let claims = crate::models::Claims {
        sub: username.to_string(),
        exp: chrono::Utc::now().timestamp() as usize + 3600, // 1-hour expiry
        user_type: user_type.to_string(),
    };
    encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref()))
        .expect("Failed to generate JWT token")
}

// 🔹 Register User
pub async fn register_user(pool: web::Data<PgPool>, user: web::Json<RegisterRequest>) -> impl Responder {
    let hashed_password = hash_password(&user.password);

    let result = sqlx::query("INSERT INTO users (username, password, user_type) VALUES ($1, $2, $3)")
        .bind(&user.username)
        .bind(&hashed_password)
        .bind(&user.user_type)
        .execute(pool.get_ref())
        .await;

    match result {
        Ok(_) => HttpResponse::Created().json(json!({"message": "User registered successfully"})),
        Err(e) => HttpResponse::InternalServerError().json(json!({"error": format!("Failed to register user: {}", e)})),
    }
}

// 🔹 Login User
pub async fn login_user(pool: web::Data<PgPool>, user: web::Json<LoginRequest>) -> impl Responder {
    let result = sqlx::query_as::<_, crate::models::User>("SELECT * FROM users WHERE username = $1")
        .bind(&user.username)
        .fetch_optional(pool.get_ref())
        .await;

    match result {
        Ok(Some(db_user)) => {
            println!("DB Password (hashed): {}", db_user.password);
            println!("Entered Password: {}", user.password);

            if verify_password(&user.password, &db_user.password) {
                let token = generate_jwt(&db_user.username, &db_user.user_type);
                HttpResponse::Ok().json(json!({ "token": token }))
            } else {
                println!("Password verification failed!");
                HttpResponse::Unauthorized().json(json!({ "error": "Invalid credentials" }))
            }
        }
        Ok(None) => HttpResponse::Unauthorized().json(json!({ "error": "Invalid credentials" })),
        Err(e) => HttpResponse::InternalServerError().json(json!({ "error": format!("Database error: {}", e) })),
    }
}

// 🔹 Login Service Center (Fixed!)
pub async fn login_service_center(pool: web::Data<PgPool>, user: web::Json<LoginRequest>) -> impl Responder {
    let result = sqlx::query_as::<_, crate::models::ServiceCenter>("SELECT * FROM service_centers WHERE username = $1")
        .bind(&user.username)
        .fetch_optional(pool.get_ref())
        .await;

    match result {
        Ok(Some(db_user)) => {
            println!("DB Password (hashed): {}", db_user.password);
            println!("Entered Password: {}", user.password);

            if verify_password(&user.password, &db_user.password) {
                let token = generate_jwt(&db_user.username, &db_user.service_type);
                HttpResponse::Ok().json(json!({ "token": token }))
            } else {
                println!("Password verification failed!");
                HttpResponse::Unauthorized().json(json!({ "error": "Invalid credentials" }))
            }
        }
        Ok(None) => HttpResponse::Unauthorized().json(json!({ "error": "Invalid credentials" })),
        Err(e) => HttpResponse::InternalServerError().json(json!({ "error": format!("Database error: {}", e) })),
    }
}

// 🔹 Register Service Center (Fixed!)
pub async fn register_service_center(
    pool: web::Data<PgPool>,
    center: web::Json<ServiceCenter>,
) -> impl Responder {
    let hashed_password = hash_password(&center.password);

    let result = sqlx::query(
        "INSERT INTO service_centers (username, location, rating, price_range, bike_types, service_type, password)
         VALUES ($1, $2, $3, $4, $5, $6, $7)",
    )
    .bind(&center.username)
    .bind(&center.location)
    .bind(&center.rating)
    .bind(&center.price_range)
    .bind(&center.bike_types)
    .bind(&center.service_type)
    .bind(&hashed_password) 
    .execute(pool.get_ref())
    .await;

    match result {
        Ok(_) => HttpResponse::Created().body("Service center registered successfully"),
        Err(_) => HttpResponse::InternalServerError().body("Error registering service center"),
    }
}
