use actix_web::{web, HttpResponse, Responder};
use sqlx::PgPool;
use serde_json::json;
use crate::models::ServiceCenter;


pub async fn get_service_centers(pool: web::Data<PgPool>) -> impl Responder {
    let result = sqlx::query_as::<_, ServiceCenter>("SELECT * FROM service_centers")
        .fetch_all(pool.get_ref())
        .await;

    match result {
        Ok(service_centers) => HttpResponse::Ok().json(json!({ "data": service_centers })),
        Err(e) => HttpResponse::InternalServerError().json(json!({ "error": format!("Database error: {}", e) })),
    }
}
