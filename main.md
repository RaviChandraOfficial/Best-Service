// //! Bike Service Center & Spare Parts Marketplace - Rust Backend
// //!
// //! This is a Rust-based backend for a bike service center & spare parts marketplace.
// //! It uses Actix Web for the API, PostgreSQL for the database, and JWT authentication.

// use actix_web::{web, App, HttpServer, HttpResponse, Responder};
// use serde::{Serialize, Deserialize};
// use sqlx::{PgPool, postgres::PgPoolOptions};
// use dotenv::dotenv;
// use std::env;
// use jsonwebtoken::{encode, decode, Header, Algorithm, Validation, EncodingKey, DecodingKey};
// use actix_web::middleware::Logger;
// use actix_cors::Cors;
// // use actix_web::middleware::cors::Cors;

// #[derive(Serialize, Deserialize, sqlx::FromRow)]
// struct ServiceCenter {
//     id: i32,
//     name: String,
//     location: String,
//     rating: f32,
//     price_range: String,
//     bike_types: String,
//     service_type: String, // "authorized" or "private"
// }

// #[derive(Serialize, Deserialize, sqlx::FromRow)]
// struct User {
//     id: i32,
//     username: String,
//     password: String,
//     user_type: String, // "customer" or "service_center"
// }

// #[derive(Serialize, Deserialize)]
// struct Claims {
//     sub: String,
//     exp: usize,
//     user_type: String,
// }

// #[derive(Deserialize)]
// struct FilterParams {
//     min_rating: Option<f32>,
//     max_price: Option<String>,
//     service_type: Option<String>,
// }

// async fn get_service_centers(pool: web::Data<PgPool>, filters: web::Query<FilterParams>) -> impl Responder {
//     let mut query = "SELECT * FROM service_centers WHERE 1=1".to_string();
//     if let Some(min_rating) = filters.min_rating {
//         query.push_str(&format!(" AND rating >= {}", min_rating));
//     }
//     if let Some(max_price) = &filters.max_price {
//         query.push_str(&format!(" AND price_range <= '{}'", max_price));
//     }
//     if let Some(service_type) = &filters.service_type {
//         query.push_str(&format!(" AND service_type = '{}'", service_type));
//     }

//     let centers = sqlx::query_as::<_, ServiceCenter>(&query)
//         .fetch_all(pool.get_ref())
//         .await;
//     match centers {
//         Ok(data) => HttpResponse::Ok().json(data),
//         Err(_) => HttpResponse::InternalServerError().body("Error fetching service centers"),
//     }
// }

// async fn register_user(pool: web::Data<PgPool>, user: web::Json<User>) -> impl Responder {
//     let result = sqlx::query("INSERT INTO users (username, password, user_type) VALUES ($1, $2, $3)")
//         .bind(&user.username)
//         .bind(&user.password)
//         .bind(&user.user_type)
//         .execute(pool.get_ref())
//         .await;
//     match result {
//         Ok(_) => HttpResponse::Created().body("User registered successfully"),
//         Err(_) => HttpResponse::InternalServerError().body("Error registering user"),
//     }
// }

// async fn login_user(pool: web::Data<PgPool>, user: web::Json<User>) -> impl Responder {
//     let result = sqlx::query_as::<_, User>("SELECT * FROM users WHERE username = $1 AND password = $2")
//         .bind(&user.username)
//         .bind(&user.password)
//         .fetch_optional(pool.get_ref())
//         .await;
//     match result {
//         Ok(Some(user)) => {
//             let claims = Claims {
//                 sub: user.username.clone(),
//                 exp: 10000000000,
//                 user_type: user.user_type.clone(),
//             };
//             let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(b"secret"))
//                 .expect("Token creation failed");
//             HttpResponse::Ok().json(token)
//         }
//         Ok(None) => HttpResponse::Unauthorized().body("Invalid credentials"),
//         Err(_) => HttpResponse::InternalServerError().body("Error logging in"),
//     }
// }

