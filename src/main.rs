use std::env;
mod auth;
mod db;
mod routes;
mod models;
use actix_web::{web, App, HttpServer, middleware::Logger};
use auth::{login_service_center, register_service_center};
use dotenv::dotenv;
use actix_cors::Cors;
use sqlx::{postgres::PgPoolOptions, PgPool};
use crate::routes::get_service_centers; // ✅ Import routes properly
use crate::auth::{register_user, login_user};




#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init();
    
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    println!("Database URL: {}", database_url);

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
            .route("/login-user", web::post().to(login_user))
            .route("/login-service-center", web::post().to(login_service_center))
            .route("/service-centers", web::get().to(get_service_centers))
            .route("/register-service-center", web::post().to(register_service_center))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await?;

    Ok(()) // ✅ Ensure main returns a valid Result type
}
