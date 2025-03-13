use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, sqlx::FromRow)]
pub struct ServiceCenter {
    pub id: i32,
    pub username: String,
    pub location: String,
    pub rating: f64,
    pub price_range: String,
    pub bike_types: String,
    pub service_type: String, // "authorized" or "private"
    pub password: String
    // pub default_cost:String
}
#[derive(Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub password: String,
    pub user_type: String, // "customer" or "service_center"
}

#[derive(Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
    pub user_type: String,
}