// async fn register_service_center(pool: web::Data<PgPool>, center: web::Json<ServiceCenter>) -> impl Responder {
//     let result = sqlx::query("INSERT INTO service_centers (name, location, rating, price_range, bike_types, service_type) VALUES ($1, $2, $3, $4, $5, $6)")
//         .bind(&center.name)
//         .bind(&center.location)
//         .bind(&center.rating)
//         .bind(&center.price_range)
//         .bind(&center.bike_types)
//         .bind(&center.service_type)
//         .execute(pool.get_ref())
//         .await;
//     match result {
//         Ok(_) => HttpResponse::Created().body("Service center registered successfully"),
//         Err(_) => HttpResponse::InternalServerError().body("Error registering service center"),
//     }
// }

// #[actix_web::main]
// async fn main() -> std::io::Result<()> {
//     dotenv().ok();
//     let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
//     let pool = PgPoolOptions::new()
//         .max_connections(5)
//         .connect(&database_url)
//         .await
//         .expect("Failed to create pool");
    
//     HttpServer::new(move || {
//         App::new()
//             .wrap(Logger::default())
//             .wrap(Cors::permissive())
//             .app_data(web::Data::new(pool.clone()))
//             .route("/service-centers", web::get().to(get_service_centers))
//             .route("/register", web::post().to(register_user))
//             .route("/login", web::post().to(login_user))
//             .route("/register-service-center", web::post().to(register_service_center))
//     })
//     .bind("0.0.0.0:8080")?
//     .run()
//     .await
// }






//! Bike Service Center & Spare Parts Marketplace - Rust Backend
//!
//! This is a Rust-based backend for a bike service center & spare parts marketplace.
//! It uses Actix Web for the API, PostgreSQL for the database, and JWT authentication.

use actix_web::{web, App, HttpServer, HttpResponse, Responder, middleware::Logger};
use serde::{Serialize, Deserialize};
use sqlx::{PgPool, postgres::PgPoolOptions};
use dotenv::dotenv;
use std::env;
use jsonwebtoken::{encode, decode, Header, Algorithm, Validation, EncodingKey, DecodingKey};
use actix_cors::Cors;
use argon2::{Argon2, PasswordHasher, PasswordVerifier};
use argon2::password_hash::{SaltString, rand_core::OsRng, PasswordHash};

#[derive(Serialize, Deserialize, sqlx::FromRow)]
struct ServiceCenter {
    id: i32,
    name: String,
    location: String,
    rating: f64,
    price_range: String,
    bike_types: String,
    service_type: String, // "authorized" or "private"
}

#[derive(Serialize, Deserialize, sqlx::FromRow)]
struct User {
    id: i32,
    username: String,
    password: String,
    user_type: String, // "customer" or "service_center"
}

#[derive(Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
    user_type: String,
}

#[derive(Deserialize)]
struct LoginRequest {
    username: String,
    password: String,
}

#[derive(Deserialize)]
struct RegisterRequest {
    username: String,
    password: String,
    user_type: String,
}

// Hash password using Argon2
fn hash_password(password: &str) -> String {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    argon2.hash_password(password.as_bytes(), &salt)
        .expect("Error hashing password")
        .to_string()
}

// Verify password using Argon2
fn verify_password(password: &str, hashed_password: &str) -> bool {
    let parsed_hash = PasswordHash::new(hashed_password).expect("Invalid hash format");
    let argon2 = Argon2::default();
    argon2.verify_password(password.as_bytes(), &parsed_hash).is_ok()
}

// Register a new user
async fn register_user(pool: web::Data<PgPool>, user: web::Json<RegisterRequest>) -> impl Responder {
    let hashed_password = hash_password(&user.password);
    let result = sqlx::query("INSERT INTO users (username, password, user_type) VALUES ($1, $2, $3)")
        .bind(&user.username)
        .bind(&hashed_password)
        .bind(&user.user_type)
        .execute(pool.get_ref())
        .await;
    match result {
        Ok(_) => HttpResponse::Created().body("User registered successfully"),
        Err(_) => HttpResponse::InternalServerError().body("Error registering user"),
    }
}

// Login user and return JWT token
async fn login_user(pool: web::Data<PgPool>, user: web::Json<LoginRequest>) -> impl Responder {
    let result = sqlx::query_as::<_, User>("SELECT * FROM users WHERE username = $1")
        .bind(&user.username)
        .fetch_optional(pool.get_ref())
        .await;

    match result {
        Ok(Some(db_user)) => {
            if verify_password(&user.password, &db_user.password) {
                let claims = Claims {
                    sub: db_user.username.clone(),
                    exp: 10000000000,
                    user_type: db_user.user_type.clone(),
                };
                let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(b"secret"))
                    .expect("Token creation failed");
                HttpResponse::Ok().json(token)
            } else {
                HttpResponse::Unauthorized().body("Invalid credentials")
            }
        }
        Ok(None) => HttpResponse::Unauthorized().body("Invalid credentials"),
        Err(_) => HttpResponse::InternalServerError().body("Error logging in"),
    }
}

// // Get all service centers and count them
// async fn get_service_centers(pool: web::Data<PgPool>) -> impl Responder {
//     let result = sqlx::query_as::<_, ServiceCenter>("SELECT * FROM service_centers")
//         .fetch_all(pool.get_ref())
//         .await;

//     let count_result = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM service_centers")
//         .fetch_one(pool.get_ref())
//         .await;

//     match (result, count_result) {
//         (Ok(service_centers), Ok(count)) => {
//             let response = serde_json::json!({
//                 "total_service_centers": count,
//                 "data": service_centers
//             });
//             HttpResponse::Ok().json(response)
//         }
//         _ => HttpResponse::InternalServerError().body("Error fetching service centers"),
//     }
// }


// Get all service centers and count them
async fn get_service_centers(pool: web::Data<PgPool>) -> impl Responder {
    let result = sqlx::query_as::<_, ServiceCenter>("SELECT * FROM service_centers")
        .fetch_all(pool.get_ref())
        .await;

    let count_result = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM service_centers")
        .fetch_one(pool.get_ref())
        .await;

    match (result, count_result) {
        (Ok(service_centers), Ok(count)) => {
            let response = serde_json::json!({
                "total_service_centers": count,
                "data": service_centers
            });
            HttpResponse::Ok().json(response)
        }
        (Err(e), _) => {
            eprintln!("Error fetching service centers: {:?}", e);
            HttpResponse::InternalServerError().body(format!("Database error: {:?}", e))
        }
        (_, Err(e)) => {
            eprintln!("Error fetching service center count: {:?}", e);
            HttpResponse::InternalServerError().body(format!("Database error: {:?}", e))
        }
    }
}


// Register a new service center
async fn register_service_center(pool: web::Data<PgPool>, center: web::Json<ServiceCenter>) -> impl Responder {
    let result = sqlx::query("INSERT INTO service_centers (name, location, rating, price_range, bike_types, service_type) VALUES ($1, $2, $3, $4, $5, $6)")
        .bind(&center.name)
        .bind(&center.location)
        .bind(&center.rating)
        .bind(&center.price_range)
        .bind(&center.bike_types)
        .bind(&center.service_type)
        .execute(pool.get_ref())
        .await;
    match result {
        Ok(_) => HttpResponse::Created().body("Service center registered successfully"),
        Err(_) => HttpResponse::InternalServerError().body("Error registering service center"),
    }
}

// Start the server
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    print!("Database URL: {}", database_url);
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to create pool");
    
    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .wrap(Cors::permissive())
            .app_data(web::Data::new(pool.clone()))
            .route("/register", web::post().to(register_user))
            .route("/login", web::post().to(login_user))
            .route("/service-centers", web::get().to(get_service_centers))
            .route("/register-service-center", web::post().to(register_service_center))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
